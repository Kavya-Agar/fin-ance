import React from "react";
import DashboardFull from "./dashboard/Dashboard.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";

export default function Page() {
    return (
        <div className="grid gap-4 p-4 grid-cols-[220px,_1fr] min-h-screen"
             style={{ backgroundColor: '#D7907B' }}>
            <Sidebar />
            <DashboardFull />
        </div>
    );
}