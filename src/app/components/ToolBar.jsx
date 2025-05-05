import React from "react";
import AddNewItemModal from "./modals/AddNewItemModal";
import { Plus } from "lucide-react";
import AddNewTagModal from "./modals/AddNewTagModal";
export default function ToolBar() {
  return (
    <div className="w-50 h-vh pt-8 border-r-[1px] border-gray-300 px-4">
      <AddNewItemModal />
      <div className="flex mt-6 gap-1.5">
        <h2 className="font-jersey text-2xl inline-block items-center mr-2">
          Tags
        </h2>
        <AddNewTagModal />
      </div>
    </div>
  );
}
