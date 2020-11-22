import Link from "next/link";
import Header from "../src/Header";
import PieChart from "../src/PieChart";
import React, { useState } from "react";



export default function Dashboard() {

  return (
    <div className="container">
      <Header />
      <PieChart />
    </div>
  );
}
