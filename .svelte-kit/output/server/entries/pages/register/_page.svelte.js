import "../../../chunks/internal.js";
import { b as attr, i as head } from "../../../chunks/server.js";
import "../../../chunks/navigation.js";
//#region src/routes/register/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let name = "";
		let email = "";
		let password = "";
		let nik = "";
		let phone = "";
		let loading = false;
		head("52fghe", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Daftar Akun | SSO Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"><div class="sm:mx-auto sm:w-full sm:max-w-md"><div class="flex justify-center"><div class="w-16 h-16 bg-blue-600 rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white transform rotate-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path></svg></div></div> <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">Pendaftaran Warga Baru</h2> <p class="mt-2 text-center text-sm text-slate-600">Portal SSO Desa Mengeruda</p></div> <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"><div class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form class="space-y-5"><div><label for="name" class="block text-sm font-medium text-slate-700">Nama Lengkap Sesuai KTP</label> <div class="mt-1"><input id="name" type="text"${attr("value", name)} required="" class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"/></div></div> <div><label for="nik" class="block text-sm font-medium text-slate-700">Nomor Induk Kependudukan (NIK)</label> <div class="mt-1"><input id="nik" type="text"${attr("value", nik)} required="" class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"/></div></div> <div><label for="phone" class="block text-sm font-medium text-slate-700">Nomor Handphone (WhatsApp)</label> <div class="mt-1"><input id="phone" type="text"${attr("value", phone)} required="" class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"/></div></div> <div><label for="email" class="block text-sm font-medium text-slate-700">Alamat Email</label> <div class="mt-1"><input id="email" type="email"${attr("value", email)} required="" class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"/></div></div> <div><label for="password" class="block text-sm font-medium text-slate-700">Password</label> <div class="mt-1"><input id="password" type="password"${attr("value", password)} required="" class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"/></div></div> <div><button type="submit"${attr("disabled", loading, true)} class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`Daftar Sekarang`);
		$$renderer.push(`<!--]--></button></div></form> <div class="mt-6 text-center text-sm"><span class="text-slate-600">Sudah punya akun?</span> <a href="/" class="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors">Masuk di sini</a></div></div></div></div>`);
	});
}
//#endregion
export { _page as default };
