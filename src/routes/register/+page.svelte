<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    let name = $state('');
    let email = $state('');
    let password = $state('');
    let nik = $state('');
    let phone = $state('');
    
    let errorMsg = $state('');
    let successMsg = $state('');
    let loading = $state(false);

    async function handleRegister(e) {
        e.preventDefault();
        loading = true;
        errorMsg = '';
        successMsg = '';

        try {
            const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL || import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8002';
            const apiBaseUrl = `${baseUrl.replace(/\/$/, '')}/api`;
            const res = await fetch(`${apiBaseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, password, nik, phone })
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    errorMsg = Object.values(data.errors).flat().join('\n');
                } else {
                    errorMsg = data.message || 'Gagal mendaftar. Silakan periksa data Anda.';
                }
                return;
            }

            successMsg = data.message || 'Pendaftaran berhasil. Silakan masuk (login).';
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                goto('/');
            }, 2000);

        } catch (error) {
            console.error('Registration error:', error);
            errorMsg = 'Terjadi kesalahan koneksi server.';
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Daftar Akun | SSO Desa Mengeruda</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="flex justify-center">
            <div class="w-16 h-16 bg-blue-600 rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white transform rotate-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
            Pendaftaran Warga Baru
        </h2>
        <p class="mt-2 text-center text-sm text-slate-600">
            Portal SSO Desa Mengeruda
        </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
            
            {#if errorMsg}
                <div class="mb-4 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-md">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-rose-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-rose-700 whitespace-pre-line">{errorMsg}</p>
                        </div>
                    </div>
                </div>
            {/if}

            {#if successMsg}
                <div class="mb-4 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-md">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-emerald-700 whitespace-pre-line">{successMsg}</p>
                        </div>
                    </div>
                </div>
            {/if}

            <form class="space-y-5" onsubmit={handleRegister}>
                <div>
                    <label for="name" class="block text-sm font-medium text-slate-700">Nama Lengkap Sesuai KTP</label>
                    <div class="mt-1">
                        <input id="name" type="text" bind:value={name} required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors">
                    </div>
                </div>

                <div>
                    <label for="nik" class="block text-sm font-medium text-slate-700">Nomor Induk Kependudukan (NIK)</label>
                    <div class="mt-1">
                        <input id="nik" type="text" bind:value={nik} required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors">
                    </div>
                </div>

                <div>
                    <label for="phone" class="block text-sm font-medium text-slate-700">Nomor Handphone (WhatsApp)</label>
                    <div class="mt-1">
                        <input id="phone" type="text" bind:value={phone} required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors">
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-slate-700">Alamat Email</label>
                    <div class="mt-1">
                        <input id="email" type="email" bind:value={email} required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors">
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-slate-700">Password</label>
                    <div class="mt-1">
                        <input id="password" type="password" bind:value={password} required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors">
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={loading} class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50">
                        {#if loading}
                            Mendaftar...
                        {:else}
                            Daftar Sekarang
                        {/if}
                    </button>
                </div>
            </form>

            <div class="mt-6 text-center text-sm">
                <span class="text-slate-600">Sudah punya akun? </span>
                <a href="/" class="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors">
                    Masuk di sini
                </a>
            </div>
        </div>
    </div>
</div>
