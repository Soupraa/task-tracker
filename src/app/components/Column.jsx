import { useState } from "react";

export default function Column({ id, title, children, onDrop }) {
  const [isActive, setIsActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    // Only activate after a slight delay to reduce sensitivity
    setTimeout(() => setIsActive(true), 100);
  };

  const handleDragLeave = () => {
    setIsActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsActive(false);
    const itemId = e.dataTransfer.getData("text/plain");
    onDrop(itemId);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex flex-col p-4 rounded-xl min-h-96 min-w-64"
      style={{
        backgroundColor: isActive ? "#f8fafc" : "#fff",
        border: `1px solid ${isActive ? "#94a3b8" : "#e2e8f0"}`,
        transition: "all 0.3s ease",
      }}
    >
<h2 className="mb-4 text-[#334155] text-center text-3xl font-jersey break-all overflow-hidden">
  {title}
</h2>


      <div className="flex flex-col">{children}</div>
    </div>
  );
}
