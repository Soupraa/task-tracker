"use client"; // Add this at the top if using Next.js 13+
import Dashboard from "./components/Dashboard";
import React from "react";
import ToolBar from "./components/ToolBar";
export default function Home() {
  return (
    <>
      <ToolBar />
      <div className="p-16">
        <div>
          <Dashboard />
        </div>
      </div>
    </>
  );
}
