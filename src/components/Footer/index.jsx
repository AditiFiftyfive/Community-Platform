import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-20 min-h-[400px] relative text-white w-full">
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link to="/" className="text-4xl font-bold">ThriveCircle</Link>
            <div className="flex flex-wrap justify-center md:justify-start gap-8 text-base font-semibold">
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Contact Us</a>
              <a href="#">List your events</a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSrL93zC_Z--ALdeqz41ZaUNxk26CN5kBs9484cYh5oKL2WGL1vUaRBujB3d8Rz-x4dAhUwhkXiRMC_EpSmMAv3ybvHd2f8QKt5d4zwYwuYQQ"
              alt="QR Code"
              className="w-28 h-28"
            />
            <p className="mt-2 text-sm text-center">Scan to download the app</p>
          </div>
        </div>

        <hr className="my-8 border-gray-600 w-full" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <p className="text-center md:text-left max-w-2xl">
            By accessing this page, you confirm that you have read, understood, and agreed to our Terms of Service, Cookie Policy, Privacy Policy, and Content Guidelines. All rights reserved.
          </p>

          <div className="flex gap-4 text-white text-xl cursor-pointer">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
            <FaYoutube />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
