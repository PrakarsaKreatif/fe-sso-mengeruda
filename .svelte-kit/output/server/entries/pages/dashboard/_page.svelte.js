import "../../../chunks/internal.js";
import { c as html, i as head, r as ensure_array_like, t as attr_class, x as escape_html } from "../../../chunks/server.js";
import "../../../chunks/client.js";
import "../../../chunks/navigation.js";
import "../../../chunks/api.js";
//#region src/routes/dashboard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let allowedApps = [];
		head("x1i5gj", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Dashboard SSO - Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<div class="w-full max-w-5xl px-4 py-8 mx-auto"><header class="flex items-center justify-between mb-10 pb-4 border-b border-gray-200"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.071 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg></div> <div><h1 class="text-2xl font-bold text-gray-900">Portal Aplikasi Mengeruda</h1> <p class="text-sm text-gray-500">SSO Identity &amp; Access Management</p></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></header> <main><div class="mb-8"><h2 class="text-xl font-bold text-gray-800">Aplikasi Saya</h2> <p class="text-gray-500 mt-1">Pilih aplikasi yang ingin Anda kelola.</p></div> `);
		if (allowedApps.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-8 text-center bg-white rounded-2xl border border-gray-200 shadow-sm"><div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div> <h3 class="text-lg font-bold text-gray-900">Tidak ada akses</h3> <p class="text-gray-500 mt-2 max-w-md mx-auto">Anda belum diberikan izin akses ke aplikasi manapun. Silakan hubungi Super Admin untuk meminta akses.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
			const each_array = ensure_array_like(allowedApps);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let app = each_array[$$index];
				$$renderer.push(`<button class="group text-left bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"><div${attr_class(`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${app.color}`)}></div> <div${attr_class(`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 shadow-md ${app.color}`)}>${html(app.icon)}</div> <h3 class="text-xl font-bold text-gray-900 mb-2">${escape_html(app.name)}</h3> <p class="text-sm text-gray-500 leading-relaxed mb-6">${escape_html(app.description)}</p> <div class="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-800">Masuk Aplikasi <svg class="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div></button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></main></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
