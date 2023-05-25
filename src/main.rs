// #![allow(unused)] // For beginning only.

// use std::convert::Infallible;
use std::net::SocketAddr;
use std::path::PathBuf;

use axum::{
    body::{boxed, Body},
    extract::Json,
    http::{
        // header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        // HeaderValue,
        // Method,
        Response,
        StatusCode,
    },
    response::IntoResponse,
    routing::get,
    Router,
};
// use http_body::{combinators::UnsyncBoxBody, Body as _};
use serde_json::json;
use tokio::fs;
use tower::ServiceExt;
use tower_http::{
    // cors::CorsLayer, // use tower_http::cors::Any (include if necessary)
    services::ServeDir,
    trace::TraceLayer,
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

async fn health_checker_handler() -> impl IntoResponse {
    const MESSAGE: &str = "Building a Full-stack SPA demo using Solidjs, TypeScript, and Tailwindcss. Backend by Rust/Axum.";

    let json_response = json!({
        "status": "success",
        "message": MESSAGE
    });

    Json(json_response)
}

// Error handling for index.html. Example in:
// https://docs.rs/tower-http/latest/tower_http/services/fs/struct.ServeDir.html#method.try_call
// async fn serve_file(
//     request: Request<Body>,
// ) -> Result<Response<UnsyncBoxBody<Bytes, BoxError>>, Infallible> {
//     let mut service = ServeFile::new("./frontend/dist/index.html");
//
//     match service.call(request).await {
//         Ok(response) => {
//             if response.status() == 404 {
//                 let body = Body::from("Something went wrong...")
//                     .map_err(Into::into)
//                     .boxed_unsync();
//                 let response = Response::builder()
//                     .status(StatusCode::INTERNAL_SERVER_ERROR)
//                     .body(body)
//                     .unwrap();
//                 return Ok(response);
//             }
//             Ok(response.map(|body| body.map_err(Into::into).boxed_unsync()))
//         }
//         Err(_err) => {
//             let body = Body::from("Something went wrong...")
//                 .map_err(Into::into)
//                 .boxed_unsync();
//             let response = Response::builder()
//                 .status(StatusCode::INTERNAL_SERVER_ERROR)
//                 .body(body)
//                 .unwrap();
//             Ok(response)
//         }
//     }
// }

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(
            EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "example_static_file_server=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Set up of Cross-Origin Resource Sharing (CORS) to allow the server to
    // accept cross-origin requests from specified origins (e.g.: "http://localhost:3000").
    // let cors = CorsLayer::new()
    //     .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
    //     .allow_methods([Method::POST, Method::GET, Method::PATCH, Method::DELETE])
    //     .allow_credentials(true)
    //     .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE]);

    // An alternative configuration that allows any origin, any method, and any type of header would be:
    // let cors = CorsLayer::new()
    //     .allow_origin(Any)
    //     .allow_methods(Any)
    //     .allow_headers(Any);

    // Example of static asset service based on:
    // https://robert.kra.hn/posts/2022-04-03_rust-web-wasm/
    // https://github.com/rksm/axum-yew-setup
    let app = Router::new()
        .route("/api/healthchecker", get(health_checker_handler))
        // .nest_service(
        //     "/assets",
        //     get_service(ServeDir::new("./frontend/dist/assets")),
        // )
        .fallback_service(get(|req| async move {
            match ServeDir::new("./frontend/dist").oneshot(req).await {
                Ok(res) => {
                    let status = res.status();
                    match status {
                        StatusCode::NOT_FOUND => {
                            let index_path = PathBuf::from("frontend/dist").join("index.html");
                            let index_content = match fs::read_to_string(index_path).await {
                                Err(_) => {
                                    return Response::builder()
                                        .status(StatusCode::NOT_FOUND)
                                        .body(boxed(Body::from("Something went wrong...")))
                                        .unwrap()
                                }
                                Ok(index_content) => index_content,
                            };

                            Response::builder()
                                .status(StatusCode::OK)
                                .body(boxed(Body::from(index_content)))
                                .unwrap()
                        }
                        _ => res.map(boxed),
                    }
                }
                Err(err) => Response::builder()
                    .status(StatusCode::INTERNAL_SERVER_ERROR)
                    .body(boxed(Body::from(format!("error: {err}"))))
                    .expect("error response"),
            }
        }))
        // .layer(cors)
        .layer(TraceLayer::new_for_http());

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    println!("->> LISTENING on {addr}\n");

    println!("🚀 Server started successfully!!\n");

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

/*
 * INICIAR EL SERVIDOR EN MODO WATCH:
 * cargo watch -q -c -w src/ -x run // or cargo run
 *
 * CHECKEANDO DEL SERVIDOR CON EL COMANDO cURL. VER:
 * curl -v https://axum-spa.onrender.com/api/healthchecker | json_pp
 * (NO ES NECESARIO EL CORS SI EL SERVICIO DE LOS ASSETS ESTÁTICOS SE HACE DESDE EL MISMO SERVER)
 *
 * EL SERVIDOR SIRVE LOS ASSETS DESDE LA CACHÉ RESPONDIENDO CON STATUS 304 Not Modified. VER:
 * https://developer.mozilla.org/es/docs/Web/HTTP/Status/304
 *
 * SOBRE AXUM & TOWER-HTTP. VER:
 * https://docs.rs/axum/latest/axum/routing/struct.Router.html#method.nest
 * https://docs.rs/axum/latest/axum/routing/struct.Router.html#method.nest_service
 * https://docs.rs/axum/latest/axum/routing/method_routing/struct.MethodRouter.html#method.fallback_service
 *
 * MODELO DE MANEJO DE ERRORES DE AXUM. VER:
 * https://docs.rs/axum/latest/axum/error_handling/index.html
 * https://docs.rs/axum/latest/axum/#error-handling
 * https://blog.logrocket.com/rust-axum-error-handling/
 * https://docs.rs/tower-http/latest/tower_http/services/struct.ServeDir.html#method.try_call
 * https://github.com/tokio-rs/axum/issues/87
 * https://github.com/tokio-rs/axum/discussions/331
 * https://github.com/tokio-rs/axum/discussions/1786
 * https://github.com/tokio-rs/axum/blob/main/examples/static-file-server/src/main.rs
 * https://github.com/rksm/axum-yew-setup/blob/master/server/src/main.rs
 * https://docs.rs/tower/latest/tower/fn.service_fn.html
 * https://github.com/tokio-rs/axum/discussions/1822
 *
 * EN TOWER-HTTP v.0.4.0 EL MANEJO DE ERRORES PUEDE DEJARSE COMO DICE EL PROPIO David Pedersen:
 * Cómo usar handle_error en MethodRouter correctamente. VER:
 * https://github.com/tokio-rs/axum/discussions/1786
 * ADEMÁS EN LOS EJEMPLOS DE AXUM SE HACE ASÍ. VER:
 * https://github.com/tokio-rs/axum/blob/main/examples/static-file-server/src/main.rs
 * EN LA VERSIÓN v.0.3.0, SIN EMBARGO, SI USA HANDLE_ERROR. VER:
 * Serving a SPA and APIs:
 * https://github.com/tokio-rs/axum/discussions/867
 *
 * SIRVIENDO ESTÁTICOS DESDE AXUM. VER:
 * https://github.com/search?q=axum+blog&type=repositories
 * https://github.com/Ericarthurc/ericarthurc.com_axum_solid_OLD
 * https://github.com/Ericarthurc/ericarthurc.com_axum_OLD
 *
 * https://github.com/search?q=axum+solidjs&type=repositories
 * https://github.com/robertwayne/template-axum-solidjs-spa
 *
 * https://github.com/search?q=axum%20react&type=repositories
 * https://github.com/robertwayne/template-axum-react-spa
 *
 * https://github.com/search?q=axum%20yew&type=repositories
 * https://github.com/rksm/axum-yew-setup
 * https://robert.kra.hn/posts/2022-04-03_rust-web-wasm/
 * https://www.udemy.com/course/learn-full-stack-rust-programming-using-axum-yew-and-sqlx/
 * https://github.com/infinityfish/fullstackrustcourse
 *
 * https://www.google.com/search?q=axum+server+frontend&oq=axu&aqs=chrome.0.69i59l2j69i57j69i59j46i67i340i650j69i60l3.1955j0j4&sourceid=chrome&ie=UTF-8
 *
 * HTTP Cache Headers - A Complete Guide. VER:
 * https://www.keycdn.com/blog/http-cache-headers#:~:text=downloaded%20every%20time.-,max%2Dage,for%20the%20next%2090%20seconds.
 */
