import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
    return (
        <>
            <Card 
                title="Total Spendings"
                value="$1,234,567"
                pillText="+12%" // implement the change
                trend="up"
                period="this month"            
            />
            <Card 
                title="Total Spendings"
                value="$987,654"
                pillText="-5%"
                trend="down"
                period="last month"
            />
            <Card 
                title="Total Spendings"
                value="$246,913"
                pillText="+7%"
                trend="up"
                period="so far"
            />
        </>
    );
};

const Card = ({ title, value, pillText, trend, period }) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
          {pillText}
        </span>
      </div>
      <p className="text-xs text-stone-500">{period}</p>  
    </div>
  );
};