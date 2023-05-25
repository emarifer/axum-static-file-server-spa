import type { Component } from "solid-js";
import { A } from "@solidjs/router";
import { setShowSidebar, showSidebar } from "../store";

export const Sidebar: Component = () => {
  return (
    <div class="md:hidden">
      {/* Overlay */}
      <div
        onclick={() => setShowSidebar(!showSidebar())}
        class={
          showSidebar()
            ? "bg-black opacity-60 fixed top-16 right-0 bottom-0 left-0 z-30"
            : "hidden"
        }
      ></div>

      {/* Sidebar */}
      <div
        class={`fixed top-16 bottom-0 left-0 z-40 w-2/3 p-4 bg-slate-700 flex flex-col transition-transform -translate-x-full duration-700 ${
          showSidebar() ? "translate-x-0" : ""
        }`}
      >
        {/* Close button */}
        <button
          onclick={() => setShowSidebar(!showSidebar())}
          class="absolute top-4 right-4 active:bg-slate-800"
        >
          <svg class="w-5" viewBox="0 0 16 16">
            <g stroke="currentColor">
              <path
                stroke-width="1"
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 \
                  8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
              />
            </g>
          </svg>
        </button>

        {/* Links */}
        <div class="flex flex-col justify-start mt-6 ml-2 gap-6">
          <p class="text-lg font-bold">Axum Frontend App</p>

          <div class="flex flex-col gap-4">
            <A
              onclick={() => setShowSidebar(!showSidebar())}
              end
              class="border-0 flex gap-2 w-[72px]"
              activeClass="border-b-2 border-sky-500"
              href="/"
            >
              <svg fill="currentColor" class="w-4" viewBox="0 0 16 16">
                <path
                  d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 \
	          .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 \
	          1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"
                />
              </svg>
              Home
            </A>
            <A
              onclick={() => setShowSidebar(!showSidebar())}
              class="border-0 flex gap-2 w-[72px]"
              activeClass="border-b-2 border-sky-500"
              href="/about"
            >
              <svg fill="currentColor" class="w-[18px]" viewBox="0 0 16 16">
                <path
                  d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 \
	          7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 \
		  1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"
                />
              </svg>
              About
            </A>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
 * RENDERIZADO Y ESTILOS CONDICIONALES. VER:
 * https://www.solidjs.com/tutorial/bindings_classlist
 * https://www.solidjs.com/tutorial/flow_show
 */
