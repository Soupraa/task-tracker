'use client'
import { useState } from 'react';
import Draggable from '../components/Draggable';
import Droppable from '../components/Droppable';

const initialColumns = {
  todo: [
    { id: 'task1', text: 'Design Homepage' },
    { id: 'task2', text: 'Implement API' },
  ],
  progress: [
    { id: 'task3', text: 'Write Documentation' },
  ],
  done: [
    { id: 'task4', text: 'Setup CI/CD Pipeline' },
  ]
};

export default function Dashboard() {
  const [columns, setColumns] = useState(initialColumns);

  const handleDrop = (itemId, targetColumn) => {
    setColumns(prev => {
      const newColumns = { ...prev };
      
      // Remove from current column
      Object.keys(newColumns).forEach(columnId => {
        newColumns[columnId] = newColumns[columnId].filter(
          item => item.id !== itemId
        );
      });

      // Find the item
      const allItems = Object.values(prev).flat();
      const movedItem = allItems.find(item => item.id === itemId);

      // Add to target column if item exists
      if (movedItem) {
        newColumns[targetColumn] = [
          ...newColumns[targetColumn],
          movedItem
        ];
      }

      return newColumns;
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '24px', 
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <Droppable 
        id="todo" 
        title="To Do" 
        onDrop={(itemId) => handleDrop(itemId, 'todo')}
      >
        {columns.todo.map(item => (
          <Draggable key={item.id} id={item.id}>
            {item.text}
          </Draggable>
        ))}
      </Droppable>

      <Droppable 
        id="progress" 
        title="In Progress" 
        onDrop={(itemId) => handleDrop(itemId, 'progress')}
      >
        {columns.progress.map(item => (
          <Draggable key={item.id} id={item.id}>
            {item.text}
          </Draggable>
        ))}
      </Droppable>

      <Droppable 
        id="done" 
        title="Done" 
        onDrop={(itemId) => handleDrop(itemId, 'done')}
      >
        {columns.done.map(item => (
          <Draggable key={item.id} id={item.id}>
            {item.text}
          </Draggable>
        ))}
      </Droppable>
    </div>
  );
}