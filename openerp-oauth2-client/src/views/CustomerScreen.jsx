import React, { useEffect, useState } from 'react';
import { StandardTable } from 'erp-hust/lib/StandardTable';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, Modal, Box, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { request } from 'api';

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

const CustomerScreen = () => {
  const history = useHistory();
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    status: '',
    address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      request("get", "/customer/get-all", (res) => {
        setCustomers(res.data);
      }).then();
    };

    fetchData();
  }, []);

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Tên khách hàng', field: 'name' },
    { title: 'Trạng thái', field: 'status' },
    { title: 'Địa chỉ', field: 'address' },
    {
      title: 'Chỉnh sửa',
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleEdit(rowData)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    {
      title: 'Xóa',
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleDelete(rowData)} color="secondary">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleEdit = (row) => {
    setNewCustomer({
      name: row.name,
      status: row.status,
      address: row.address,
      id: row.id,
    });
    setOpenModal(true);
  };

  const handleDelete = (row) => {
    const deleteCustomer = async () => {
      request(
        "delete",
        `/customer/delete/${row.id}`,
        (res) => {
          console.log(`Deleted customer ${row.name}`);
          setCustomers((prev) => prev.filter((customer) => customer.id !== row.id));
        },
        {},
        {}
      ).then();
    };
    if (window.confirm(`Bạn có chắc chắn muốn xóa khách hàng: ${row.name}?`)) {
      deleteCustomer();
    }
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setNewCustomer({ name: '', status: '', address: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditCustomer = () => {
    const apiEndpoint = "/customer/add";
    request(
      "post",
      apiEndpoint,
      (res) => {
        console.log(res);

        if (newCustomer.id) {
          setCustomers((prev) =>
            prev.map((customer) =>
              customer.id === newCustomer.id ? res.data : customer
            )
          );
        } else {
          setCustomers((prev) => [...prev, res.data]);
        }
      },
      {},
      newCustomer
    ).then();

    handleModalClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Quản lý khách hàng
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleModalOpen}>
          Thêm mới
        </Button>
      </div>
      <StandardTable
        title="Danh sách khách hàng"
        columns={columns}
        data={customers}
        options={{
          selection: false,
          pageSize: 10,
          search: true,
          sorting: true,
        }}
      />
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {newCustomer.id ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
          </Typography>
          <TextField
            label="Tên khách hàng"
            name="name"
            value={newCustomer.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Trạng thái"
            name="status"
            value={newCustomer.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Địa chỉ"
            name="address"
            value={newCustomer.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleAddOrEditCustomer}>
              {newCustomer.id ? "Cập nhật" : "Thêm"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleModalClose} style={{ marginLeft: '10px' }}>
              Hủy
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomerScreen;
