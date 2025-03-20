import React from 'react'
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from 'lucide-react'
export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GPdI Shekinah</h3>
            <p className="mb-4 text-blue-200">
              Melayani Tuhan dengan segenap hati, menjangkau jiwa-jiwa bagi
              Kristus.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 p-2 rounded-full transition duration-300"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 p-2 rounded-full transition duration-300"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 p-2 rounded-full transition duration-300"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div> */}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-300" />
                <span>(+62) 8131-6145-742</span>
              </li>
              <li className="flex items-start">
                <MailIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-300" />
                <span>info@gpdihermon.org</span>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-300" />
                <span>
                  Graha Harapan Blok E 13/2 , Mustika Jaya
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Jam Ibadah Reguler</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <ClockIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-300" />
                <div>
                  <span className="block font-medium">Ibadah Minggu I</span>
                  <span className="text-blue-200">06:00 WIB</span>
                </div>
              </li>
              <li className="flex items-start">
                <ClockIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-300" />
                <div>
                  <span className="block font-medium">Ibadah Minggu II</span>
                  <span className="text-blue-200">10:00 WIB</span>
                </div>
              </li>
              <li className="flex items-start">
                <ClockIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-300" />
                <div>
                  <span className="block font-medium">Ibadah Minggu III</span>
                  <span className="text-blue-200">17:00 WIB</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-6 text-center text-blue-300 text-sm">
          <p>&copy; 2024 GPdI Shekinah (Mustika Jaya). Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
