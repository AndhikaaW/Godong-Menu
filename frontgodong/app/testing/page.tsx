"use client"
import React, { useState } from 'react';
import forge from 'node-forge';

type RSAKeyPair = {
  publicKey: forge.pki.rsa.PublicKey;
  privateKey: forge.pki.rsa.PrivateKey;
};

const RSACryptography: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [keyPair, setKeyPair] = useState<RSAKeyPair | null>(null);
  const [keyWord, setKeyWord] = useState('');

  const generateKeyPair = () => {
    if (!keyWord) {
      alert('Harap masukkan kata kunci terlebih dahulu!');
      return;
    }

    // Gunakan kata kunci sebagai seed untuk PRNG
    const seed = forge.md.sha256.create().update(keyWord).digest().getBytes();
    const prng = forge.random.createInstance();
    prng.seedFileSync = () => seed;

    const newKeyPair = forge.pki.rsa.generateKeyPair({
      bits: 2048,
      e: 0x10001,
      prng: prng,
    }) as RSAKeyPair;

    setKeyPair(newKeyPair);
    alert('Pasangan kunci berhasil dibuat!');
  };

  const encryptText = () => {
    if (!keyPair) {
      alert('Harap generate key pair terlebih dahulu!');
      return;
    }

    const encrypted = keyPair.publicKey.encrypt(plaintext, 'RSA-OAEP');
    const base64 = forge.util.encode64(encrypted);
    setEncryptedText(base64);
  };

  const decryptText = () => {
    if (!keyPair) {
      alert('Harap generate key pair terlebih dahulu!');
      return;
    }

    try {
      const decoded = forge.util.decode64(encryptedText);
      const decrypted = keyPair.privateKey.decrypt(decoded, 'RSA-OAEP');
      setDecryptedText(decrypted);
    } catch (error) {
      alert('Gagal mendekripsi. Pastikan teks terenkripsi valid.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">RSA Encryption dan Decryption dengan Kata Kunci</h1>
      <div className="mb-4">
        <input
          type="text"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder="Masukkan kata kunci untuk generate key pair"
          className="w-full p-2 border rounded"
        />
      </div>
      <button 
        onClick={generateKeyPair} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate Key Pair
      </button>
      <div className="mb-4">
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          placeholder="Masukkan teks yang akan dienkripsi"
          className="w-full p-2 border rounded"
        />
      </div>
      <button 
        onClick={encryptText} 
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 mr-2"
      >
        Encrypt
      </button>
      {encryptedText && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Teks Terenkripsi:</h2>
          <p className="bg-gray-100 p-2 rounded mt-2 break-all">{encryptedText}</p>
        </div>
      )}
      <div className="mt-4">
        <input
          type="text"
          value={encryptedText}
          onChange={(e) => setEncryptedText(e.target.value)}
          placeholder="Masukkan teks terenkripsi untuk didekripsi"
          className="w-full p-2 border rounded"
        />
      </div>
      <button 
        onClick={decryptText} 
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
      >
        Decrypt
      </button>
      {decryptedText && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Teks Terdekripsi:</h2>
          <p className="bg-gray-100 p-2 rounded mt-2">{decryptedText}</p>
        </div>
      )}
    </div>
  );
};

export default RSACryptography;