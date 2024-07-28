import * as React from 'react';
import {useEffect} from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';
import {RoadmapNewForm} from './routes/_form/roadmapNewForm';
import {FormError} from "~/mui/StyledForm";
import {useMatches} from "@remix-run/react";

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
  handleClose: () => void,
  open: boolean,
  formError: FormError | undefined
}> = (
  {
    handleClose,
    open,
    formError,
  }) => {
  const match = useMatches()
  useEffect(() => {
    handleClose()
  }, [match[match.length - 1].pathname]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display={"flex"} justifyContent={"right"}>
            <Button onClick={handleClose}>Close</Button>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            新規作成
          </Typography>
          <Box id="modal-modal-description" sx={{mt: 2}}>
            <RoadmapNewForm formError={formError}/>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NaviEditWithModal;
