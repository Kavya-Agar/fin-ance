import React from "react";
import Insights from "./insights/Insights.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";

export default function MLInsights() {
    return (
        <div className="grid gap-4 p-4 grid-cols-[220px,_1fr] min-h-screen"
             style={{ backgroundColor: '#D7907B' }}>
            <Sidebar />
            <Insights />
        </div>
    );
}