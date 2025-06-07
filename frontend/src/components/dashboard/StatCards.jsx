import React, { useEffect, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import axios from "axios";

export const StatCards = () => {
    const [stats, setStats] = useState({ total: 0, this_month: 0, last_month: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/expenses/stats/', {
            headers: {
                Authorization: `Token ${token}`,
            }
        }).then(res => {
            setStats(res.data);
            setLoading(false);
        });
    }, []);

    // Calculate percent change for illustration
    const percentChange = stats.last_month
        ? ((stats.this_month - stats.last_month) / stats.last_month * 100).toFixed(1)
        : 0;

    return (
        <>
            <Card
                title="Total Spendings"
                value={loading ? "..." : `$${stats.this_month.toLocaleString()}`}
                period="this month"
            />
            <Card
                title="Total Spendings"
                value={loading ? "..." : `$${stats.last_month.toLocaleString()}`}
                period="last month"
            />
            <Card
                title="Total Spendings"
                value={loading ? "..." : `$${stats.total.toLocaleString()}`}
                period="so far"
            />
        </>
    );
};

const Card = ({ title, value, pillText, trend, period }) => (
    <div className="col-span-4 p-4 rounded border border-stone-300">
        <div className="flex mb-8 items-start justify-between">
            <div>
                <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
                <p className="text-3xl font-semibold">{value}</p>
            </div>
            {pillText && (
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
            )}
        </div>
        <p className="text-xs text-stone-500">{period}</p>
    </div>
);
