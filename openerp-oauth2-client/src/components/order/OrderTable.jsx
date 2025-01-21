import React from 'react';
import { StandardTable } from 'erp-hust/lib/StandardTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderTable = ({ orders, onEdit, onDelete }) => {
  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Tên khách hàng', field: 'customerName' },
    { title: 'Kho hàng', field: 'depotName' },
    { title: 'Trạng thái', field: 'status' },
    { title: 'Trọng lượng', field: 'weight' },
    { title: 'Thể tích', field: 'volumn' },
    {
      title: 'Sửa',
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
        <IconButton onClick={() => onDelete(rowData)} color="secondary">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <StandardTable
      title="Orders List"
      columns={columns}
      data={orders}
      options={{
        selection: false,
        pageSize: 10,
        search: true,
        sorting: true,
      }}
    />
  );
};

export default OrderTable;
