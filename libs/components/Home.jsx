"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 m-10 md:p-12 w-full max-w-7xl relative overflow-hidden max-h-screen">
      <header className="flex items-center justify-between pb-8">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-indigo-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2A10 10 0 1012 22A10 10 0 1012 2zm0 18a8 8 0 118-8A8 8 0 0112 20zM12 4a8 8 0 018 8a8 8 0 01-8 8a8 8 0 01-8-8A8 8 0 0112 4zm0 2a6 6 0 100 12a6 6 0 100-12zm0 2a4 4 0 110 8a4 4 0 110-8zm0 2a2 2 0 100 4a2 2 0 100-4z" />
          </svg>
          <span className="text-2xl font-bold text-gray-900">PersonaAI</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link
            href="/persona"
            className="hover:text-indigo-600 transition-colors"
          >
            Personas
          </Link>
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 text-gray-600 font-medium pb-4">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link
            href="/persona"
            className="hover:text-indigo-600 transition-colors"
          >
            Personas
          </Link>
        </div>
      )}

      <main className="text-center md:text-left mt-8 md:mt-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-black">
          Chat with <br className="md:hidden" />
          <span className="text-gradient">AI Personas.</span> Instantly.
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
          Unlock the Power of Tailored Conversations. Your Perfect AI Companion
          Awaits, Ready to Assist, Guide, and Create.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => router.push("/persona")}
            className="bg-gray-900 text-white py-3 px-8 rounded-full font-medium hover:bg-indigo-600 transition-colors transform hover:scale-105 shadow-md cursor-pointer"
          >
            Start Chatting
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
