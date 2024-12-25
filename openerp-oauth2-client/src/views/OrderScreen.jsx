import React, { useEffect, useState } from 'react';
import { StandardTable } from 'erp-hust/lib/StandardTable';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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

const OrderScreen = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]); // State to hold customers list
  const [openModal, setOpenModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: '',
    customerId: '',
    customerName: '',
    status: '',
    weight: '',
    volumn: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      request("get", "/order/get-all", (res) => {
        setOrders(res.data);
      }).then();
    };

    const fetchCustomers = async () => {
      request("get", "/customer/get-all", (res) => {
        setCustomers(res.data);
      }).then();
    };

    fetchOrders();
    fetchCustomers();
  }, []);

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Customer Name', field: 'customerName' },
    { title: 'Status', field: 'status' },
    { title: 'Weight', field: 'weight' },
    { title: 'Volumn', field: 'volumn' },
    {
      title: 'Edit',
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleEdit(rowData)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    {
      title: 'Delete',
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleDelete(rowData)} color="secondary">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleEdit = (row) => {
    setIsEditing(true);
    setNewOrder({
      id: row.id,
      customerId: row.customerId,
      customerName: row.customerName,
      status: row.status,
      weight: row.weight,
      volumn: row.volumn,
    });
    setOpenModal(true);
  };

  const handleDelete = (row) => {
    alert(`Deleting order with ID: ${row.id}`);
    // Add functionality for deleting an order
  };

  const handleModalOpen = () => {
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setNewOrder({ id: '', customerId: '', customerName: '', status: '', weight: '', volumn: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateOrder = () => {
    if (isEditing) {
      const updateOrder = async () => {
        request("put", `/order/update/${newOrder.id}`, (res) => {
          setOrders((prev) =>
            prev.map((order) => (order.id === newOrder.id ? res.data : order))
          );
        }, {}, newOrder).then();
      };
      updateOrder();
    } else {
      const addOrder = async () => {
        request("post", "/order/add", (res) => {
          setOrders((prev) => [...prev, res.data]);
        }, {}, newOrder).then();
      };
      addOrder();
    }
    handleModalClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleModalOpen}>
          Add New
        </Button>
      </div>
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
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {isEditing ? 'Edit Order' : 'Add New Order'}
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Customer Name</InputLabel>
            <Select
              name="customerId"
              value={newOrder.customerId}
              onChange={handleInputChange}
              label="Customer Name"
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Status"
            name="status"
            value={newOrder.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Weight"
            name="weight"
            value={newOrder.weight}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Volumn"
            name="volumn"
            value={newOrder.volumn}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleAddOrUpdateOrder}>
              {isEditing ? 'Update' : 'Add'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleModalClose} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default OrderScreen;
