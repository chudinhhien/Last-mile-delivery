import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { addOrUpdateVehicle } from './VehicleAPI';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const VehicleModal = ({ open, onClose, vehicle, setVehicle, setVehicles, isEditing }) => {
  const [localVehicle, setLocalVehicle] = useState({
    id: '',
    capacity: '',
    status: '',
  });

  // Cập nhật state khi `vehicle` thay đổi
  useEffect(() => {
    if (vehicle) {
      setLocalVehicle(vehicle);
    } else {
      setLocalVehicle({ id: '', capacity: '', status: '' });
    }
  }, [vehicle]);

  const handleChange = (field, value) => {
    setLocalVehicle((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const savedVehicle = await addOrUpdateVehicle(localVehicle);
    setVehicles((prev) =>
      isEditing
        ? prev.map((v) => (v.id === savedVehicle.id ? savedVehicle : v)) // Cập nhật phương tiện
        : [...prev, savedVehicle] // Thêm mới phương tiện
    );
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">{isEditing ? 'Chỉnh sửa phương tiện' : 'Thêm phương tiện mới'}</Typography>
        <TextField
          label="Sức chứa (Capacity)"
          type="number"
          value={localVehicle.capacity}
          onChange={(e) => handleChange('capacity', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Trạng thái"
          value={localVehicle.status}
          onChange={(e) => handleChange('status', e.target.value)}
          fullWidth
          margin="normal"
          select
        >
          <MenuItem value="ACTIVE">Hoạt động</MenuItem>
          <MenuItem value="INACTIVE">Ngừng hoạt động</MenuItem>
        </TextField>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {isEditing ? 'Lưu' : 'Thêm mới'}
          </Button>
          <Button variant="outlined" onClick={onClose} sx={{ ml: 1 }}>
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default VehicleModal;
