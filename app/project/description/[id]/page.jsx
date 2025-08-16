"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';
import GoBackButton from '@/Components/GoBackButton';
import Link from 'next/link';
import Loading from '@/Components/Loading'; // import loading

const Page = () => {
    const params = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // loading state
    const [totalAmount, settotalAmount] = useState(null)
    useEffect(() => {
        async function getProject() {
            setIsLoading(true); // start loading
            try {
                let projectRes = await fetch(`/api/project/get/${params.id}`, { method: "GET" });
                const res = await projectRes.json();
                if (res.investors.length >= 1) {
                    const totalAmountt = res.investors.reduce((sum, investor) => sum + investor.amount, 0);
                    console.log(totalAmountt)
                    settotalAmount(totalAmountt)
                }
                setProject(res);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); // stop loading
            }
        }
        getProject();
    }, [params.id]);

    if (isLoading) {
        return <Loading />; // show loading while fetching
    }

    if (!project) {
        return <div className='text-black'>Something went wrong</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <GoBackButton />
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                <Image
                    src={project.image || "https://bit.ly/4oqrQVA"}
                    alt={project.title || "project image"}
                    width={800}
                    height={600}
                    className="w-full h-72 object-cover"
                />

                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <Image
                            src={project.userid.ImageLink || "https://bit.ly/4oqrQVA"}
                            alt={project.userid.name || "Author"}
                            width={50}
                            height={50}
                            className="rounded-full object-cover border"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">{project.userid.name}</p>
                            <p className="text-sm text-gray-500">Author</p>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

                    <div className="bg-gray-100 p-4 rounded-lg flex gap-2 flex-col">
                        <p className="text-lg font-medium text-gray-800">
                            Funding Goal:{" "}
                            <span className="text-green-600 font-bold">${project.goal}</span>
                        </p>
                        
                        <p className="text-lg font-medium text-gray-800">
                            Total Funded:{" "}
                            <span className="text-green-600 font-bold">
                                {totalAmount !== 0 && totalAmount !== null ? `$${totalAmount}` : "No Investment"}
                            </span>
                        </p>

                    </div>
                    <Link href={`/project/${params.id}/fund`}>
                        <button className="mt-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Fund This Project
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;
