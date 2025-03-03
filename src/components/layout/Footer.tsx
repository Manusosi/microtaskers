
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png" alt="Microtaskers Logo" className="h-10" />
            </Link>
            <p className="text-gray-600 text-sm">
              Microtaskers connects people with small online tasks that help them earn money from anywhere in the world.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-600 hover:text-purple-700" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-600 hover:text-purple-700" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-600 hover:text-purple-700" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-600 hover:text-purple-700" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-600 hover:text-purple-700">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-purple-700">Contact Us</Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-purple-700">Help Center</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-purple-700">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-purple-700">Find Jobs</Link>
              </li>
              <li>
                <Link to="/cashback" className="text-gray-600 hover:text-purple-700">Cashback Offers</Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-600 hover:text-purple-700">Play Games</Link>
              </li>
              <li>
                <Link to="/shops" className="text-gray-600 hover:text-purple-700">Browse Shops</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-purple-700" />
                <span className="text-gray-600">support@microtaskers.work</span>
              </li>
              <li className="text-gray-600">
                9607 Lavender Mis Lane, Katy TX, 77494
              </li>
              <li className="text-gray-600">
                Mon-Fri: 9:00 AM - 5:00 PM (CST)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Microtaskers. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-gray-600 hover:text-purple-700 text-sm">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-600 hover:text-purple-700 text-sm">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-gray-600 hover:text-purple-700 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            Made with <Heart className="inline h-4 w-4 text-red-500" /> by Microtaskers Team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
