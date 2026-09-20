<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import api from '$lib/api';

  let user = $state(null);
  let token = $state(null);
  let showExpiredModal = $state(false);

  // Daftar semua aplikasi yang terdaftar
  const apps = [
    {
      id: 'Profile Website',
      name: 'Profile Website',
      description: 'Manajemen konten profil dan informasi pemerintahan desa.',
      url: 'http://localhost:5174/auth-receiver',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L14.5 4H5"></path></svg>',
      color: 'bg-emerald-500'
    },
    {
      id: 'Tourism',
      name: 'Pariwisata (Tourism)',
      description: 'Manajemen objek wisata, agenda, umkm, dan berita.',
      url: 'http://localhost:5175/auth-receiver',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      color: 'bg-blue-500'
    },
    {
      id: 'E-Surat',
      name: 'E-Surat',
      description: 'Sistem pelayanan administrasi dan persuratan desa.',
      url: 'http://localhost:5177/auth-receiver',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"></path></svg>',
      color: 'bg-orange-500'
    },
    {
      id: 'E-Presensi',
      name: 'E-Presensi',
      description: 'Sistem absensi digital berbasis lokasi untuk aparat desa.',
      url: 'http://localhost:5178/auth-receiver',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
      color: 'bg-rose-500'
    }
  ];

  let allowedApps = $state([]);

  onMount(() => {
    token = localStorage.getItem('sso_token');
    if (!token) {
      goto('/');
      return;
    }

    if (isTokenExpired(token)) {
      showExpiredModal = true;
    }

    try {
      user = JSON.parse(localStorage.getItem('sso_user'));
      
      // Ambil daftar nama aplikasi yang boleh diakses dari user claims
      // Asumsi: user.roles[0].applications adalah array objects, tapi di JWT claims kita buat string array
      const userAppNames = user?.applications || [];
      
      if (user.roles && user.roles.some(r => r.name === 'Super Admin' || r.name === 'Admin')) {
        allowedApps = apps; // Super admin/Admin bisa akses semua
      } else {
        allowedApps = apps.filter(app => userAppNames.includes(app.id));
      }

    } catch (e) {
      console.error('Invalid user data', e);
      logout();
    }
  });

  function logout() {
    localStorage.removeItem('sso_token');
    localStorage.removeItem('sso_user');
    goto('/');
  }
  
  function isTokenExpired(t) {
    if (!t) return true;
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  }

  function launchApp(app) {
    if (!token) return;
    
    if (isTokenExpired(token)) {
      showExpiredModal = true;
      return;
    }

    // Redirect ke aplikasi tujuan dengan token di URL query
    // Aplikasi tujuan (misal auth-receiver) harus menangkap token ini, menyimpannya di localStorage lokal, lalu redirect kembali ke /admin
    window.location.href = `${app.url}?token=${encodeURIComponent(token)}`;
  }
</script>

<svelte:head>
  <title>Dashboard SSO - Desa Mengeruda</title>
</svelte:head>

<div class="w-full max-w-5xl px-4 py-8 mx-auto">
  <!-- Header -->
  <header class="flex items-center justify-between mb-10 pb-4 border-b border-gray-200">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.071 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
      </div>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Portal Aplikasi Mengeruda</h1>
        <p class="text-sm text-gray-500">SSO Identity & Access Management</p>
      </div>
    </div>
    
    {#if user}
    <div class="flex items-center gap-4">
      <div class="text-right hidden sm:block">
        <p class="text-sm font-semibold text-gray-900">{user.name}</p>
        <p class="text-xs text-gray-500">{user.email}</p>
      </div>
      <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <button on:click={logout} class="ml-2 text-sm text-red-600 hover:text-red-800 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
        Keluar
      </button>
    </div>
    {/if}
  </header>

  <!-- Content -->
  <main>
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-800">Aplikasi Saya</h2>
      <p class="text-gray-500 mt-1">Pilih aplikasi yang ingin Anda kelola.</p>
    </div>

    {#if allowedApps.length === 0}
      <div class="p-8 text-center bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900">Tidak ada akses</h3>
        <p class="text-gray-500 mt-2 max-w-md mx-auto">Anda belum diberikan izin akses ke aplikasi manapun. Silakan hubungi Super Admin untuk meminta akses.</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each allowedApps as app}
          <button on:click={() => launchApp(app)} class="group text-left bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <div class={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${app.color}`}></div>
            
            <div class={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 shadow-md ${app.color}`}>
              {@html app.icon}
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-2">{app.name}</h3>
            <p class="text-sm text-gray-500 leading-relaxed mb-6">
              {app.description}
            </p>
            
            <div class="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-800">
              Masuk Aplikasi 
              <svg class="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </main>
</div>

<!-- Modal Token Expired -->
{#if showExpiredModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
      <div class="p-6 text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Sesi Telah Berakhir</h3>
        <p class="text-gray-500 mb-6">Token keamanan (sesi) Anda sudah kadaluarsa. Demi keamanan, silakan login kembali untuk melanjutkan.</p>
        <button on:click={logout} class="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors">
          Login Ulang
        </button>
      </div>
    </div>
  </div>
{/if}
