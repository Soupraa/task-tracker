'use client' // Add this at the top if using Next.js 13+
import Dashboard from "./components/Dashboard";
import React from "react";
export default function Home() {
  const [cards, setCards] = React.useState([
    { id: 1, text: 'Task 1: Complete project setup' },
    { id: 2, text: 'Task 2: Implement drag and drop' },
    { id: 3, text: 'Task 3: Test the application' },
    { id: 4, text: 'Task 4: Deploy to production' },
  ])
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div>
      <Dashboard cards={cards} setCards={setCards} />
    </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      
      </footer>
    </div>
  );
}
