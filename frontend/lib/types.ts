export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface Kategori {
  id: number;
  nama_kategori: string;
}

export interface Status {
  id: number;
  nama_status: string;
}

export interface Produk {
  id: number;
  nama_produk: string;
  harga: string;
  kategori: Kategori;
  status: Status;
  kategori_id?: number;
  status_id?: number;
}