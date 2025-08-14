"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SupportersList(loadingstart,loadingstop) {
  const [supporters, setsupporters] = useState(null);
  const params = useParams();
  useEffect(() => {
    const getsupporters = async () => {
      try {
        loadingstart
        console.log("hello");
        let res = await fetch(`/api/supporter?id=${params.id}`)
        res = await res.json();
        console.log(res);
        setsupporters(res)
      } catch (error) {
        console.error(error);
        toast.error(error)
      }finally{
        loadingstop;
      }
    }
    getsupporters();
  }, [params.id,loadingstart,loadingstop])  
  if (!supporters || supporters.length === 0) {
    return <p className="py-4" >No supporters yet. Be the first one to support!</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Previous Supporters</h2>
      <div className="space-y-3">
        {supporters.map((supporter, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={supporter.user.image|| "/default-profile.png"}
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
            <p className="font-semibold">${supporter.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
