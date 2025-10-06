import React from "react";
import { Facebook, Twitter, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">SmartStudyAI</h3>
          <p className="text-gray-400">
            Your AI-powered study companion for smarter learning and faster revisions.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><Github size={20} /></a>
            <a href="mailto:support@smartstudyai.com" className="hover:text-white">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} SmartStudyAI. All rights reserved.
      </div>
    </footer>
  );
}
