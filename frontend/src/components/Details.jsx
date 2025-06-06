import React from "react";
import FullInput from './input/TransactionDashboard.jsx';
import Sidebar from "./sidebar/sidebar.jsx";

export default function Details() {
    return (
        <div
            className="grid gap-4 p-4 grid-cols-[220px,_1fr] min-h-screen"
            style={{ backgroundColor: '#D7907B' }}
        >
            <Sidebar />
            <FullInput />
        </div>
    );
}