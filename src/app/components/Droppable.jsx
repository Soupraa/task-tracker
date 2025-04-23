import { useState } from 'react';

export default function Droppable({ id, title, children, onDrop }) {
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
    const itemId = e.dataTransfer.getData('text/plain');
    onDrop(itemId);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        flex: 1,
        padding: '16px',
        backgroundColor: isActive ? '#f8fafc' : '#fff',
        border: `1px solid ${isActive ? '#94a3b8' : '#e2e8f0'}`,
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        minHeight: '400px',
      }}
    >
      <h2 style={{ 
        marginBottom: '16px', 
        color: '#334155',
        textAlign: 'center'
      }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}