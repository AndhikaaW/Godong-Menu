"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaksi {
  id: number;
  id_user: number;
  no_telepon: string;
  alamat: string;
  sub_total: number;
  total: number;
  tanggal: string;
  diskon_persen: number;
  diskon_rupiah: number;
  user: User;
  detail_penjualan: Item[];
}

interface User {
  id: number;
  nama: string;
  email: string;
  address: string;
  phone: string;
  status: number;
  pictures: string;
}

interface Item {
  id: number;
  name: string;
  faktur: string;
  kode_menu: string;
  jumlah: number;
  subtotal: number;
  total: number;
  diskon_persen: string;
  diskon_rupiah: string;
}

const Transaksi = () => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const response = await axios.get('http://godongbackend.test/api/alltransaksi');
        setTransaksi(response.data);
      } catch (error) {
        console.error('Error fetching transaksi:', error);
      }
    };

    fetchTransaksi();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Transaksi</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nama User</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">No. Telepon</th>
              <th className="py-2 px-4 border-b">Alamat</th>
              <th className="py-2 px-4 border-b">Item</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map(t => {
              const items = t.detail_penjualan;
              const total = t.total;
              return (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{t.id}</td>
                  <td className="py-2 px-4 border-b">{t.user.nama}</td>
                  <td className="py-2 px-4 border-b">{t.user.email}</td>
                  <td className="py-2 px-4 border-b">{t.no_telepon}</td>
                  <td className="py-2 px-4 border-b">{t.alamat}</td>
                  <td className="py-2 px-4 border-b">
                    {Array.isArray(items) && items.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {items.map((item, index) => (
                          <li key={index}>
                            {item.name} - Rp.{item.total} x {item.jumlah}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Tidak ada item</p>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">Rp.{total.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{new Date(t.tanggal).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaksi;
