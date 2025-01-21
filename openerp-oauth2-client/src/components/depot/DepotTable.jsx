import React from 'react';
import { IconButton, Chip } from '@mui/material';
import { StandardTable } from 'erp-hust/lib/StandardTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DepotTable = ({ depots, onEdit, onDelete }) => {
  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Tên kho', field: 'name' },
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
    { title: 'Địa chỉ', field: 'address' },
    {
      title: 'Vị trí',
      field: 'location',
      render: (rowData) => (
        <span>{rowData.location || 'Không có tọa độ'}</span>
      ),
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
      title="Danh sách kho"
      columns={columns}
      data={depots}
      options={{ selection: false, pageSize: 10, search: true, sorting: true }}
    />
  );
};

export default DepotTable;
