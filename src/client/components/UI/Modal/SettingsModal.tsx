import React, { ReactNode } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton, Modal } from "@material-ui/core";

interface Props {
  children: ReactNode;
}

const SettingsModal = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <IconButton
        color="secondary"
        aria-label="upload picture"
        component="span"
        onClick={() => handleOpen()}
      >
        <SettingsIcon />
      </IconButton>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        {props.children}
      </Modal>
    </div>
  );
};

export default SettingsModal;
