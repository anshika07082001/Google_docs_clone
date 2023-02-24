import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ModalComp from "./ModalComp";

const Main = () => {
  var [open, setOpen] = useState(false);
  const openModal = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="container">
      <Typography variant="h3">Google Docs Clone</Typography>
      <Button variant="contained" onClick={openModal}>
        Create New File
      </Button>
      <ModalComp open={open} openModal={openModal} />
    </div>
  );
};

export default Main;
