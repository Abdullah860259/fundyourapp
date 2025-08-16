"use client"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import GoBackButton from "@/Components/GoBackButton";
import ShowInvestorsToggle from "@/Components/ShowInvestors";

const Page = () => {
  const [IsStripeConnected, setIsStripeConnected] = useState();
  const { data: session, status } = useSession();
  const clientId = process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID;
  const redirectUri = encodeURIComponent(`${process.env.NEXTAUTH_URL}/api/stripe/oauth/callback`);
  const connectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write&redirect_uri=${redirectUri}`;

  const saveChanges = () =>{
    e.preventDefault();
  }

  useEffect(() => {
    if (status !== "authenticated") return;
    async function getStripeConnectionData() {
      let res = await fetch(`/api/connectedstripe?id=${session.user.id}`, { method: "GET" })
      res = await res.json();
      setIsStripeConnected(res)
    }
    getStripeConnectionData();
  }, [status, session])

  const disconnectStripe = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`/api/stripe/disconnect?id=${session.user.id}`, { method: "GET" })
      res = await res.json();
      toast.success("Your Stripe Account is Disconnected");
      setIsStripeConnected(false)
    } catch (error) {
      toast.error("Something Went Wrong, Try Again")
    }
  }

  return (
    <>
      <div className="min-h-screen text-black p-8 bg-gray-50">
        <GoBackButton backLink="/dashboard" />
        <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Settings</h2>
          <form className="space-y-4" >
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input w-full bg-white focus:border-primary border border-gray-300"
                value={session?.user?.name ?? ""}
                readOnly
                required
                minLength={3}
                maxLength={20}
                pattern="[A-Za-z]+"
                title="Name must contain only letters and be between 3 and 20 characters long."
                autoComplete="off"
                autoFocus
                autoCapitalize="words"
                spellCheck={false}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input w-full bg-white focus:border-primary border border-gray-300"
                value={session?.user?.email ?? ""}
                readOnly
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700">Profile Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="Enter profile photo URL"
                className="input w-full bg-white focus:border-primary border border-gray-300"
                value={session?.user?.image ?? ""}
                readOnly

              />
            </div>
            {IsStripeConnected === false && (<a
              href={connectUrl}
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 inline-block text-center"
            >
              Connect Your Stripe
            </a>)}
            {IsStripeConnected === true && (
              <>
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-700 font-medium">Your Stripe is Connected</span>
                </div>
                <button className="btn btn-outline btn-error hover:text-white" onClick={disconnectStripe} >Disconnect Stripe</button>
              </>
            )}
            <ShowInvestorsToggle/>
            <button onClick={saveChanges} type="submit" className="btn btn-primary w-full mt-3 text-white hover:opacity-90">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
