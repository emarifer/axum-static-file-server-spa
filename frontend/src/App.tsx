import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";

import logo from "./assets/img/logo.png";
import { Navbar, Sidebar } from "./components";
import { About, Home, NotFound } from "./pages";

const App: Component = () => {
  return (
    <>
      <Navbar />

      <div class="flex flex-col mt-32 w-60 md:w-[400px] mx-auto gap-6">
        <header class="flex flex-col mx-auto w-full">
          <h1 class="text-xl md:text-3xl text-center font-black mb-5">
            Demo application with frontend made with Solidjs and as backend
            Axum/Rust.
          </h1>

          <img
            class="w-24 md:w-32 mb-8 mx-auto hover:scale-110 ease-in-out duration-500"
            src={logo}
            alt="App logo"
          />
        </header>

        <main class="pl-4 w-full my-2 md:my-4">
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="*" component={NotFound} />
          </Routes>
        </main>

        <footer class="mt-3 mb-6 text-center">
          <a
            class="italic tracking-wider hover:text-sky-500 ease-in duration-300"
            href="https://github.com/emarifer?tab=repositories"
            target="_blank"
          >
            MIT Licensed | Copyright © {new Date().getFullYear()} Enrique Marín
          </a>
        </footer>
      </div>

      <Sidebar />
    </>
  );
};

export default App;

/*
 * USO DEL COMPONENTE "A" PARA ENLACES ACTIVOS. VER:
 * https://docs.solidjs.com/guides/how-to-guides/routing-in-solid/solid-router#the-a-component
 *
 * RENDERIZADO Y ESTILOS CONDICIONALES. VER:
 * https://www.solidjs.com/tutorial/bindings_classlist
 * https://www.solidjs.com/tutorial/flow_show
 */
