"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from "@/Components/Loading";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import GoBackButton from "@/Components/GoBackButton";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [projects, setprojects] = useState([]);
  const [isLoading, setisLoading] = useState(false)

  const handleCreation = async () => {
    setisLoading(true)
    let res = await fetch(`/api/connectedstripe?id=${session.user.id}`)
    res = await res.json();
    if (res) {
      setisLoading(false);
      router.push("/project/create")
    } else {
      setisLoading(false);
      toast.error("Firstly Connect Your Stripe Account in profile")
    }
  }

  useEffect(() => {
    if (status === "loading") {
      setisLoading(true);
    } else if (status === "authenticated") {
      const getProjects = async () => {
        setisLoading(true);
        try {
          const res = await fetch(`/api/project/get?id=${session.user.id}`);
          const data = await res.json();
          setprojects(data);
        } catch (err) {
          console.error("Failed to fetch projects:", err);
        } finally {
          setisLoading(false);
        }
      };
      getProjects();
    } else {
      // User not authenticated
      setisLoading(false);
    }
  }, [status, session]);



  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Please login to view your profile</h1>
      </div>
    );
  }
  const user = {
    name: session.user.name,
    image: session.user.image,
    email: session.user.email,
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
      {isLoading && (<Loading />)}
      {!isLoading && (
        <>
          <GoBackButton className={"absolute top-20 left-6"} />
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-100 py-12 px-4">
            <div className="flex flex-col items-center mb-10">
              <img
                src={user.image}
                alt="Profile"
                className="w-32 h-32 rounded-full shadow-lg border-4 border-white object-cover mb-4"
              />
              <h2 className="text-3xl font-bold text-gray-800 mb-1">{user.name}</h2>
              <span className="text-lg text-gray-500">{user.email}</span>
            </div>
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center items-center md:items-stretch">
              {projects.map((project, idx) => (
                <>
                  <div className="bg-white cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-black transition-all duration-300 rounded-2xl shadow-xl flex flex-col items-center p-6">
                    <img
                      src={project.image}
                      alt="Server Issue"
                      className="w-28 h-28 rounded-xl object-cover mb-4 border-2 border-indigo-100"
                    />
                    <div className="flex-1 text-black text-center">
                      <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                        {project.title}
                      </h3>
                      <div className={`badge ${project.tags === "active" ? "badge-primary" : "badge-secondary"}`}>
                        {project.tags}
                      </div>

                      <p>
                        {project.createdAt
                          ? new Date(project.updatedAt.toLocaleString() || project.createdAt).toLocaleString()
                          : "No date"}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-2" >
                      <Link
                        href={`/project/${project._id}`}
                        className="w-full md:w-1/2 max-w-xs"
                      >
                        <button class="btn btn-outline btn-primary">Edit</button>
                      </Link>
                      <Link
                        href={`/project/description/${project._id}`}
                        className="w-full md:w-1/2 max-w-xs"
                      >
                        <button className="btn btn-active btn-info">Preview</button>
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <button onClick={handleCreation} className="btn btn-outline hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] btn-primary text-center mx-auto mt-10">
              Create New Project
            </button>

          </div>
        </>
      )}
    </>
  );
};

export default Page;
