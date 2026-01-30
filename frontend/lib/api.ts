import { Kategori, LoginResponse, User, Status, Produk  } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';


class ApiClient {
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login gagal');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        await fetch(`${API_BASE_URL}/api/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...this.getAuthHeader(),
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/auth/me/`, {
      headers: this.getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error('Gagal mendapatkan data user');
    }

    return response.json();
  }

  // Kategori
  async getKategoris(): Promise<Kategori[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/kategori/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle paginated response
      if (data.results && Array.isArray(data.results)) {
        return data.results;
      }
      
      // Handle direct array response
      if (Array.isArray(data)) {
        return data;
      }
      
      console.error('Response format tidak dikenali:', data);
      return [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async createKategori(nama_kategori: string): Promise<Kategori> {
    const response = await fetch(`${API_BASE_URL}/api/kategori/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify({ nama_kategori }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Gagal membuat kategori');
    }

    return response.json();
  }

  async updateKategori(id: number, nama_kategori: string): Promise<Kategori> {
    const response = await fetch(`${API_BASE_URL}/api/kategori/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify({ nama_kategori }),
    });

    if (!response.ok) {
      throw new Error('Gagal update kategori');
    }

    return response.json();
  }

  async deleteKategori(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/kategori/${id}/`, {
      method: 'DELETE',
      headers: this.getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error('Gagal hapus kategori');
    }
  }

  // Status
  async getStatuses(): Promise<Status[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/status/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle paginated response
      if (data.results && Array.isArray(data.results)) {
        return data.results;
      }
      
      // Handle direct array response
      if (Array.isArray(data)) {
        return data;
      }
      
      console.error('Response format tidak dikenali:', data);
      return [];
    } catch (error) {
      console.error('Error fetching statuses:', error);
      return [];
    }
  }

  async createStatus(nama_status: string): Promise<Status> {
    const response = await fetch(`${API_BASE_URL}/api/status/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify({ nama_status }),
    });

    if (!response.ok) {
      throw new Error('Gagal membuat status');
    }

    return response.json();
  }

  async updateStatus(id: number, nama_status: string): Promise<Status> {
    const response = await fetch(`${API_BASE_URL}/api/status/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify({ nama_status }),
    });

    if (!response.ok) {
      throw new Error('Gagal update status');
    }

    return response.json();
  }

  async deleteStatus(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/status/${id}/`, {
      method: 'DELETE',
      headers: this.getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error('Gagal hapus status');
    }
  }

  // Produk
  async getProduks(): Promise<Produk[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/produk/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle paginated response (Django REST Framework)
      if (data.results && Array.isArray(data.results)) {
        return data.results;
      }
      
      // Handle direct array response
      if (Array.isArray(data)) {
        return data;
      }
      
      console.error('Response format tidak dikenali:', data);
      return [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async createProduk(data: {
    nama_produk: string;
    harga: string;
    kategori: string | number;
    status: string | number;
  }): Promise<Produk> {
    const response = await fetch(`${API_BASE_URL}/api/produk/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    console.log(data);
    

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Gagal membuat produk');
    }

    return response.json();
  }

  async updateProduk(
    id: number,
    data: {
      nama_produk: string;
      harga: string;
      kategori: string | number;
      status: string | number;
    }
  ): Promise<Produk> {
    const response = await fetch(`${API_BASE_URL}/api/produk/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Gagal update produk');
    }

    return response.json();
  }

  async deleteProduk(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/produk/${id}/`, {
      method: 'DELETE',
      headers: this.getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error('Gagal hapus produk');
    }
  }
}

export const apiClient = new ApiClient();