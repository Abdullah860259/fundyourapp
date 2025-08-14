"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function GoBackButton({ className, backLink }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        backLink ? router.push(backLink) : router.back();
      }}
      className={`
        px-6 py-2.5
        mb-3
        bg-gradient-to-r from-blue-400 to-blue-600
        text-white
        rounded-full
        shadow-md
        font-medium
        transition-all duration-300
        hover:from-blue-600 hover:to-blue-700
        hover:shadow-lg
        active:scale-95
        focus:outline-none
        focus:ring-2 focus:ring-blue-300
        cursor-pointer
        ${className}
      `}
    >
      <div className="flex justify-evenly items-center gap-3" >
        <ArrowLeft size={20} />
        Go Back
      </div>
    </button >
  );
}
