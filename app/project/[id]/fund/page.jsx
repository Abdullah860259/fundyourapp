"use client"
import { useEffect, useState } from "react";
import CheckoutWrapper from "@/Components/CheckoutWrapper";
import { useSession } from "next-auth/react";
import { Toaster, toast } from 'sonner';
import Loading from "@/Components/Loading";
import { useParams } from "next/navigation";
import SupportersList from "@/Components/Supporters";
import GoBackButton from "@/Components/GoBackButton";

export default function PaymentOptions() {
    const params = useParams();
    const [showInvestors, setshowInvestors] = useState(false)
    const { data: session } = useSession();
    const [method, setMethod] = useState("stripe");
    const [amount, setamount] = useState();
    const [IsLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getShowInvestors = async() =>{
            let res = await fetch(`/api/updateinvestors/givebycreatorid?id=${params.id}`)
            res = await res.json();
            setshowInvestors(res)
        }
        getShowInvestors()
    }, [])


    function useDisableScroll(isLoading) {
        useEffect(() => {
            if (isLoading) {
                // Disable scroll
                document.body.style.overflow = "hidden";
            } else {
                // Enable scroll
                document.body.style.overflow = "auto";
            }
            // Cleanup when component unmounts
            return () => {
                document.body.style.overflow = "auto";
            };
        }, [isLoading]);
    }
    useDisableScroll(IsLoading);
    return (
        <>
            <GoBackButton className={"absolute top-20 left-3"} />
            <div className="w-full bg-gray-50 py-4" >
                {IsLoading && (<Loading />)}
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
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-black w-full ">
                    <div className="flex justify-between mb-6">
                        {[
                            { id: "stripe", label: "Stripe" },
                            { id: "card", label: "Card" },
                            { id: "apple", label: "Apple Pay" },
                            { id: "easypaisa", label: "Easypaisa" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setMethod(item.id)}
                                className={`flex-1 py-2 mx-1 border rounded-md text-center font-semibold
                            ${method === item.id
                                        ? "bg-blue-100 border-blue-500 text-blue-700"
                                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                    }`}

                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Input forms */}
                    {method === "card" && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Card Number"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Expiry Date (MM/YY)"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Cardholder Name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button
                                onClick={() => toast.error("Currently only Stripe is available")}
                                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Pay Now
                            </button>
                        </div>
                    )}

                    {method === "apple" && (
                        <div>
                            <p className="mb-2">You will be redirected to Apple Pay to complete payment.</p>
                            <button className="w-full py-2 bg-black text-white rounded hover:bg-gray-800" onClick={() => toast.error("Currently only Stripe is available")} >
                                Pay with Apple Pay
                            </button>
                        </div>
                    )}

                    {method === "easypaisa" && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Easypaisa Mobile Number"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => toast.error("Currently only Stripe is available")}>
                                Pay with Easypaisa
                            </button>
                        </div>
                    )}


                    {method === "stripe" && session?.user?.id && (
                        <>
                            <input
                                type="number"
                                step={1}
                                placeholder="Amount in USD"
                                value={amount || ""}
                                onChange={(e) => {
                                    setamount(e.target.value);
                                }}
                                className="w-full p-2 border border-gray-300 mb-2 rounded"
                            />
                            <CheckoutWrapper
                                creatorId={session?.user?.id}
                                loadingstart={() => {
                                    console.log("loading started ✅✅✅")
                                    setIsLoading(true)
                                }}
                                loadingstop={() => {
                                    setIsLoading(false)
                                }}
                                className="cursor-pointer" amount={amount * 100} session={session} projectId={params.id} />
                        </>
                    )}
                    {showInvestors ? (<SupportersList loadingstop={() => setIsLoading(false)} loadingstart={() => setIsLoading(true)} />) : (<p className="my-1" >Creator have restricted to show Investors</p>)}

                </div>
            </div>
        </>
    );
}


