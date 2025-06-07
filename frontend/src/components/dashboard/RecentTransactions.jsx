import React, { useState, useEffect } from "react";
import { FiDollarSign, FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";

export const RecentTransactions = ({ limit }) => {
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

    // Only show up to `limit` transactions if limit is provided
    const displayedTransactions = limit
        ? transactions.slice(0, limit)
        : transactions;

    return (
        <div className="col-span-12 p-4 rounded border border-stone-300">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FiDollarSign /> Recent Transactions
                </h3>
                <button className="text-sm text-violet-500 hover:underline">
                    See all
                </button>
            </div>
            <table className="w-full table-auto">
                <TableHead />
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="text-center text-stone-400 py-4">
                                Loading...
                            </td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={5} className="text-center text-red-400 py-4">
                                {error}
                            </td>
                        </tr>
                    ) : displayedTransactions.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center text-stone-400 py-4">
                                No transactions found.
                            </td>
                        </tr>
                    ) : (
                        displayedTransactions.map((tx, idx) => (
                            <TableRow
                                key={tx.id || idx}
                                cusId={tx.description}
                                sku={tx.category}
                                date={tx.date}
                                price={`$${Number(tx.amount).toFixed(2)}`}
                                order={idx + 1}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

const TableHead = () => (
    <thead>
        <tr className="text-sm font-normal text-stone-500">
            <th className="text-start p-1.5">Description</th>
            <th className="text-start p-1.5">Category</th>
            <th className="text-start p-1.5">Date</th>
            <th className="text-start p-1.5">Amount</th>
            <th className="w-8"></th>
        </tr>
    </thead>
);

const TableRow = ({ cusId, sku, date, price, order }) => (
    <tr className="text-sm" style={order % 2 ? { backgroundColor: '#faf2ef' } : {}}>
        <td className="p-1.5">{cusId}</td>
        <td className="p-1.5">{sku}</td>
        <td className="p-1.5">{date}</td>
        <td className="p-1.5">{price}</td>
        <td className="w-8">
            <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
                <FiMoreHorizontal />
            </button>
        </td>
    </tr>
);
