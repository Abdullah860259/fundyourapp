"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";

export default function SupportersList() {
  const [isLoading, setisLoading] = useState(true)
  const [supporters, setsupporters] = useState(null);
  const params = useParams();
  useEffect(() => {
    setisLoading(true)
    const getsupporters = async () => {
      try {
        let res = await fetch(`/api/supporter?id=${params.id}`)
        res = await res.json();
        const arrangedData = res.sort((a, b) => b.amount - a.amount);
        setsupporters(arrangedData)
      } catch (error) {
        console.error(error);
        toast.error(error)
      } finally {
        setisLoading(false)
      }
    }
    getsupporters();
  }, [params.id])

  if (isLoading) {
    return <Loading/>
  }

  if (!supporters || supporters.length === 0) {
    return <p className="py-4" >No supporters yet. Be the first one to support!</p>;
  }

  return (
    <>
      {isLoading && (<Loading className={"mt-6"} />)}
      <div className="max-w-3xl mx-auto mt-8 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Previous Supporters</h2>
        <div className="space-y-3">
          {supporters.map((supporter, index) => {
            const paymentTime = new Date(supporter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={supporter.user.image || "/default-profile.png"}
                    alt={supporter.user.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{supporter.user.name}</p>
                    <p className="text-sm text-gray-500">{supporter.user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${supporter.amount}</p>
                  <p className="text-xs text-gray-400">{paymentTime}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
