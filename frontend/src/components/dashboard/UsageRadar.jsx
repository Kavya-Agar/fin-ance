import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import axios from "axios";

export const UsageRadar = () => {
  const [data, setData] = useState([]);
  const [max, setMax] = useState(150); // Default max for the axis

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/expenses/category_distribution/', {
      headers: { Authorization: `Token ${token}` }
    }).then(res => {
      setData(res.data);
      // Optionally, set max to the highest value + some padding
      if (res.data.length > 0) {
        const maxVal = Math.max(...res.data.map(d => d.amount));
        setMax(Math.ceil(maxVal / 10) * 10 + 10); // round up to nearest 10
      }
    });
  }, []);

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
            <PolarRadiusAxis angle={30} domain={[0, max]} />
            <Radar
              name="Spending"
              dataKey="amount"
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
