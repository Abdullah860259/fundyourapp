"use client";
import Link from "next/link";
import Loading from "@/Components/Loading";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function PaymentCancel() {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false)
  const handleClick = () => {
    setisLoading(true);
    router.push("/?isLogged=true")
  }
  return (
    <>
      {isLoading && (<Loading />)}
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600">
          ❌ Payment Cancelled
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-md">
          Your payment was not completed. Please try again.
        </p>
        <div
          onClick={handleClick}
          className="mt-6 px-5 sm:px-6 cursor-pointer py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
        >
          Go to Home
        </div>
      </div>
    </>
  );
}
