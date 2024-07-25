"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Check } from 'lucide-react';
import axios from 'axios';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

interface DetailItem {
  kode_menu: string;
  jumlah: number;
  total: number;
  menu_name: string;
  image: string;
}

interface Transaction {
  faktur: string;
  id_user: number;
  no_telepon: string;
  alamat: string;
  tanggal: string;
  total: number;
  details: DetailItem[];
  main_item: DetailItem;
  other_items_count: number;
}

interface User {
  id: number;
  email: string;
  nama: string;
  address: string;
  phone: number;
  pictures: string;
}

const SkeletonLoader = () => (
  <Card className='w-full'>
    <CardContent className="w-full flex p-4 bg-gray-50 rounded-lg items-center border-[1px] border-[#54844F]">
      <Skeleton className="w-[75px] h-[75px] rounded-md mr-4" />
      <div className="flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="text-right">
        <Skeleton className="h-6 w-20 mb-2" />
        <Skeleton className="h-10 w-24" />
      </div>
    </CardContent>
  </Card>
);

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState<Transaction[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const fetchData = async (start?: string, end?: string) => {
    setIsLoading(true);
    setError(null);
    const userinfo = localStorage.getItem("user-info");
    let email = userinfo ? userinfo.replace(/["]/g, "") : "";
    if (!email) {
      setError("Email tidak ditemukan di localStorage");
      setIsLoading(false);
      return;
    }

    try {
      const userResponse = await axios.get(
        `http://192.168.200.100:8000/api/user/${email}`
      );
      setUserData(userResponse.data);
      
      if (userResponse.data && userResponse.data.id) {
        let url = `http://192.168.200.100:8000/api/transaksi/${userResponse.data.id}/with-details`;
        if (start) url += `?start_date=${start}`;
        if (end) url += `${start ? '&' : '?'}end_date=${end}`;
        
        const transactionResponse = await axios.get(url);
        setHistoryData(transactionResponse.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data", err);
      setError("Gagal mengambil data. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = () => {
    if (startDate && !endDate) {
      fetchData(startDate, startDate);
    } else if (!startDate && endDate) {
      fetchData(endDate, endDate);
    } else {
      fetchData(startDate, endDate);
    }
  };

  const isFilterDisabled = !startDate && !endDate;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className='flex flex-col items-center w-full mb-10'>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-1 w-24" />
        </div>
        <div className="space-y-4 w-full">
          {[...Array(3)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className='flex flex-col items-center w-full mb-10'>
        <h1>History</h1>
        <div className="underline" style={{ width: '100px', height: '4px', background: '#61AB5B', margin: '2px' }}></div>
      </div>
      <div className="mb-4 flex space-x-2">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <Button 
          variant={'outline'} 
          className='bg-[#61AB5B] rounded-3xl' 
          onClick={handleFilter}
          disabled={isFilterDisabled}
        >
          Filter
        </Button>
      </div>
      <div className="space-y-4 w-full ">
        {historyData.length > 0 ? (
          historyData.map((item) => (
            <Card key={item.faktur} className='w-full flex bg-slate-400' >
              <CardContent className="w-full flex p-4 bg-gray-50 hover:bg-gray-100 rounded-lg items-center border-[1px] border-[#54844F]">
                <div className='w-[75px] h-[75px] mr-2 mb-2'>
                <AspectRatio ratio={1/1} className='bg-muted'>
                <Image
                  src={`data:image/jpeg;base64,${item.main_item.image}`}
                  alt={item.main_item.menu_name}
                  fill
                  className="rounded-md mr-4"
                />
                </AspectRatio>
                </div>
                <div className="flex-grow">
                  <CardTitle className="text-lg font-semibold">
                    {item.main_item.menu_name}
                    {item.other_items_count > 0 && ` and ${item.other_items_count} other${item.other_items_count > 1 ? 's' : ''}`}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{item.tanggal}</p>
                  <div className='flex flex-row '>
                    <Check className='p-1 h-5 w-5 mr-1 flex-wrap bg-[#369A2E] text-white rounded-full '/>
                    <p>Order Completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rp {item.total.toLocaleString()}</p>
                  <Button variant="outline" className="mt-2 rounded-3xl bg-[#369A2E] border-[2px] border-[#369A2E] hover:bg-white text-gray-50 hover:text-[#369A2E]">
                    Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No transaction history available.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;