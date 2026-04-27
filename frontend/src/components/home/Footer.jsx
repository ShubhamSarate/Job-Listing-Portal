import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo / Name */}
          <h1 className="text-xl font-semibold text-gray-800">
            JobPortal
          </h1>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-black transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-black transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-black transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer