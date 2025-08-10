"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import AuthLogins from "@/Components/AuthLogins";
import { Toaster, toast } from "sonner";
import Loading from "@/Components/Loading";
import { useSession } from "next-auth/react";

const Login = () => {
  const [isLoading, setisLoading] = useState(false)
  const { status } = useSession();
  const handleClick = (e) => {
    e.preventDefault();
    toast.error("This service is Currenctly Unavailable")
  }

  useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated") {
      setisLoading(false)
    }
  }, [status])

  useEffect(() => {
    // Scroll to top on loading start
    if (isLoading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading/>
  }

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
      <div className="min-h-[100dvh] bg-gradient-to-br from-purple-700 via-purple-500 to-purple-300 flex items-center justify-center px-6 sm:px-20">
        <div className="hero-content flex flex-col sm:flex-row items-center max-w-4xl gap-16 text-white">
          {/* Left text */}
          <div className="text-center sm:text-left max-w-lg">
            <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">
              Login now!
            </h1>
            <p className="text-lg drop-shadow-md">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi.
            </p>
          </div>

          {/* Card form */}
          <div className="bg-white bg-opacity-90 rounded-3xl shadow-xl p-8 w-full max-w-sm text-gray-900">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                signIn(undefined, {
                  callbackUrl: "/?isLogged=true",
                  redirect: true,
                });
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="label font-semibold text-purple-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  onChange={handleClick}
                  type="email"
                  autoComplete="email"
                  required
                  className="input input-bordered w-full rounded-lg bg-white border-purple-500 focus:border-purple-700 focus:ring focus:ring-purple-300"
                  placeholder="Email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="label font-semibold text-purple-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleClick}
                  autoComplete="current-password"
                  required
                  className="input input-bordered w-full rounded-lg bg-white border-purple-500 focus:border-purple-700 focus:ring focus:ring-purple-300"
                  placeholder="Password"
                />
              </div>

              <div className="text-right">
                <a
                  href=""
                  className="link link-hover text-purple-700 hover:text-purple-900"
                  onClick={handleClick} // placeholder, replace with real link
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                onClick={handleClick}
                className="btn bg-purple-600 hover:bg-purple-700 text-white w-full rounded-lg font-semibold transition-shadow shadow-md hover:shadow-lg"
              >
                Login
              </button>

              <div className="divider text-purple-700">OR</div>

              <AuthLogins loadingStart={() => { setisLoading(true) }} loadingStop={() => { setisLoading(false) }} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
