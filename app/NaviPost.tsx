import * as React from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';
import {RoadmapNewForm} from './routes/_form/roadmapNewForm';
import {action} from "~/routes/roadmap.new";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 9999,
};
const NaviEditWithModal: React.FC<{
  handleOpen: () => void,
  handleClose: () => void,
  open: boolean
}> = (
  {
    handleClose,
    handleOpen,
    open,
  }) => {
  return (
    <div>
      <Button onClick={handleOpen} sx={{
        color: "black",
        fontSize: '15px',
      }}>新規作成</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            新規作成
          </Typography>
          <Box id="modal-modal-description" sx={{mt: 2}}>
            <RoadmapNewForm<typeof action>/>
          </Box>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default NaviEditWithModal;
