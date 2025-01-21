import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Autocomplete } from '@mui/material';
import { addOrUpdateCustomer, fetchAddressSuggestions } from './CustomerAPI';
import useDebounce from 'hooks/useDebounce';

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

const CustomerModal = ({ open, onClose, customer, setCustomer, setCustomers, isEditing }) => {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [addressInput, setAddressInput] = useState(''); // Trạng thái input trực tiếp
  const debouncedAddressInput = useDebounce(addressInput, 1000); // Giá trị debounce

  // Đồng bộ `addressInput` với `customer.address` khi mở modal
  useEffect(() => {
    if (open) {
      setAddressInput(customer.address || ''); // Chỉ chạy khi modal mở
    }
  }, [open, customer.address]);

  // Xử lý gợi ý địa chỉ dựa trên `debouncedAddressInput`
  useEffect(() => {
    if (debouncedAddressInput.trim().length < 3) {
      setAddressSuggestions([]); // Không gợi ý nếu quá ngắn
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const suggestions = await fetchAddressSuggestions(debouncedAddressInput);
        setAddressSuggestions(suggestions);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [debouncedAddressInput]);

  const handleSave = async () => {
    const updatedCustomer = {
      ...customer,
      location: `${coordinates.lat},${coordinates.lng}`, // Lưu location
      geoPoint: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    };
    const savedCustomer = await addOrUpdateCustomer(updatedCustomer);
    setCustomers((prev) =>
      isEditing
        ? prev.map((c) => (c.id === customer.id ? savedCustomer : c)) // Cập nhật khách hàng
        : [...prev, savedCustomer] // Thêm mới khách hàng
    );
    onClose();
  };

  const handleSelectAddress = (selectedOption) => {
    if (!selectedOption) {
      setCoordinates({ lat: '', lng: '' });
      return;
    }

    setCustomer((prev) => ({ ...prev, address: selectedOption.label })); // Cập nhật địa chỉ
    setCoordinates({ lat: selectedOption.lat, lng: selectedOption.lng }); // Lấy tọa độ từ gợi ý
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">{isEditing ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng mới'}</Typography>
        <TextField
          label="Tên khách hàng"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Trạng thái"
          value={customer.status}
          onChange={(e) => setCustomer({ ...customer, status: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Autocomplete
          value={
            addressSuggestions.find((option) => option.label === addressInput) || {
              label: addressInput,
            }
          } // Hiển thị giá trị hiện tại hoặc mặc định
          options={addressSuggestions}
          inputValue={addressInput} // Đồng bộ giá trị nhập vào
          onInputChange={(_, value) => setAddressInput(value)} // Cập nhật khi người dùng nhập
          onChange={(_, value) => handleSelectAddress(value)} // Cập nhật khi người dùng chọn
          getOptionLabel={(option) => option.label || ''} // Hiển thị tên địa chỉ
          isOptionEqualToValue={(option, value) => option.label === value?.label} // So sánh option và value
          renderInput={(params) => (
            <TextField {...params} label="Địa chỉ" fullWidth margin="normal" />
          )}
        />

        {/* <Typography variant="body2">Tọa độ: {coordinates.lat}, {coordinates.lng}</Typography> */}
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

export default CustomerModal;
