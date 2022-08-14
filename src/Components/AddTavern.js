import * as React from "react";
import Popover from "@mui/material/Popover";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { AddBusiness } from "@mui/icons-material";

export default function AddTavern(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    props.handleAddTavern(event).catch((err) => setError(err));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const stopPropagation = (e) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "Home":
      case "End":
        break;
      default:
        e.stopPropagation();
    }
  };
  // const moveFocusToInput = (e) => {
  //   if (e.key === "Tab" || e.key === "ArrowRight") {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     filterRef.current.focus();
  //   }
  // };

  return (
    <div>
      <MenuItem aria-describedby={id} variant="contained" onClick={handleClick}>
        <ListItemIcon>
          <AddBusiness fontSize="small" />
        </ListItemIcon>
        Attune to a planar tavern.{" "}
      </MenuItem>
      <Popover
        PaperProps={{
          variant: "outlined",
          sx: { borderColor: "primary.dark" },
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            size="small"
            error={Boolean(error)}
            margin="normal"
            required
            fullWidth
            id={error ? "outlined-error-helper-text" : "tavern"}
            label={error ? "Error" : "Tavern Name"}
            helperText={error ? "You do not know this plane." : null}
            name="tavern"
            autoFocus
            onKeyDown={stopPropagation}
          />
          <Button type="submit" fullWidth>
            ATTUNE
          </Button>
        </Box>
      </Popover>
    </div>
  );
}
