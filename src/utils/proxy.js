import { useAuthStore } from '@/context/authStore';

// Redirect to login page
function redirectToLogin() {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

// Main fetch function with auth check
export async function proxyFetch(endpoint, options = {}) {
  const { token, logout } = useAuthStore.getState();

  // If no token, redirect to login
  if (!token) {
    redirectToLogin();
    throw new Error('Not authenticated');
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  // If unauthorized, logout and redirect
  if (response.status === 401 || response.status === 403) {
    logout();
    redirectToLogin();
    throw new Error('Unauthorized');
  }

  return response.json();
}
