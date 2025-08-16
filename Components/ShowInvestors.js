"use client";
import authOptions from "@/lib/auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ShowInvestorsToggle() {
  const session = useSession();
  const [showInvestors, setShowInvestors] = useState(false);

  useEffect(() => {
    const fetchInvestors = async () => {
      if (session.status !== "authenticated") return;
      let res = await fetch(`/api/updateinvestors?id=${session.data.user.id}`)
      res = await res.text();
      console.log(res);
      setShowInvestors(JSON.parse(res))
    }
    fetchInvestors();
  }, [session])


  const handleInvestors = async () => {
    const newValue = !showInvestors;
    setShowInvestors(newValue)
    if (session.status !== "authenticated") return;
    const body = {
      userid: session.data.user.id,
      showInvestors: newValue
    }
    let res = await fetch("/api/updateinvestors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    res = await res.text();
    console.log(res);
  }



  return (
    <div className="mt-6 p-5 bg-white rounded-xl shadow-sm max-w-xl mx-auto space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Text Section */}
        <div className="flex-1">
          <label
            htmlFor="showInvestors"
            className="block text-gray-800 font-semibold text-lg"
          >
            Show Investors
          </label>
          <p className="text-sm text-gray-500 leading-snug">
            Control whether investors are visible on your projects. <br />
            Turning this off hides their names and contributions.
          </p>
        </div>

        {/* Toggle Switch */}
        <button
          id="showInvestors"
          type="button"
          onClick={handleInvestors}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 shrink-0 cursor-pointer ${showInvestors ? "bg-purple-600" : "bg-gray-300"
            }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${showInvestors ? "translate-x-6" : "translate-x-1"
              }`}
          />
        </button>
      </div>

      {/* Dynamic Helper Text */}
      <p className="text-sm font-medium text-gray-600 text-center sm:text-left">
        {showInvestors
          ? "✅ Investors will be displayed publicly."
          : "🙈 Investors will remain hidden."}
      </p>
    </div>
  );
}
