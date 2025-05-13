import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ClockIcon
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GPdI Shekinah Graha Harapan</h3>
            <p className="mb-4 text-blue-200">
              Melayani Tuhan dengan segenap hati, menjangkau jiwa-jiwa bagi
              Kristus.
            </p>

            <div>
              <h3 className="text-lg font-bold mb-4">Jam Ibadah Reguler</h3>
              <ul className="space-y-1">
                <li className="flex items-center  ">
                  <ClockIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-300" />
                  <div>
                    <span className="block text-sm font-medium">
                      Ibadah Minggu I
                    </span>
                    <span className="text-blue-200 text-sm">06:00 WIB</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-300" />
                  <div>
                    <span className="block text-sm font-medium">
                      Ibadah Minggu II
                    </span>
                    <span className="text-blue-200 text-sm">10:00 WIB</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-300" />
                  <div>
                    <span className="block text-sm font-medium">
                      Ibadah Minggu III
                    </span>
                    <span className="text-blue-200 text-sm">17:00 WIB</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* </div> */}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              {/* <li className="flex items-center gap-x-3">
                <FontAwesomeIcon
                  icon={faMapLocationDot}
                  width={20}
                  height={20}
                />
                <span>
                  Graha Harapan Blok E 13 No 2, Mustika Jaya, Kota Bekasi, Jawa
                  Barat
                </span>
              </li> */}
              <li className="flex items-start">

               <a
                href="tel:+6281314165742"
                className=" flex justify-center items-center gap-x-3 cursor-pointer rounded-full transition duration-300"
              >
                <FontAwesomeIcon icon={faPhone} width={20} height={20} />

                <h1 className="hover:">(+62) 813-1614-5742</h1>
              </a>
              </li>
              <li className="flex items-start">
               <a
                href="https://web.facebook.com/GPdI.Shekinah.GrahaHarapan"
                className=" flex justify-center items-center gap-x-3 cursor-pointer rounded-full transition duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} width={20} height={20} />

                <h1 className="hover:underline hover:underline-offset-4">GPdI Shekinah Graha Harapan</h1>
              </a>
              </li>
              <li className="flex items-start">
                 <a
                href="https://www.instagram.com/gpdishekinahmustikajaya/"
                className=" flex justify-center items-center gap-x-3 cursor-pointer rounded-full transition duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} width={20} height={20} />

                <h1 className="hover:underline hover:underline-offset-4">@gpdishekinahmustikajaya</h1>
              </a>
              </li>
              <li className="flex items-start">
             <a
                href="https://wa.me/6281316145742"
                className=" flex justify-center items-center gap-x-3 cursor-pointer rounded-full transition duration-300"
              >
                <FontAwesomeIcon icon={faWhatsapp} width={20} height={20} />

                <h1 className="hover:underline hover:underline-offset-4">Hubungi Kami Di Whatsapp</h1>
              </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
        
            </div>
          </div>
          <div >
<h1 className=" text-center text-xl sm:text-3xl">Address</h1>
          <iframe
            src="https://storage.googleapis.com/maps-solutions-sgccwx2lfq/locator-plus/jflh/locator-plus.html"
            width="100%"
            height="100%"
            loading="lazy"
          ></iframe>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-6 text-center text-blue-300 text-sm">
          <p>&copy; 2024 GPdI Shekinah GRAHA HARAPAN. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
