"use client";
import React from "react";
import GoBackButton from "@/Components/GoBackButton";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 text-gray-900 px-6 py-16 flex flex-col items-center">
      <GoBackButton className={"absolute top-20 left-5"} />
      <h1 className="text-5xl font-extrabold text-purple-700 mb-6 animate-fadeInUp">
        About Us
      </h1>

      <p className="max-w-3xl text-center text-lg mb-12 leading-relaxed animate-fadeInUp delay-200">
        #Fund Your Project is a community-driven platform dedicated to helping
        creators bring their ideas to life. We believe every project deserves a
        chance to shine, and with your support, dreams become reality.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full animate-fadeInUp delay-400">
        {[
          {
            title: "Our Mission",
            description:
              "Empower creators by connecting them with passionate supporters worldwide.",
            icon: (
              <svg
                className="w-12 h-12 text-purple-600 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            ),
          },
          {
            title: "Our Vision",
            description:
              "Create a vibrant ecosystem where creativity fuels innovation and progress.",
            icon: (
              <svg
                className="w-12 h-12 text-purple-600 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 19.778l-.707-.707" />
              </svg>
            ),
          },
          {
            title: "Our Values",
            description:
              "Integrity, innovation, collaboration, and passion drive everything we do.",
            icon: (
              <svg
                className="w-12 h-12 text-purple-600 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ),
          },
        ].map(({ title, description, icon }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 cursor-pointer text-center"
            tabIndex={0}
            aria-label={title}
          >
            {icon}
            <h3 className="text-xl font-semibold mb-2 text-purple-700">{title}</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
