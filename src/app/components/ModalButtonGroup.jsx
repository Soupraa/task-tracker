import React from "react";

export default function ModalButtonGroup({leftLabel, rightLabel, closeModalFunc }) {
  return (
    <div className="flex justify-center gap-3 text-xl">
      <button
        className="border-2 p-2 w-[50%] font-jersey rounded-2xl tracking-wide hover:bg-red-400 transition-all"
        type="button"
        onClick={closeModalFunc}
      >
        {leftLabel}
      </button>
      <button
        className="border-2 p-2 w-[50%] font-jersey rounded-2xl tracking-wide hover:bg-green-400 transition-all"
        type="submit"
      >
        {rightLabel}
      </button>
    </div>
  );
}
