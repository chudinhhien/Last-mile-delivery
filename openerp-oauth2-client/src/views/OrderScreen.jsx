import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addOrUpdateOrder, deleteOrder, fetchOrders } from 'components/order/OrderAPI';
import OrderTable from 'components/order/OrderTable';
import OrderModal from 'components/order/OrderModal';
import { fetchCustomers } from 'components/customer/CustomerAPI';
import { fetchDepots } from 'components/depot/DepotAPI';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]); // Fetch customers từ API khác
  const [depots, setDepots] = useState([]); // Fetch depots từ API khác
  const [openModal, setOpenModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: '',
    customerId: '',
    status: '',
    weight: '',
    volumn: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // Lấy danh sách khách hàng, kho và đơn hàng
      const customerData = await fetchCustomers();
      const depotData = await fetchDepots();
      const orderData = await fetchOrders();

      // Ánh xạ tên khách hàng và kho vào danh sách đơn hàng
      const mappedOrders = orderData.map((order) => {
        const customer = customerData.find((c) => c.id === order.customerId);
        const depot = depotData.find((d) => d.id === order.depotId);

        return {
          ...order,
          customerName: customer ? customer.name : 'Unknown Customer',
          depotName: depot ? depot.name : 'Unknown Depot',
        };
      });

      setOrders(mappedOrders);
      setCustomers(customerData);
      setDepots(depotData);
    };

    loadData();
  }, []);

  const handleAddNew = () => {
    setNewOrder({ id: '', customerId: '', status: '', weight: '', volumn: '' });
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleEdit = (row) => {
    setNewOrder(row);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Are you sure you want to delete order ${row.id}?`)) {
      await deleteOrder(row.id);
      setOrders((prev) => prev.filter((order) => order.id !== row.id));
    }
  };

  const handleAddOrUpdateOrder = async () => {
    const savedOrder = await addOrUpdateOrder(newOrder); // Gọi API thêm hoặc sửa đơn hàng
  
    // Lấy tên khách hàng và kho tương ứng
    const customer = customers.find((c) => c.id === savedOrder.customerId);
    const depot = depots.find((d) => d.id === savedOrder.depotId);
  
    // Cập nhật tên khách hàng và kho vào order
    const updatedOrder = {
      ...savedOrder,
      customerName: customer ? customer.name : 'Unknown Customer',
      depotName: depot ? depot.name : 'Unknown Depot',
    };
  
    // Cập nhật vào danh sách orders
    setOrders((prev) => {
      if (isEditing) {
        return prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o));
      }
      return [...prev, updatedOrder];
    });
  
    setOpenModal(false) ;// Đóng modal
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Quản lý đơn hàng
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddNew}>
          Thêm mới
        </Button>
      </div>

      <OrderTable orders={orders} onEdit={handleEdit} onDelete={handleDelete} />
      <OrderModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        order={newOrder}
        setOrder={setNewOrder}
        onSubmit={handleAddOrUpdateOrder}
        customers={customers}
        depots={depots}
        isEditing={isEditing}
      />
    </div>
  );
};

export default OrderScreen;
