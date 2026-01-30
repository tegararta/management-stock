'use client';

import { useEffect, useState } from 'react';
import { apiClient, Produk, Kategori, Status } from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProduk: 0,
    totalKategori: 0,
    totalStatus: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [products, categories, statuses] = await Promise.all([
        apiClient.getProduks(),
        apiClient.getKategoris(),
        apiClient.getStatuses(),
      ]);

      setStats({
        totalProduk: products.length,
        totalKategori: categories.length,
        totalStatus: statuses.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'Total Produk',
      value: stats.totalProduk,
      icon: '',
      href: '/admin/produk',
      color: 'blue',
    },
    {
      title: 'Total Kategori',
      value: stats.totalKategori,
      icon: '',
      href: '/admin/kategori',
      color: 'green',
    },
    {
      title: 'Total Status',
      value: stats.totalStatus,
      icon: '',
      href: '/admin/status',
      color: 'purple',
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Selamat datang di panel administrasi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-${card.color}-500`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className="text-4xl">{card.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/produk"
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition text-center"
          >
            <span className="text-blue-600 font-semibold">+ Tambah Produk Baru</span>
          </Link>
          <Link
            href="/admin/kategori"
            className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition text-center"
          >
            <span className="text-green-600 font-semibold">+ Tambah Kategori Baru</span>
          </Link>
          <Link
            href="/admin/status"
            className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition text-center"
          >
            <span className="text-purple-600 font-semibold">+ Tambah Status Baru</span>
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Tips</h3>
        <ul className="text-blue-800 space-y-2 text-sm">
          <li>• Gunakan menu navigasi di atas untuk mengelola data</li>
          <li>• Pastikan membuat kategori dan status sebelum menambah produk</li>
          <li>• Klik tombol "Lihat Halaman Publik" untuk melihat tampilan pelanggan</li>
        </ul>
        <Link
          href="/"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Lihat Halaman Publik
        </Link>
      </div>
    </div>
  );
}