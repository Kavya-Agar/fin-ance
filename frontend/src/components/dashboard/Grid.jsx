import React, { useState, useEffect } from "react";
import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { UsageRadar } from "./UsageRadar";
import { RecentTransactions } from "./RecentTransactions";
import axios from "axios";

export const Grid = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Not authenticated.");
            setLoading(false);
            return;
        }
        axios.get('http://localhost:8000/api/expenses/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then(response => {
            setTransactions(response.data);
            setLoading(false);
        })
        .catch(err => {
            setError("Failed to fetch transactions.");
            setLoading(false);
        });
    }, []);

    return (
        <div className="px-4 grid gap-3 grid-cols-12">
            <StatCards />
            <ActivityGraph />
            <UsageRadar />
            <RecentTransactions
                transactions={transactions}
                loading={loading}
                error={error}
                limit={5}
            />
        </div>
    );
}
