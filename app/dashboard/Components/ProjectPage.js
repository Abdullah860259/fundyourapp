"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/Components/Loading";

export default function ProjectsPage() {
  const [projects, setprojects] = useState([]);
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    async function getprojects() {
      let res = await fetch("/api/getallprojects", { method: "GET" })
      res = await res.json();
      console.log(res);
      setprojects(res);
      setisLoading(false)
    }
    getprojects();
  }, [])

  return (
    <>
    {isLoading && (<Loading/>)}
      <div className="min-h-screen bg-white text-black px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">All Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-white cursor-pointer rounded-xl p-6 shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
            >
              <Link href={`/user/${proj.userid._id}`} prefetch={true} >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={proj.userid?.ImageLink || "https://bit.ly/4oqrQVA"}
                    alt={proj.userid?.name || "Author"}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-sm font-semibold">{proj.userid?.name}</p>
                    <p className="text-xs text-gray-500">Author</p>
                  </div>
                </div>
              </Link>
              <Link href={`/project/description/${proj._id}`} prefetch={true} >
                <Image src={proj.image} alt={proj.title || "Project Image"}
                  width={400} height={300} className="w-full rounded-lg object-fill object-center " />
                <h2 className="text-xl font-bold mb-2">{proj.title}</h2>
                <p className="text-gray-700 line-clamp-3">{proj.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div >
    </>
  );
}
