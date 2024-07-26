"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaksi {
  id: number;
  id_user: number;
  no_telepon: string;
  alamat: string;
  item: string; // JSON string
  tanggal: string;
}

interface Item {
  id: number;
  category_id: number;
  name: string;
  price: string;
  count: number;
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

  const parseItem = (itemString: string): Item[] => {
    try {
      const parsed = JSON.parse(itemString);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      console.error('Error parsing item string:', itemString);
      return [];
    }
  };

  const calculateTotal = (items: Item[] | null | undefined): number => {
    if (!Array.isArray(items)) {
      return 0;
    }
    return items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const count = item.count || 0;
      return total + (price * count);
    }, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Transaksi</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">No. Telepon</th>
              <th className="py-2 px-4 border-b">Alamat</th>
              <th className="py-2 px-4 border-b">Item</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map(t => {
              const items = parseItem(t.item);
              const total = calculateTotal(items);
              return (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{t.id}</td>
                  <td className="py-2 px-4 border-b">{t.id_user}</td>
                  <td className="py-2 px-4 border-b">{t.no_telepon}</td>
                  <td className="py-2 px-4 border-b">{t.alamat}</td>
                  <td className="py-2 px-4 border-b">
                    {Array.isArray(items) && items.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {items.map((item, index) => (
                          <li key={index}>
                            {item.name} - Rp.{item.price} x {item.count}
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