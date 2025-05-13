'use client'
import React, { useState } from 'react'
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  CalendarIcon,
  UserIcon,
} from 'lucide-react'
import Image from 'next/image'
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative shadow-lg">
      <div suppressHydrationWarning className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div  className="flex items-center space-x-2">
                <Image src={'/assets/logoGPdI.jpeg'} width={30} height={30} className='w-9 h-9' alt='GPdI' />
          {/* <BookOpenIcon className="h-8 w-8 text-yellow-400" /> */}
          <div>
            <h1 className="text-xl font-bold">GPdI Shekinah Graha Harapan</h1>
            <p className="text-xs md:text-sm text-yellow-200">
              Warta Jemaat
            </p>
          </div>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
        <nav className="hidden md:flex space-x-6">
          <a
            href="#"
            className="flex items-center space-x-1 hover:text-yellow-200 transition duration-300"
          >
            <HomeIcon className="h-4 w-4" />
            <span>Beranda</span>
          </a>
          <a
            href="#jadwal"
            className="flex items-center space-x-1 hover:text-yellow-200 transition duration-300"
          >
            <CalendarIcon className="h-4 w-4" />
            <span>Jadwal Ibadah</span>
          </a>
          <a
            href="#pelayanan"
            className="flex items-center space-x-1 hover:text-yellow-200 transition duration-300"
          >
            <UserIcon className="h-4 w-4" />
            <span>Pelayanan</span>
          </a>
        </nav>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-gradient-to-b from-blue-800 to-blue-900 px-4 py-2">
          <a
            href="#"
            className="flex items-center space-x-2 py-3 border-b border-blue-700 hover:bg-blue-700/50"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Beranda</span>
          </a>
          <a
            href="#jadwal"
            className="flex items-center space-x-2 py-3 border-b border-blue-700 hover:bg-blue-700/50"
          >
            <CalendarIcon className="h-5 w-5" />
            <span>Jadwal Ibadah</span>
          </a>
          <a
            href="#pelayanan"
            className="flex items-center space-x-2 py-3 hover:bg-blue-700/50"
          >
            <UserIcon className="h-5 w-5" />
            <span>Pelayanan</span>
          </a>
        </nav>
      )}
    </header>
  )
}
