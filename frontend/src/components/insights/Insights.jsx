import React from "react";
import { TopBar } from '../dashboard/TopBar.jsx'
import { MonthlyBudget } from './MonthlyBudget.jsx';
import { CategoryForecast } from './CategoryForecast.jsx'
import { Anomaly } from "./Anomaly.jsx";
import { SavingSuggestions } from "./SavingSuggestions.jsx";

export default function Insights () {
  return (
    <div className="rounded-lg pb-4 shadow" style={{ backgroundColor: '#FCFDF1' }}>
      <TopBar />
      <div className="flex flex-row gap-4 px-4">
        <div className="flex-1">
          <MonthlyBudget />
        </div>
        <div className="flex-1">
          <CategoryForecast />
        </div>
      </div>
      <Anomaly />
      <SavingSuggestions />
    </div>
  )
};
