import React from "react";
import AddNewItemModal from "./modals/AddNewItemModal";
import AddNewTagModal from "./modals/AddNewTagModal";

export default function ToolBar({ tagsArr }) {
  return (
    <div className="w-50 h-vh pt-8 border-r-[1px] border-gray-300 px-4">
      <AddNewItemModal />
      <div className="flex-col mt-6 gap-1.5">
        <h2 className="font-jersey text-2xl inline-block items-center mr-2 align-middle">
          Tags
        </h2>
        <AddNewTagModal />
        <div className="mt-5">
          {tagsArr?.map((i, k) => {
            return (
              <div
                key={k}
                style={{ backgroundColor: i.color }}
                className="w-full p-2 font-inter my-1"
              >
                {i.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
