"use client"; // Add this at the top if using Next.js 13+
import Dashboard from "./components/Dashboard";
import React from "react";
import ToolBar from "./components/ToolBar";
export default function Home() {
  const [cards, setCards] = React.useState([
    { id: 1, text: "Task 1: Complete project setup" },
    { id: 2, text: "Task 2: Implement drag and drop" },
    { id: 3, text: "Task 3: Test the application" },
    { id: 4, text: "Task 4: Deploy to production" },
  ]);
  return (
    <div className="p-16">
      <h1>To do List</h1>
      <ToolBar/>
      <div>
        <Dashboard cards={cards} setCards={setCards} />
      </div>
    </div>
  );
}
