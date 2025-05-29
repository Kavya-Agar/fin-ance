import { useState } from "react";
import { Link } from "react-router-dom";

// Pixel fish SVG for the speech bubble
function PixelFish() {
  return (
    <svg width="32" height="18" viewBox="0 0 32 18" style={{ imageRendering: "pixelated" }}>
      {/* Tail */}
      <rect x="0" y="7" width="4" height="4" fill="#0faaf0" />
      {/* Body */}
      <rect x="4" y="6" width="12" height="6" fill="#29b6f6" />
      {/* Face */}
      <rect x="16" y="7" width="4" height="4" fill="#81b8ce" />
      {/* Eye */}
      <rect x="18" y="8" width="1" height="1" fill="#222" />
      {/* Fin */}
      <rect x="8" y="4" width="2" height="2" fill="#0faaf0" />
      <rect x="8" y="12" width="2" height="2" fill="#0faaf0" />
    </svg>
  );
}

// Eye icon for password visibility
function EyeIcon({ show }) {
  return show ? (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.5 10.5 0 0112 19c-7 0-10.5-7-10.5-7a21.44 21.44 0 014.06-5.94M3 3l18 18" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Pixel stars for background
function PixelStars({ darkMode }) {
  // Use blue/white for dark, yellow/blue for light
  const starColor = darkMode ? "#5ee7ff" : "#b3d7ff";
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: Math.random() > 0.7 ? 6 : 3,
            height: Math.random() > 0.7 ? 6 : 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 70}%`,
            background: starColor,
            opacity: Math.random() * 0.8 + 0.2,
            borderRadius: 2,
            boxShadow: `0 0 2px 1px ${starColor}`,
            imageRendering: "pixelated",
          }}
        />
      ))}
    </>
  );
}

export default function Login({ darkMode }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center font-pixel relative transition-colors duration-500"
      style={{
        background: darkMode
          ? "linear-gradient(to bottom, #061936 60%, #0a2233 100%)"
          : "linear-gradient(to bottom, #b9eefa 60%, #0faaf0 100%)"
      }}
    >
      {/* Pixel stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PixelStars darkMode={darkMode} />
      </div>

      {/* Signup Card */}
      <div className="relative z-10 bg-white/95 dark:bg-[#0f172a]/95 rounded-xl border-4 border-blue-300 dark:border-blue-900 shadow-xl px-8 py-8 w-full max-w-md flex flex-col items-center"
        style={{ boxShadow: "0 6px 32px 0 #00336644" }}>
        {/* Speech bubble with fish */}
        <div className="flex items-center mb-6">
          <span className="mr-3"><PixelFish /></span>
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-300 dark:border-blue-700 rounded-lg px-4 py-2 text-xs text-blue-900 dark:text-blue-100" style={{ fontFamily: "inherit" }}>
            Log in to resume swimming!
          </div>
        </div>

        {/* Email/Password Form */}
        <form className="w-full flex flex-col space-y-4 mt-2">
          <input
            type="email"
            required
            placeholder="Email"
            className="rounded-lg border-2 border-blue-200 dark:border-blue-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-sans bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="rounded-lg border-2 border-blue-200 dark:border-blue-800 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 font-sans bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon show={showPassword} />
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#0faaf0] text-white font-pixel rounded-lg py-2 mt-2 shadow hover:bg-blue-500 transition text-lg"
          >
            Log in!
          </button>
        </form>

        {/* Terms and login prompt */}
        <div className="text-md text-blue-700 dark:text-blue-300 mt-2 text-center font-sans">
          Need an account?{" "}
          <Link to="/signup" className="underline hover:text-[#0faaf0]">Sign Up</Link>
        </div>
        <div className="text-md text-blue-700 dark:text-blue-300 mt-2 text-center font-sans">
            Forgot your password?{" "}
            <Link to="/forgot" className="underline hover:text-[#0faaf0]">Reset it</Link>
        </div>
      </div>
    </div>
  );
}
