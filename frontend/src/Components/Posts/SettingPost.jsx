import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ModifyPost from "./ModifyPost";
import DeletePost from "./DeletePost";

export default function SettingPost(id) {
  const PostId = id.id;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          position: "absolute"
        }}
      >
        <i
          class="fa-solid fa-pen-to-square fa-2x"
          style={{
            marginTop: "15px",
            zIndex: "1",
            backgroundColor: "white",
            color: "black",
            borderRadius: "8px"
          }}
        ></i>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem>
          <ModifyPost id={PostId} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeletePost id={PostId} />
        </MenuItem>
      </Menu>
    </div>
  );
}
