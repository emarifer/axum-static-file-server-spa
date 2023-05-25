import type { Component } from "solid-js";

export const NotFound: Component = () => {
  return (
    <>
      <span class="text-2xl md:text-4xl text-indigo-700 font-black">
        Error 404: Not Found
      </span>
      <button
        onclick={() => window.history.back()}
        class="mt-4 px-4 py-1 rounded-md bg-sky-600 hover:bg-sky-400"
      >
        &larr; Go back
      </button>
    </>
  );
};

/*
 * Onclick javascript to make browser go back to previous page?. VER:
 * https://stackoverflow.com/questions/8067510/onclick-javascript-to-make-browser-go-back-to-previous-page
 */
