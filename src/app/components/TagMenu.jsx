import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { EllipsisVertical } from "lucide-react";
import useTagStore from "../store/useTagStore";

export default function TagMenu({ tagId, setShowTagModal }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { deleteDashboardTag, setTagIdToEdit } = useTagStore();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setTagIdToEdit(tagId);
    setShowTagModal(true);
    handleClose();
  };
  const handleDelete = () => {
    deleteDashboardTag(tagId);
    handleClose();
  };
  return (
    <div className="text-black w-fit">
      <button
        id="more-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="cursor-pointer transition-all duration-300 ease-in-out hover:text-gray-400"
      >
        <EllipsisVertical />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
      >
        <MenuItem onClick={handleEdit}>
          <p className="font-inter text-sm">Edit</p>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <p className="font-inter text-sm">Delete</p>
        </MenuItem>
      </Menu>
    </div>
  );
}
