import React from "react";
import TransactionInputs from './TransactionInputs.jsx';
import { RecentTransactions } from "../dashboard/RecentTransactions.jsx";
import SubmitTransaction from "./SubmitTransaction.jsx";

export const TransactionGrid = () => {
    return (
        <div className="px-4 grid gap-3 grid-cols-12">
            <div className="col-span-full">
                <SubmitTransaction />
            </div>
                <RecentTransactions />
        </div>
    );
}