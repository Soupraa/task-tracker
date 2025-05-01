import { useState, useRef, useEffect } from "react";

export default function EditableText({ value, onChange, className }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
    if (!editing) {
        setDraft(value);
      }
  }, [editing, value]);

  const handleBlur = () => {
    setEditing(false);
    if (draft.trim() !== value) {
      onChange(draft.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current?.blur(); // Save on Enter
    } else if (e.key === "Escape") {
      setDraft(value); // Cancel edit
      setEditing(false);
    }
  };

  return editing ? (
    <input
      ref={inputRef}
      type="text"
      className={`${className} border border-gray-300 focus:border-black focus:outline-none focus:px-0.5`}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      onDoubleClick={(e) => {
        e.stopPropagation();  // 👈 Add this
        setEditing(true);
      }}
      className={`${className} cursor-pointer`}
      title="Double-click to edit"
    >
      {value}
    </span>
  );
}
