import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { deleteVehicle, fetchVehicles } from 'components/vehicle/VehicleAPI';
import VehicleTable from 'components/vehicle/VehicleTable';
import VehicleModal from 'components/vehicle/VehicleModal';
import MapModal from 'components/map/MapModal';

const VehicleScreen = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ id: '', capacity: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Load danh sách phương tiện từ API
  useEffect(() => {
    const loadVehicles = async () => {
      const data = await fetchVehicles();
      setVehicles(data);
    };
    loadVehicles();
  }, []);

  // Xử lý thêm mới phương tiện
  const handleAddNew = () => {
    setNewVehicle({ id: '', capacity: '', status: '' }); // Reset dữ liệu phương tiện mới
    setIsEditing(false); // Đặt trạng thái là thêm mới
    setOpenModal(true); // Mở modal
  };

  // Xử lý chỉnh sửa phương tiện
  const handleEdit = async (vehicle) => {
    setNewVehicle(vehicle); // Đặt phương tiện cần chỉnh sửa
    setIsEditing(true); // Đặt trạng thái là chỉnh sửa
    setOpenModal(true); // Mở modal
  };

  // Xử lý xóa phương tiện
  const handleDelete = async (vehicle) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa phương tiện: ${vehicle.id}?`)) {
      await deleteVehicle(vehicle.id);
      setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Quản lý phương tiện
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={() => handleAddNew()}>
          Thêm mới
        </Button>
      </div>
      <VehicleTable vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} />
      <VehicleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        vehicle={newVehicle}
        setVehicle={setNewVehicle}
        setVehicles={setVehicles}
        isEditing={isEditing} // Truyền trạng thái vào modal
      />
      <MapModal open={openMap} onClose={() => setOpenMap(false)} />
    </div>
  );
};

export default VehicleScreen;
