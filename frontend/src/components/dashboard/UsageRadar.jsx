import React, { PureComponent } from "react";
import { FiEye } from "react-icons/fi";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    feature: "Food",
    mobile: 120,
    desktop: 110,
    max: 150,
  },
  {
    feature: "Travel",
    mobile: 98,
    desktop: 130,
    max: 150,
  },
  {
    feature: "Academics",
    mobile: 86,
    desktop: 130,
    max: 150,
  },
  {
    feature: "Rent",
    mobile: 99,
    desktop: 100,
    max: 150,
  },
  {
    feature: "Groceries",
    mobile: 85,
    desktop: 90,
    max: 150,
  },
  {
    feature: "Other",
    mobile: 65,
    desktop: 85,
    max: 150,
  },
];

export const UsageRadar = () => {
  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiEye /> Spending Categories
        </h3>
      </div>
      
      <div className="h-64 px-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis className="text-xs font-bold" dataKey="feature" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="Desktop"
            dataKey="desktop"
            stroke="#D7907B"
            fill="#D7907B"
            fillOpacity={0.3}
          />
          <Tooltip 
            wrapperClassName="text-xs rounded"
            labelClassName="text-xs text-stone-500"
            />
        </RadarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};