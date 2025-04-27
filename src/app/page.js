"use client"; // Add this at the top if using Next.js 13+
import Dashboard from "./components/Dashboard";
import React from "react";
import DashboardsNavigator from "./components/DashboardsNavigator";
export default function Home() {
  const dashboards = [
    {
      id: "1",
      title: "dashboard 1",
    },
    {
      id: "2",
      title: "dashboard 2",
    },
  ];
  return (
    <>
      <DashboardsNavigator />
    </>
  );
}
