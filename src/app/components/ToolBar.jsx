import React from "react";
import AddNewItemModal from "./modals/AddNewItemModal";
import AddNewTagModal from "./modals/AddNewTagModal";
import TagMenu from "./TagMenu";

export default function ToolBar({ tagsArr }) {
  return (
    <div className="w-55 h-vh pt-8 border-r-[1px] border-gray-300 px-2 min-w-40">
      <AddNewItemModal />
      <div className="flex-col mt-8 gap-1.5">
        <h2 className="font-jersey text-2xl inline-block items-center mr-2 align-middle">
          Tags
        </h2>
        <AddNewTagModal />
        <div className="mt-2">
          {tagsArr?.map((i, k) => {
            return (
              <div
                key={k}
                style={{ backgroundColor: i.color }}
                className="w-full px-2 pt-2 pb-0.5 font-inter my-1 flex"
              >
                <h3 className="text-ellipsis overflow-hidden justify-end flex-1">
                  {i.title}
                </h3>
                <TagMenu tagId={i.id}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
