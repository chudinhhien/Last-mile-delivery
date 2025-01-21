import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { FaMap } from 'react-icons/fa6';
import { deleteDepot, fetchDepots } from 'components/depot/DepotAPI';
import DepotTable from 'components/depot/DepotTable';
import DepotModal from 'components/depot/DepotModal';
import MapModal from 'components/map/MapModal';

const DepotScreen = () => {
  const [depots, setDepots] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [newDepot, setNewDepot] = useState({ name: '', status: '', address: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadDepots = async () => {
      const data = await fetchDepots();
      setDepots(data);
    };
    loadDepots();
  }, []);

  const handleAddNew = () => {
    setNewDepot({ name: '', status: '', address: '', location: '' }); // Reset giá trị kho mới
    setIsEditing(false); // Đặt trạng thái là thêm mới
    setOpenModal(true); // Mở modal
  };

  const handleEdit = (depot) => {
    setNewDepot(depot); // Đặt kho cần chỉnh sửa
    setIsEditing(true); // Đặt trạng thái là chỉnh sửa
    setOpenModal(true); // Mở modal
  };

  const handleDelete = async (depot) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa kho: ${depot.name}?`)) {
      await deleteDepot(depot.id);
      setDepots((prev) => prev.filter((d) => d.id !== depot.id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Quản lý kho
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' }, marginRight: '10px' }}
          startIcon={<FaMap />}
          onClick={() => setOpenMap(true)}
        >
          Map
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleAddNew()}>
          Thêm mới
        </Button>
      </div>
      <DepotTable depots={depots} onEdit={handleEdit} onDelete={handleDelete} />
      <DepotModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        depot={newDepot}
        setDepot={setNewDepot}
        setDepots={setDepots}
        isEditing={isEditing} // Truyền trạng thái vào modal
      />
      <MapModal open={openMap} onClose={() => setOpenMap(false)} />
    </div>
  );
};

export default DepotScreen;
