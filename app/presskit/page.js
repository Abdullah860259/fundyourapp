"use client";
import React from "react";

export default function PressKit() {
  return (
    <div className="min-h-screen bg-gradient-to-tr  from-purple-700 via-purple-500 to-purple-300 text-black px-6 py-12 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl bg-white bg-opacity-20 rounded-3xl p-8 shadow-lg backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
          Abdullah Anwar - Press Kit
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 border-b-4 border-white pb-2 w-fit mx-auto">
            About Abdullah
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto text-center">
            Abdullah Anwar is a dedicated Pre-Engineering student and aspiring software engineer from Pakistan.
            A Hafiz Quran, he balances his passion for technology, learning web development, and his deep interests in geopolitics and history.
            Focused on ECAT preparation and personal growth, Abdullah strives to become the best version of himself.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 border-b-4 border-white pb-2 w-fit mx-auto">
            Key Facts
          </h2>
          <ul className="list-disc list-inside text-lg max-w-3xl mx-auto space-y-2">
            <li>Currently enrolled in first year FSC (2024-25, Federal Board, Pakistan)</li>
            <li>Passionate about software engineering and web technologies</li>
            <li>Committed to excellence and continuous learning</li>
            <li>Values family and faith deeply</li>
          </ul>
        </section>

        <section className="mb-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3 border-b-4 border-white pb-2 w-fit mx-auto">
            Contact
          </h2>
          <p className="text-lg space-y-2">
            <a
              href="mailto:abdullah@example.com"
              className="block text-black hover:underline"
            >
              Email: abdullah@example.com
            </a>
            <a
              href="tel:+920000000000"
              className="block text-black hover:underline"
            >
              Phone: +92-000-0000000
            </a>
            <a
              href="https://www.linkedin.com/in/abdullah-anwar-a4013633a/"
              target="_blank"
              rel="noreferrer"
              className="block text-black hover:underline"
            >
              LinkedIn: linkedin.com/in/abdullahanwar
            </a>
            <a
              href="https://abdullah-portfolio.com"
              target="_blank"
              rel="noreferrer"
              className="block text-black hover:underline"
            >
              Portfolio: abdullah-portfolio.com
            </a>
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-white pb-2 w-fit mx-auto">
            Social Media
          </h2>
          <div className="flex justify-center gap-8 text-lg font-semibold">
            <a
              href="https://www.linkedin.com/in/abdullah-anwar-a4013633a/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9a2ff3] transition"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/abdu_7817"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9a2ff3] transition"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/abdullah.anwar.742682"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9a2ff3] transition"
            >
              Facebook
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
