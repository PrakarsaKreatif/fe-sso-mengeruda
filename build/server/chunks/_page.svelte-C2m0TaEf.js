import { h as head, c as attr } from './index.js-BWbgTb5R.js';
import './client-CQCoLf1m.js';
import './api-Cz0E2orz.js';
import 'axios';

//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let email = "";
		let password = "";
		let loading = false;
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>SSO Login - Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<div class="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100"><div class="text-center"><div class="flex justify-center mb-4"><div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200"><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.071 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg></div></div> <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Portal SSO</h2> <p class="mt-2 text-sm text-gray-500 font-medium">Sistem Informasi Terpadu Desa Mengeruda</p></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form class="space-y-5"><div><label for="email" class="block text-sm font-semibold text-gray-700">Email Address</label> <div class="mt-1 relative rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg></div> <input id="email" type="email"${attr("value", email)} required="" class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200" placeholder="admin@mengeruda.id"/></div></div> <div><label for="password" class="block text-sm font-semibold text-gray-700">Password</label> <div class="mt-1 relative rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div> <input id="password" type="password"${attr("value", password)} required="" class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200" placeholder="••••••••"/></div></div> <div><button type="submit"${attr("disabled", loading, true)} class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`Masuk`);
		$$renderer.push(`<!--]--></button></div></form> <div class="mt-6 text-center text-xs text-gray-400">© 2026 Desa Mengeruda. Hak cipta dilindungi.</div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C2m0TaEf.js.map
