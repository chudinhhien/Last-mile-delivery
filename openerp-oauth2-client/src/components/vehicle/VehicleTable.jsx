import React from 'react';
import { IconButton, Chip } from '@mui/material';
import { StandardTable } from 'erp-hust/lib/StandardTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const VehicleTable = ({ vehicles, onEdit, onDelete }) => {
  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Sức chứa (Capacity)', field: 'capacity' },
    {
      title: 'Trạng thái',
      field: 'status',
      render: (rowData) => (
        <Chip
          label={rowData.status === 'ACTIVE' ? 'Hoạt động' : 'Ngừng hoạt động'}
          color={rowData.status === 'ACTIVE' ? 'success' : 'default'}
        />
      ),
    },
    {
      title: 'Ngày cập nhật',
      field: 'last_updated_stamp',
      render: (rowData) =>
        rowData.last_updated_stamp
          ? new Date(rowData.last_updated_stamp).toLocaleString()
          : 'Chưa cập nhật',
    },
    {
      title: 'Chỉnh sửa',
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => onEdit(rowData)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    {
      title: 'Xóa',
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => onDelete(rowData)} style={{ color: 'red' }}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <StandardTable
      title="Danh sách phương tiện"
      columns={columns}
      data={vehicles}
      options={{ selection: false, pageSize: 10, search: true, sorting: true }}
    />
  );
};

export default VehicleTable;
