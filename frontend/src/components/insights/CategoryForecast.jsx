import React, { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

const CATEGORIES = ["Food", "Travel", "Academics", "Rent", "Groceries", "Other"];

export const CategoryForecast = () => {
    const [forecast, setForecast] = useState({});
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchForecast = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:8000/api/category-forecast/", {
                headers: { Authorization: `Token ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch category forecast");
            const data = await res.json();
            setForecast(data);
        } catch (err) {
            setError(err.message || "Unknown error");
        }
        setLoading(false);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchForecast();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchForecast();
    }, []);

    return (
        <div className="p-4 rounded border border-stone-300 text-center h-full">
            <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold">
                    Estimated Category Spendings
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-1 text-sm text-violet-600 hover:underline"
                >
                    <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>
            {loading ? (
                <div className="text-stone-400">Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <table className="w-full mt-2">
                    <thead>
                        <tr className="text-xs text-stone-500">
                            <th className="text-left p-2">Category</th>
                            <th className="text-right p-2">Predicted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CATEGORIES.map((cat) => (
                            <tr key={cat} className="text-sm">
                                <td className="text-left p-2">{cat}</td>
                                <td className="text-right p-2 font-mono">
                                    ${forecast[cat] !== undefined
                                        ? Number(forecast[cat]).toFixed(2)
                                        : "--"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
