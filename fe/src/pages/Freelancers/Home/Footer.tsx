import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black border-t border-purple-500/20">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">TalentSphere</h3>
            <p className="text-gray-300 mb-6">Connect with top talent and find your perfect freelancing opportunity. Our platform makes it easy to collaborate on projects globally.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-gray-100">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Projects', 'How It Works', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <ArrowRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-gray-100">Categories</h4>
            <ul className="space-y-3">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Content Writing', 'Digital Marketing', 'Video Editing'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <ArrowRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-gray-100">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-purple-400 mr-4 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Freelance Street, Digital City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-purple-400 mr-4 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-purple-400 mr-4 flex-shrink-0" />
                <span className="text-gray-400">info@freelancehub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      

      {/* Copyright */}
      <div className="py-8 text-center text-gray-500">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {currentYear} TalentSphere. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-purple-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-purple-400 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-purple-400 text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;