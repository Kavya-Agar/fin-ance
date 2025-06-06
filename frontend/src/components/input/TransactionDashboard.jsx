import React from "react";
import { TopBar } from "../dashboard/TopBar";
import { TransactionGrid } from "./TransactionGrid";

export default function TransacationDashboard () {
    return (
        <div className="rounded-lg pb-4 shadow" style= {{backgroundColor : '#FCFDF1'}}>
              <TopBar />
              <TransactionGrid />
        </div>
    );
}