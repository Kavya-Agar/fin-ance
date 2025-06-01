import React from "react";
import Sidebar from "../sidebar/sidebar.jsx";

export default function DashboardFull () {
  return (
    <div>
    {/* <div className="relative w-[1080px] h-[1024px] bg-[#fcfdf1]">
      <div className="absolute w-[474px] h-[194px] top-[180px] left-[50px] bg-[#e1f4e4] rounded-[50px] border border-solid border-black shadow-[0px_4px_4px_#00000040]">
        <div className="absolute top-3.5 left-[27px] [font-family:'Nunito-Bold',Helvetica] font-bold text-[#05606c] text-[40px] tracking-[0] leading-[normal]">
          Amount Spent
        </div>
      </div>
      <div className="absolute w-[474px] h-[376px] top-[512px] left-[50px] bg-[#e1f4e4] rounded-[50px] border border-solid border-black shadow-[0px_4px_4px_#00000040]">
        <div className="absolute top-3.5 left-[27px] [font-family:'Nunito-Bold',Helvetica] font-bold text-[#05606c] text-[40px] tracking-[0] leading-[normal]">
          Top Categories
        </div>
      </div>
      <div className="absolute w-[474px] h-[376px] top-[180px] left-[582px] bg-[#e1f4e4] rounded-[50px] border border-solid border-black shadow-[0px_4px_4px_#00000040]">
        <div className="absolute top-3.5 left-[26px] [font-family:'Nunito-Bold',Helvetica] font-bold text-[#05606c] text-[40px] tracking-[0] leading-[normal]">
          Spending
        </div>
      </div>
      <div className="absolute top-[49px] left-[50px] [font-family:'Nunito-Bold',Helvetica] font-bold text-[#05606c] text-[64px] tracking-[0] leading-[normal]">
        Dashboard
      </div> */}
      <Sidebar></Sidebar>
    </div>
    // </div>
  );
};
