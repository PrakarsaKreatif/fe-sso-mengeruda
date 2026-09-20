import { o as slot } from "../../chunks/server.js";
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.push(`<div class="min-h-screen bg-gray-50 flex flex-col font-sans"><main class="flex-grow flex items-center justify-center"><!--[-->`);
	slot($$renderer, $$props, "default", {}, null);
	$$renderer.push(`<!--]--></main></div>`);
}
//#endregion
export { _layout as default };
