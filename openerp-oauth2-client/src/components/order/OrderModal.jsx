import React from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const OrderModal = ({ open, onClose, order, setOrder, onSubmit, customers, depots, isEditing }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          {isEditing ? 'Sửa đơn hàng' : 'Thêm đơn hàng mới'}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Tên khách hàng</InputLabel>
          <Select
            name="customerId"
            value={order.customerId}
            onChange={handleInputChange}
            label="Customer Name"
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Kho hàng</InputLabel>
          <Select
            name="depotId"
            value={order.depotId}
            onChange={handleInputChange}
            label="Depot Name"
          >
            {depots.map((depot) => (
              <MenuItem key={depot.id} value={depot.id}>
                {depot.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Trạng thái"
          name="status"
          value={order.status}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Số lượng"
          name="weight"
          value={order.weight}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Thể tích"
          name="volumn"
          value={order.volumn}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            {isEditing ? 'Sửa' : 'Thêm mới'}
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: 'red',
              borderColor: 'red',
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderColor: 'red', // Giữ viền đỏ khi hover
              },
              '&:focus-visible': {
                outline: 'none', // Loại bỏ viền xanh khi focus
              },
            }}
            onClick={onClose}
            style={{ marginLeft: '10px' }}
          >
            Hủy
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default OrderModal;
