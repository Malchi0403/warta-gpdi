import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Kebijakan Privasi</h2>
      <p className="mb-4">
        Aplikasi ini tidak mengumpulkan informasi pribadi dari pengguna.
        Kami hanya mengambil data video publik dari halaman Facebook yang dikelola oleh pemilik aplikasi.
      </p>
      <p className="mb-4">
        Data yang diambil tidak dibagikan kepada pihak ketiga dan hanya digunakan untuk menampilkan video pada website ini.
      </p>
      <p className="mb-4">
        Jika Anda memiliki pertanyaan tentang kebijakan ini, silakan hubungi kami di <a href="mailto:email@example.com" className="text-blue-600 underline">email@example.com</a>.
      </p>
    </main>
  );
}
