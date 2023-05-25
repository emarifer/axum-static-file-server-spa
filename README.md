# Axum Static File Server + SPA [Full-stack app: Rust&Axum/TypeScript&Solidjs]

### Full-stack SPA demo using Solidjs, TypeScript, and Tailwindcss. Backend by Rust with Axum.

First, you need to compile the frontend:

```bash
$ pnpm build  #(you need to have Nodejs and pnpm (or yarn) installed)
```

To run the server (in development mode):

```bash
$ cargo run # or cargo watch -q -c -w src/ -x run (cargo-watch must be installed on the system)
```

The page will reload if you make edits (with watch mode) 😀.

To build the project for production and minimize its size:

```bash
$ cargo build --release
```

Runs the app in the development mode.<br>
Open [http://localhost:8080/api/healthchecker](http://localhost:8080/api/healthchecker) to view it in the browser.
