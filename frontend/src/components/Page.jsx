import React from "react";
import DashboardFull from "./dashboard/dashboard.jsx";
import Sidebar from "./sidebar/sidebar.jsx";


export default function Page() {
    return (
        <div className="grid gap-4 p-4 grid-cols-[220px,_1fr]" style={{ backgroundColor: '#05606C' }}>
            <Sidebar />
            <DashboardFull />
        </div>
    );
}