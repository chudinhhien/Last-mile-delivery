import React from 'react';
import { Modal, Box } from '@mui/material';
import MapComponent from 'components/map/MapComponent';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const MapModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={modalStyle}>
      <MapComponent style={{ width: '100%', height: '100%' }} />
    </Box>
  </Modal>
);

export default MapModal;
