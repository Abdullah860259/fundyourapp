"use client";

export default function Loading({ className }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 500,   // Y position in px
      behavior: "smooth" // optional: "auto" or "smooth"
    });
  }
  return (
    <div onClick={scrollToTop} className={`min-h-screen flex flex-col items-center justify-center bg-purple-50 ${className} `}>
      <div className="relative w-28 h-28">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-spin border-t-purple-700"></div>
        {/* Inner bouncing dots */}
        <div className="flex justify-evenly items-center h-full px-2">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className={`block w-5 h-5 bg-purple-600 rounded-full animate-bounce delay-${i * 200}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
      <p className="mt-6 text-purple-700 font-semibold text-lg tracking-wide">
        Loading, please wait...
      </p>
    </div>
  );
}
