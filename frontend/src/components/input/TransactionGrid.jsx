import React, { useState, useEffect } from "react";
import { RecentTransactions } from "../dashboard/RecentTransactions.jsx";
import SubmitTransaction from "./SubmitTransaction.jsx";

export const TransactionGrid = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch transactions from backend
    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:8000/api/expenses/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setTransactions(data);
        } catch (err) {
            setError("Failed to fetch transactions.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Handle new transaction submission
    const handleTransactionSubmit = async (formData) => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/expenses/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            const newTx = await res.json();
            setTransactions(prev => [newTx, ...prev]); // Option 1: prepend new transaction
            // OR: await fetchTransactions(); // Option 2: refetch all
        }
    };

    return (
        <div className="px-4 grid gap-3 grid-cols-12">
            <div className="col-span-full">
                <SubmitTransaction onSubmit={handleTransactionSubmit} />
            </div>
            <RecentTransactions 
            transactions={transactions} 
            loading={loading} 
            error={error} 
            />
        </div>
    );
}
