import React from "react";
import Anchor from "../../assets/Anchor.svg?react";
import Settings from "../../assets/Settings.svg?react";
import Grid from "../../assets/Grid.svg?react";
import TrendingUp from "../../assets/Trending up.svg?react";

export default function Options({ className }) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-[307px] h-[648px] bg-[#fcfdf1] rounded-[50px] shadow-[0px_4px_4px_#00000040] ${className}`}
    >
      <div className="flex flex-col gap-14 w-full px-8">
        {/* Dashboard Option */}
        <div className="flex items-center gap-6">
          <Grid className="w-10 h-10 text-[#05606C]" />
          <span className="font-bold text-[#05606c] text-[22px] font-['Nunito']">Dashboard</span>
        </div>
        {/* Fish Option */}
        <div className="flex items-center gap-6">
          <Anchor className="w-10 h-10 text-[#05606C]" />
          <span className="font-bold text-[#05606c] text-[22px] font-['Nunito']">Fish</span>
        </div>
        {/* Insights Option */}
        <div className="flex items-center gap-6">
          <TrendingUp className="w-10 h-10 text-[#05606C]" />
          <span className="font-bold text-[#05606c] text-[22px] font-['Nunito']">Insights</span>
        </div>
        {/* Settings Option */}
        <div className="flex items-center gap-6">
          <Settings className="w-10 h-10 text-[#05606C]" />
          <span className="font-bold text-[#05606c] text-[22px] font-['Nunito']">Settings</span>
        </div>
      </div>
    </div>
  );
}
