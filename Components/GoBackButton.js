"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton({ className }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`
        px-5 py-2
        text-blue-600
        underline
        rounded-md
        shadow-md
        my-3
        transition
        duration-300
        ease-in-out
        cursor-pointer
        hover:text-blue-800
        hover:shadow-xl
        hover:scale-105
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        ${className}
        `}

    >
      &lt; Go Back
    </button >
  );
}
