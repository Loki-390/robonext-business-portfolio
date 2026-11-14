// Standard REST API client with JWT interceptors and identical Axios-compatible interface

const rawApiUrl = import.meta.env.VITE_API_URL || 'https://robonext-backend.onrender.com';
const normalizedBaseURL = rawApiUrl.endsWith('/api')
  ? rawApiUrl
  : `${rawApiUrl.replace(/\/$/, '')}/api`;

class ApiClient {
  constructor(baseURL = normalizedBaseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullPath = `${this.baseURL}${cleanEndpoint}`;
    const url = fullPath.startsWith('http')
      ? new URL(fullPath)
      : new URL(fullPath, window.location.origin);

    // Append query params if present
    if (options.params) {
      Object.entries(options.params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, val);
        }
      });
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    // Attach JWT token from localStorage
    const token = localStorage.getItem('robonext_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method: options.method || 'GET',
      headers,
      ...options
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url.toString(), config);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Handle 401 session expiration
        if (response.status === 401 && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          localStorage.removeItem('robonext_admin_token');
          localStorage.removeItem('robonext_admin_user');
          window.location.href = '/admin/login?expired=1';
        }

        const error = new Error(data.message || `HTTP ${response.status}`);
        error.response = { status: response.status, data };
        throw error;
      }

      return { data, status: response.status, ok: true };
    } catch (err) {
      if (!err.response) {
        err.response = { status: 500, data: { success: false, message: err.message } };
      }
      throw err;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

const api = new ApiClient(normalizedBaseURL);
export default api;