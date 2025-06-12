import React from "react";
import { TopBar } from '../dashboard/TopBar.jsx'
import { MonthlyBudget } from './MonthlyBudget.jsx';
// import { CategoryForecast } from './CategoryForecast.jsx'
// import { Anomaly } from "./Anomaly.jsx";
// import { SavingSuggestions } from "./SavingSuggestions.jsx";


export default function Insights () {
  return (
    <div className="rounded-lg pb-4 shadow" style= {{backgroundColor : '#FCFDF1'}}>
      <TopBar />
      <MonthlyBudget />
      {/* <CategoryForecast />
      <Anomaly />
      <SavingSuggestions /> */}
    </div>
  )
};