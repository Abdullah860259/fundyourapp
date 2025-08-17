"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import GoBackButton from "@/Components/GoBackButton";

const EditProjectPage = () => {
  const router = useRouter();
  const [project, setProject] = useState({
    name: "",
    description: "",
    image: "",
    state: "draft",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const parms = useParams();
  const DeleteProject = async () => {
    try {
      const response = await fetch(`/api/project/${parms.id}`, { method: "DELETE", });
      if (response.ok) {
        router.push("/profile");
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let proj = await fetch(`/api/project/${parms.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    }
    )
    setIsLoading(false);
    router.push("/profile");
  }

  useEffect(() => {
    const fetchProject = async () => {
      let proj = await fetch(`/api/project/${parms.id}`)
      proj = await proj.json();
      setProject(proj);
    }
    fetchProject()
  }, [])


  return (
    <div className="min-h-screen text-black bg-gray-100 py-8 px-4">
      <GoBackButton/>
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Edit Project
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Project Name</label>
            <input
              type="text"
              name="title"
              value={project.title || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={project.description || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Project Image</label>
            <input type="url" name="image" onChange={handleChange} value={project.image} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            {project.image && (
              <img
                src={project.image || ""}
                alt="Project"
                className="mt-2 h-32 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">State</label>
            <select
              name="tags"
              value={project.tags || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button className="btn btn-error" onClick={DeleteProject} >Delete Project</button>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-semibold"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Updating..." : "Update Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;
