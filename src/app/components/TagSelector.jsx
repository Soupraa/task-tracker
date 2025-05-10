import React from "react";

export const TagSelector = ({ availableTags, selectedTags, onChange }) => {
  const toggleTag = (tag) => {
    const isSelected = selectedTags.some((t) => t.id === tag.id);
    if (isSelected) {
      onChange(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      onChange([...selectedTags, tag]);
    }
  };
  return (
    <div className="mt-4">
      <label className="text-sm font-semibold tracking-wide">Tags</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {availableTags.length < 1 && <p className="text-sm font-inter text-gray-600">No tags available.</p>}
        {availableTags?.map((tag, k) => {
          const isChecked = selectedTags.some((t) => t.id === tag.id);
          return (
            <label
              key={k}
              style={{ backgroundColor: tag.color }}
              className="flex items-center gap-2 px-3 py-1 rounded-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleTag(tag)}
                className="cursor-pointer"
              />
              {tag.title}
            </label>
          );
        })}
      </div>
    </div>
  );
};
