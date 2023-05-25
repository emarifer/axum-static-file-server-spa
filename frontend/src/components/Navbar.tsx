import type { Component } from "solid-js";
import { Link, A } from "@solidjs/router";
import { setShowSidebar, showSidebar } from "../store";

export const Navbar: Component = () => {
  return (
    <nav class="w-full h-16 px-4 md:px-12 flex justify-between items-center bg-slate-800 fixed top-0 left-0 right-0 z-50">
      <Link class="block" href="/">
        <svg
          class="w-8 md:w-12 hover:scale-110 ease-in-out duration-500"
          viewBox="0 0 48 48"
        >
          <path fill="#E65100" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path>
          <path fill="#FF6D00" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path>
          <path
            fill="#FFF"
            d="M24,25v-4h8.6l-0.7,11.5L24,35.1v-4.2l4.1-1.4l0.3-4.5H24z M32.9,17l0.3-4H24v4H32.9z"
          />
          <path
            fill="#EEE"
            d="M24,30.9v4.2l-7.9-2.6L15.7,27h4l0.2,2.5L24,30.9z M19.1,17H24v-4h-9.1l0.7,12H24v-4h-4.6L19.1,17z"
          />
        </svg>
      </Link>

      <div class="hidden md:flex md:items-center md:gap-16">
        <div class="flex items-center gap-2 md:gap-4">
          <A
            end
            class="border-0"
            activeClass="border-b-2 border-sky-500"
            href="/"
          >
            Home
          </A>
          <A
            class="border-0"
            activeClass="border-b-2 border-sky-500"
            href="/about"
          >
            About
          </A>
        </div>

        <p class="text-2xl font-black">Axum Frontend App</p>
      </div>

      <div class="md:hidden flex gap-6">
        <p class="text-lg font-bold">Axum Frontend App</p>

        <button
          class="md:hidden"
          onclick={() => setShowSidebar(!showSidebar())}
        >
          <svg class="w-6" fill="currentColor" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 \
	      0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

/*
 * USO DEL COMPONENTE "A" PARA ENLACES ACTIVOS. VER:
 * https://docs.solidjs.com/guides/how-to-guides/routing-in-solid/solid-router#the-a-component
 */
