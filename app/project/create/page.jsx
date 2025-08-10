"use client"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Error from "@/Components/Error";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
const CreateProjectPage = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session?.user?.id) {
      setForm((prev) => ({ ...prev, userid: session.user.id }));
    }
  }, [session]);
  const [form, setForm] = useState({
    title: "",
    userid: "",
    description: "",
    goal: "",
    image: "",
    tags:"active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.message === "Project already exists") {
        setError("Project already exists");
      }
    } catch (error) {
      let e = error.message;
    } finally {
      setisLoading(false);
      router.push("/profile");
    }
  };

  return (
    <>
      {error && <Error error={error} setError={setError} />}
      <div className="min-h-screen w-full text-black flex flex-col justify-center items-center bg-gray-100 py-8 px-4">
        <div className="mb-8 w-full">
          <Link href="/profile" className=" inline-flex items-center text-blue-600 hover:underline">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Go Back
          </Link>
        </div>
        <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Create a New Project
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Description</label>
              <textarea
                name="description"
                required
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Describe your project"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">
                Funding Goal (PKR)
              </label>
              <input
                type="number"
                name="goal"
                required
                value={form.goal}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="e.g. 50000"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Image URL</label>
              <input
                type="url"
                name="image"
                required
                value={form.image}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="https://your-image-link.jpg"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProjectPage;