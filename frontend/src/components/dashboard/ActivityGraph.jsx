import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export const ActivityGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/expenses/monthly_chart/', {
      headers: { Authorization: `Token ${token}` }
    }).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, []); // re-run if you want to refresh on new transaction

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Activity
        </h3>
      </div>
      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{ top: 0, right: 0, left: 24, bottom: 0 }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs font-bold" padding={{ right: 30 }} />
            <YAxis className="text-xs font-bold" axisLine={false} tickLine={false} />
            <Tooltip wrapperClassName="text-sm rounded" labelClassName="text-sm text-stone-500" />
            <Line
              type="monotone"
              dataKey="Spendings"
              stroke="#5b21b6"
              fill="#5b21b6"
              animationDuration={500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
