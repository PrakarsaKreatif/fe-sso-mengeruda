<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import api from '$lib/api';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);

  onMount(() => {
    // Jika sudah punya token, langsung lempar ke dashboard
    const token = localStorage.getItem('sso_token');
    if (token) {
      goto('/dashboard');
    }
  });

  async function handleLogin(e) {
    e.preventDefault();
    loading = true;
    error = '';

    try {
      const response = await api.post('/api/login', { email, password });
      
      if (response.data.access_token) {
        // Simpan token di local storage
        localStorage.setItem('sso_token', response.data.access_token);
        localStorage.setItem('sso_user', JSON.stringify(response.data.user));
        
        // Redirect ke dashboard
        goto('/dashboard');
      } else {
        error = response.data.message || 'Login gagal.';
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        error = 'Email atau password salah.';
      } else {
        error = 'Terjadi kesalahan pada server.';
      }
      console.error(err);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>SSO Login - Desa Mengeruda</title>
</svelte:head>

<div class="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
  <div class="text-center">
    <div class="flex justify-center mb-4">
      <!-- Placeholder logo, bisa diganti logo desa -->
      <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.071 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
      </div>
    </div>
    <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Portal SSO</h2>
    <p class="mt-2 text-sm text-gray-500 font-medium">Sistem Informasi Terpadu Desa Mengeruda</p>
  </div>

  {#if error}
    <div class="p-4 text-sm text-red-700 bg-red-100 rounded-lg flex items-center gap-3 animate-fade-in-up">
      <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
      {error}
    </div>
  {/if}

  <form class="space-y-5" on:submit={handleLogin}>
    <div>
      <label for="email" class="block text-sm font-semibold text-gray-700">Email Address</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
        </div>
        <input id="email" type="email" bind:value={email} required class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200" placeholder="admin@mengeruda.id" />
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <input id="password" type="password" bind:value={password} required class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200" placeholder="••••••••" />
      </div>
    </div>

    <div>
      <button type="submit" disabled={loading} class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5">
        {#if loading}
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Mauthentikasi...
        {:else}
          Masuk
        {/if}
      </button>
    </div>
  </form>
  
  <div class="mt-6 text-center text-xs text-gray-400">
    &copy; 2026 Desa Mengeruda. Hak cipta dilindungi.
  </div>
</div>

<style>
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
  }
</style>
