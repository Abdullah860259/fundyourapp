"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isLogged = status === "authenticated";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-purple-50/70 shadow-lg border-b border-purple-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between py-3 px-5 md:px-8">
        {/* Left */}
        <Link href="/" className="text-purple-800 font-extrabold text-xl md:text-2xl hover:text-purple-600 transition">
          #FundYourProject
        </Link>

        {/* Hamburger for mobile */}
        <button
          onClick={toggleDropdown}
          className="md:hidden p-2 rounded-md text-purple-700 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" /> // close icon
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" /> // hamburger icon
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">



          {isLogged ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="btn btn-ghost btn-circle avatar ring-2 ring-purple-400 hover:ring-purple-600 transition"
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                <img
                  src={session.user.image || "https://placeimg.com/192/192/people"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>
              {isOpen && (
                <ul
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl ring-1 ring-purple-300 ring-opacity-80 backdrop-blur-sm animate-fadeIn"
                  role="menu"
                  aria-label="User menu"
                >
                  <li>
                    <Link
                      href="/?isLogged=true"
                      className="block px-4 py-2 text-purple-700 hover:bg-purple-100 rounded-lg transition"
                      onClick={closeDropdown}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-purple-700 hover:bg-purple-100 rounded-lg transition"
                      onClick={closeDropdown}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-purple-700 hover:bg-purple-100 rounded-lg transition"
                      onClick={closeDropdown}
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        closeDropdown();
                        signOut({ callbackUrl: "/?isLogged=false" });
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition text-sm"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-1 rounded-md transition">
                  Login
                </button>
              </Link>
              <Link href="/login">
                <button className="border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white px-4 py-1 rounded-md transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-50/90 backdrop-blur-sm border-t border-purple-200 shadow-inner px-5 py-4 animate-fadeIn">
          {isLogged ? (
            <>
              <Link href="/?isLogged=true" onClick={closeDropdown}>
                <button className="w-full bg-purple-700 text-white py-2 rounded-md mb-2 hover:bg-purple-800 transition">
                  Home
                </button>
              </Link>
              <Link href="/profile" onClick={closeDropdown}>
                <button className="w-full bg-purple-700 text-white py-2 rounded-md mb-2 hover:bg-purple-800 transition">
                  Profile
                </button>
              </Link>
              <Link href="/settings" onClick={closeDropdown}>
                <button className="w-full bg-purple-700 text-white py-2 rounded-md mb-2 hover:bg-purple-800 transition">
                  Settings
                </button>
              </Link>
              <button
                onClick={() => {
                  closeDropdown();
                  signOut({ callbackUrl: "/?isLogged=false" });
                }}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={closeDropdown}>
                <button className="w-full bg-purple-700 text-white py-2 rounded-md mb-2 hover:bg-purple-800 transition">
                  Login
                </button>
              </Link>
              <Link href="/login">
                <button className="w-full border border-purple-700 text-purple-700 py-2 rounded-md hover:bg-purple-700 hover:text-white transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )
      }

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </nav >
  );
};

export default Navbar;
