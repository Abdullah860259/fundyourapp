"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import GoBackButton from '@/Components/GoBackButton'
import Link from 'next/link'
import Loading from '@/Components/Loading'  // import loading
import toast from 'react-hot-toast'

const Page = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [projects, setProjects] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // loading state

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);  // start loading
            try {
                const authorRes = await fetch(`/api/user/get/${id}`, { method: "GET" });
                const authorData = await authorRes.json();
                setAuthor(authorData);
                const projectsRes = await fetch(`/api/project/get?id=${id}`);
                const projectsData = await projectsRes.json();
                setProjects(projectsData);
            } catch (error) {
                console.error(error);
                toast.error(error)
            } finally {
                setIsLoading(false);  // stop loading
            }
        }
        fetchData();
    }, [id]);

    if (isLoading) {
        return <Loading />;  // show loading while fetching
    }

    if (!author) {
        return <div className='text-black'>Author not found</div>;
    }

    return (
        <div className='w-full h-auto bg-white py-5 relative'>
            <GoBackButton className="m-5" />
            <div className="min-h-screen shadow-lg hover:shadow-2xl transition-shadow duration-300 relative bg-white text-gray-900 p-6 max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                    <Image
                        src={author.ImageLink || "/default-profile.png"}
                        alt={author.name || "Author"}
                        width={120}
                        height={120}
                        className="rounded-full border border-gray-300 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-bold">{author.name}</h1>
                        <p className="text-gray-600">{author.email}</p>
                        {author.createdAt && (<p className="text-gray-500 text-sm">Joined: {new Date(author.createdAt).toLocaleDateString()}</p>)}

                    </div>
                </div>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">Projects</h2>
                    {projects && projects.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <Link href={`/project/description/${project._id}`} key={project._id}>
                                    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                                        <Image
                                            src={project.image || "/default-project.png"}
                                            alt={project.title}
                                            width={400}
                                            height={200}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                            <p className="text-gray-700 text-sm">{project.description?.slice(0, 100)}...</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No projects found.</p>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Page;
