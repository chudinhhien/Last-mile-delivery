import React, { useEffect, useState } from 'react';
import { request } from "../api"; // Thay thế bằng API thực tế hoặc giữ dữ liệu giả lập
import { StandardTable } from "erp-hust/lib/StandardTable";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import keycloak from 'config/keycloak';

const ShippingRequestManageScreen = () => {
  const history = useHistory();
  const [requests, setRequests] = useState([]);

  // Giả lập dữ liệu yêu cầu vận chuyển (hoặc thay thế bằng API)
  useEffect(() => {
    const fetchData = async () => {
      // Dữ liệu giả lập
      const mockData = [
        { id: 1, name: 'Yêu cầu vận chuyển 1', status: 'Chờ xử lý' },
        { id: 2, name: 'Yêu cầu vận chuyển 2', status: 'Đang giao' },
        { id: 3, name: 'Yêu cầu vận chuyển 3', status: 'Hoàn tất' },
      ];
      setRequests(mockData);
    };

    fetchData();
  }, []);

  console.log(keycloak.token);

  // Cấu hình các cột cho StandardTable
  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Tên yêu cầu",
      field: "name",
    },
    {
      title: "Trạng thái",
      field: "status",
    },
    {
      title: "Chỉnh sửa",
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleEdit(rowData)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    {
      title: "Xóa",
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleDelete(rowData)} color="secondary">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  // Các hàm xử lý hành động
  const handleEdit = (row) => {
    alert(`Chỉnh sửa yêu cầu: ${row.name}`);
  };

  const handleDelete = (row) => {
    alert(`Xóa yêu cầu: ${row.name}`);
  };

  // Hàm điều hướng đến trang chi tiết khi click vào hàng
  const handleRowClick = (id) => {
    history.push(`/shipping-request-manage/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Quản lý yêu cầu vận chuyển
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Thêm mới
        </Button>
      </div>
      <StandardTable
        title="Danh sách yêu cầu vận chuyển"
        columns={columns}
        data={requests}
        options={{
          selection: false,
          pageSize: 10,
          search: true,
          sorting: true,
        }}
        onRowClick={(event, rowData) => handleRowClick(rowData.id)}
      />
    </div>
  );
};

export default ShippingRequestManageScreen;
