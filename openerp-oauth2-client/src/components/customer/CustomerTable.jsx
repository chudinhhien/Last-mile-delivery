import React from 'react';
import { IconButton, Chip } from '@mui/material';
import { StandardTable } from 'erp-hust/lib/StandardTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Tên khách hàng', field: 'name' },
    {
      title: 'Trạng thái',
      field: 'status',
      render: (rowData) => (
        <Chip
          label={rowData.status === 'ABLED' ? 'Hoạt động' : 'Ngừng hoạt động'}
          color={rowData.status === 'ABLED' ? 'success' : 'default'}
        />
      ),
    },
    { title: 'Địa chỉ', field: 'address' },
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
    }    
  ];

  return (
    <StandardTable
      title="Danh sách khách hàng"
      columns={columns}
      data={customers}
      options={{ selection: false, pageSize: 10, search: true, sorting: true }}
    />
  );
};

export default CustomerTable;
