import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Autocomplete } from '@mui/material';
import { fetchAddressSuggestions, addOrUpdateDepot } from './DepotAPI';
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

const DepotModal = ({ open, onClose, depot, setDepot, setDepots, isEditing }) => {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [addressInput, setAddressInput] = useState('');
  const debouncedAddressInput = useDebounce(addressInput, 1000);

  useEffect(() => {
    if (open) {
      setAddressInput(depot.address || '');
    }
  }, [open, depot.address]);

  useEffect(() => {
    if (debouncedAddressInput.trim().length < 3) {
      setAddressSuggestions([]);
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
    const updatedDepot = {
      ...depot,
      location: `${coordinates.lat},${coordinates.lng}`,
      geoPoint: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    };
    const savedDepot = await addOrUpdateDepot(updatedDepot);
    setDepots((prev) =>
      isEditing
        ? prev.map((d) => (d.id === depot.id ? savedDepot : d))
        : [...prev, savedDepot]
    );
    onClose();
  };

  const handleSelectAddress = (selectedOption) => {
    if (!selectedOption) {
      setCoordinates({ lat: '', lng: '' });
      return;
    }

    setDepot((prev) => ({ ...prev, address: selectedOption.label }));
    setCoordinates({ lat: selectedOption.lat, lng: selectedOption.lng });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">
          {isEditing ? 'Chỉnh sửa kho' : 'Thêm kho mới'}
        </Typography>
        <TextField
          label="Tên kho"
          value={depot.name}
          onChange={(e) => setDepot({ ...depot, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Trạng thái"
          value={depot.status}
          onChange={(e) => setDepot({ ...depot, status: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Autocomplete
          value={
            addressSuggestions.find((option) => option.label === addressInput) || {
              label: addressInput,
            }
          }
          options={addressSuggestions}
          inputValue={addressInput}
          onInputChange={(_, value) => setAddressInput(value)}
          onChange={(_, value) => handleSelectAddress(value)}
          getOptionLabel={(option) => option.label || ''}
          isOptionEqualToValue={(option, value) => option.label === value?.label}
          renderInput={(params) => (
            <TextField {...params} label="Địa chỉ" fullWidth margin="normal" />
          )}
        />
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

export default DepotModal;
