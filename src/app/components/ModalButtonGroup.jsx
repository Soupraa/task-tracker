import React from "react";

export default function ModalButtonGroup({
  leftLabel,
  rightLabel,
  closeModalFunc,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 text-xl">
      <button
        aria-label="close modal button"
        className="border-2 p-2 w-full sm:w-1/2 font-jersey rounded-2xl tracking-wide hover:bg-red-400 transition-all cursor-pointer"
        type="button"
        onClick={closeModalFunc}
      >
        {leftLabel}
      </button>
      <button
        aria-label={`${rightLabel} button`}
        className="border-2 p-2 w-full sm:w-1/2 font-jersey rounded-2xl tracking-wide hover:bg-green-400 transition-all cursor-pointer"
        type="submit"
      >
        {rightLabel}
      </button>
    </div>
  );
}
