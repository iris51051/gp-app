import React from "react";
import { PieChart } from "../components/ChartComponent";
import { ChartScoreCard } from "../components/ChartComponent";

const Dashboard = () => {
  const colors = [
    "#4180ec",
    "#4fd9bc",
    "#494e5f",
    "#30c7e9",
    "#6269e9",
    "#00aaaa",
    "#42c360",
    "#b5cf14",
    "#eaab2f",
    "#bababa",
  ].slice(0, 10);
  return (
    <div>
      <PieChart colors={colors} />
      <ChartScoreCard />
    </div>
  );
};
export default Dashboard;
