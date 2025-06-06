import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";

export default function Dashboard () {
  return (
    <div className="rounded-lg pb-4 shadow" style= {{backgroundColor : '#FCFDF1'}}>
      <TopBar />
      <Grid />
    </div>
  )
};