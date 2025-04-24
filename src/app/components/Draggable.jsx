import { useState } from 'react';

export default function Draggable({ id, children, onDragEnd, title}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    // Add slight delay to prevent accidental drags
    setTimeout(() => e.dataTransfer.setDragImage(new Image(), 0, 0), 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className='cursor-grab p-4 m-2 bg-amber-100 border-2 rounded-b-lg'
      style={{
        boxShadow: isDragging 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.2s ease',
        opacity: isDragging ? 0.9 : 1,
        userSelect: 'none',
      }}
    >
      <h3 className="text-2xl font-jersey">{title}</h3>
      {children}
    </div>
  );
}