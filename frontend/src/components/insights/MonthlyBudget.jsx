import React, { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

export const MonthlyBudget = () => {
    const [totalPrediction, setTotalPrediction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchPredictions = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:8000/api/predicted-budget/", {
                headers: { Authorization: `Token ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch predictions");
            const data = await res.json();
            // Sum all predicted_amount values
            const total = data.reduce((acc, pred) => acc + Number(pred.predicted_amount), 0);
            setTotalPrediction(total);
        } catch (err) {
            setError(err.message || "Unknown error");
        }
        setLoading(false);
    };

    const handleRefresh = async () => {
    setRefreshing(true);
    const token = localStorage.getItem("token");
    try {
        const res = await fetch("http://localhost:8000/api/predicted-budget/refresh/", {
            method: "POST",
            headers: { Authorization: `Token ${token}` },
        });
        // Wait for backend to finish updating, then fetch new data
        if (res.ok) {
            // Option 1: Wait a bit, then fetch
            setTimeout(fetchPredictions, 500);
            // Option 2: If backend returns new predictions directly:
            // const data = await res.json();
            // const total = data.reduce((acc, pred) => acc + Number(pred.predicted_amount), 0);
            // setTotalPrediction(total);
        } else {
            setError("Failed to refresh predictions");
        }
    } catch (err) {
        setError("Failed to refresh predictions");
    }
    setRefreshing(false);
};

    useEffect(() => {
        fetchPredictions();
    }, []);

    return (
        <div className="p-4 rounded border border-stone-300 text-center h-full">
            <h2 className="text-lg font-semibold mb-2">
                Predicted Spendings for Next Month
            </h2>
            {loading ? (
                <div className="text-stone-400">Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : totalPrediction !== null ? (
                <p className="text-3xl font-bold">${totalPrediction.toFixed(2)}</p>
            ) : (
                <div className="text-stone-400">No predictions available.</div>
            )}
            <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="mt-4 flex items-center gap-1 mx-auto text-sm text-violet-600 hover:underline"
            >
                <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
                Refresh
            </button>
        </div>
    );
}
