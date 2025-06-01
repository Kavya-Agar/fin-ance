import React from "react";
import fishSeafoodIconFreeVectorBackgroundRemoved1 from "../../assets/fish-seafood-icon-free-vector Background Removed.png";
import Options from "./Options.jsx";

export default function Sidebar() {
  return (
    <div className="w-[360px] h-screen bg-[#05606c] flex flex-col items-center pt-8">
      {/* Fish Icon */}
      <img
        className="w-[120px] h-[120px] mb-8"
        alt="Fish seafood icon"
        src={fishSeafoodIconFreeVectorBackgroundRemoved1}
      />
      {/* "Options" label */}
      <div className="flex items-center gap-2 mb-6">
      </div>
      {/* Options Box */}
      <Options />
    </div>
  );
}


