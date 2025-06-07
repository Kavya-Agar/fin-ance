import React, { useState } from "react";
import { FiDollarSign, FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const RecentTransactions = ({ transactions = [], loading, error, limit }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    // If limit is provided (e.g., 5 for dashboard), show only first page, no pagination controls.
    const itemsPerPage = limit || 20;

    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedTransactions = transactions.slice(startIndex, endIndex);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleBack = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="col-span-12 p-4 rounded border border-stone-300">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FiDollarSign /> Recent Transactions
                </h3>
                <button
                    className="text-sm text-violet-500 hover:underline"
                    onClick={() => navigate('/page/fish')}
                >
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
                                order={startIndex + idx + 1}
                            />
                        ))
                    )}
                </tbody>
            </table>
            {/* Show pagination controls only if limit is not set (input page) and there are multiple pages */}
            {!limit && totalPages > 1 && (
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleBack}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Back
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
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
