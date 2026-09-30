<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import api from '$lib/api';

    onMount(async () => {
        const token = localStorage.getItem('sso_token');
        if (token) {
            try {
                await api.post('/api/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (e) {
                console.error('Failed to logout from backend', e);
            }
        }
        
        localStorage.removeItem('sso_token');
        localStorage.removeItem('sso_user');
        
        goto('/');
    });
</script>

<div class="flex flex-col items-center justify-center min-h-[300px]">
    <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
    <h2 class="text-lg font-semibold text-gray-700">Sedang keluar...</h2>
</div>
