"use client"
import React from 'react';
import Image from 'next/image';

const FramedImage = () => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-green-700 transform rotate-3 z-0"></div>
      <div className="absolute inset-0 bg-gray-200 transform -rotate-3 z-10"></div>
      <div className="relative z-20 p-4">
        <Image
          src="/logo2.png"
          alt="Special Menu"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

const RestaurantPromo = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Special Discount</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
            <FramedImage />
          </div>
          <div className="w-full md:w-1/2 pl-4">
            <h3 className="text-xl font-semibold mb-2">Get 30% Special Promo</h3>
            <p className="mb-4">Enjoy our discount up to 30% for orders via Gofood Menu</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Customer Review section remains unchanged */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'User1', review: 'GoFood Menu selalu cepat dan masakannya enak!' },
            { name: 'User2', review: 'Menu dan harganya worth it, pengirimannya juga cepat' },
            { name: 'User3', review: 'GoFood Menu memudahkan kita saat order makanan di resto ini' },
          ].map((user, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
                <span className="font-semibold">{user.name}</span>
              </div>
              <p>{user.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPromo;