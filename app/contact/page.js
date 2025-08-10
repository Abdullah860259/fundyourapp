"use client";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import emailjs from 'emailjs-com';
import { useRef } from "react";

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    console.log(formData);
    if (Object.values(formData).some(value => value === "")) {
      toast.error("All the Fields must be Filled")
      return
    }
    e.preventDefault();
    emailjs.sendForm("service_sooaq33", "template_g8szup3",form.current, "PDGtErekBXv0HSLiw")
      .then((result) => {
        toast.success("Email Sent Successfully")
        setFormData({ name: "", email: "", message: "" })
      }, (error) => {
    
        toast.error("Something Went Wrong" )
      });
    setSubmitted(true);
  };

  return (
    <>
      <Toaster
        position="top-center"
        richColors
        closeButton={true}
        duration={4000}  // milliseconds, default is 5000
        toastOptions={{
          success: {
            style: { background: '#22c55e', color: '#fff' },
            icon: '✅',
          },
          error: {
            style: { background: '#ef4444', color: '#fff' },
            icon: '❌',
          },
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-16 flex flex-col items-center text-gray-900">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-8 animate-fadeInUp">
          Contact Me
        </h1>

        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12">
          {/* Portfolio Info */}
          <div className="bg-white p-10 rounded-3xl shadow-xl animate-fadeInUp delay-200 max-w-md mx-auto">
            <h2 className="text-4xl font-extrabold mb-6 text-purple-700 border-b-4 border-purple-300 pb-2">
              My Portfolio
            </h2>
            <p className="mb-8 text-gray-700 leading-relaxed">
              I am <span className="font-semibold text-purple-600">Abdullah Anwar</span>, a passionate web developer and software engineer aspirant. Explore my work and connect with me:
            </p>
            <ul className="space-y-5 text-purple-700">
              <li>
                <a
                  href="https://hafizabdullahanwar.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg px-4 py-3 bg-purple-50 hover:bg-purple-100 transition shadow-sm hover:shadow-md"
                >
                  <strong>Portfolio Website</strong>
                </a>
              </li>
              <li>
                <a
                  href="mailto:abdullah860259@gmail.com"
                  className="block rounded-lg px-4 py-3 bg-purple-50 hover:bg-purple-100 transition shadow-sm hover:shadow-md"
                >
                  <strong>Email:</strong> abdullah860259@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Abdullah860259"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg px-4 py-3 bg-purple-50 hover:bg-purple-100 transition shadow-sm hover:shadow-md"
                >
                  <strong>GitHub:</strong> github.com/Abdullah860259
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/abdullah-anwar-a4013633a/"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg px-4 py-3 bg-purple-50 hover:bg-purple-100 transition shadow-sm hover:shadow-md"
                >
                  <strong>LinkedIn</strong>
                </a>
              </li>
            </ul>
          </div>


          {/* Contact Form */}
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg flex flex-col animate-fadeInUp delay-400"
          >
            <h2 className="text-3xl font-semibold mb-6 text-purple-600">Send a Message</h2>

            <label className="mb-2 font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your name"
            />

            <label className="mb-2 font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your email"
            />

            <label className="mb-2 font-medium text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              className="mb-6 px-4 py-2 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Write your message here..."
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-purple-600 text-white font-semibold py-3 rounded hover:bg-purple-700 transition-colors"
            >
              Send
            </button>

            {submitted && (
              <p className="mt-4 text-green-600 font-semibold">
                Thanks for reaching out! I will get back to you soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
