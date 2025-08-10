"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";

const AuthLogins = ({ loadingStart, loadingStop }) => {
  const { status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* GitHub */}
      <button
        onClick={() => {
          signIn("github", { callbackUrl: "/?isLogged=true" });
          loadingStart()
        }}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-900 text-white shadow-md transition"
        aria-label="Login with GitHub"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
        </svg>
        Login with GitHub
      </button>

      {/* Google */}
      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/?isLogged=true" });
          loadingStart();
        }}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-purple-800 border border-purple-600 hover:bg-purple-50 shadow-md transition"
        aria-label="Login with Google"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path fill="#4285F4" d="M113 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
          <path fill="#34A853" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
          <path fill="#FBBC05" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
          <path fill="#EA4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
        </svg>
        Login with Google
      </button>

      {/* Facebook */}
      <button
        onClick={() => {
          signIn("facebook", { callbackUrl: "/?isLogged=true" });
          loadingStart();
        }}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white shadow-md transition"
        aria-label="Login with Facebook"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z" />
        </svg>
        Login with Facebook
      </button>
    </div>
  );
};

export default AuthLogins;
