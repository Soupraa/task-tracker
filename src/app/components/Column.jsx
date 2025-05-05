import { useState } from "react";

export default function Column({ id, title, children, onDrop, count}) {
  const [isActive, setIsActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    // Only activate after a slight delay to reduce sensitivity
    setIsActive(true);
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
      className="flex flex-col p-4 rounded-xl max-w-72 min-w-56 h-fit min-h-8/12"
      style={{
        backgroundColor: isActive ? "#fff" : "#f8fafc",
        border: `1px solid ${isActive ? "black" : "#94a3b8"}`,
        transition: "all 0.3s ease",
      }}
    >
      <h2 className={`mb-4 text-center text-3xl font-jersey break-all overflow-hidden ${isActive ? "text-black": "text-[#334155]"}`}>
        {title}: {count}
      </h2>

      <div className="flex flex-col">{children}</div>
    </div>
  );
}
