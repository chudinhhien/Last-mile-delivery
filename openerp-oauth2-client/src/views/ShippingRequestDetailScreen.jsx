import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const ShippingRequestDetailScreen = () => {
  const { id } = useParams(); // Lấy `id` từ URL
  const history = useHistory();

  // Ví dụ dữ liệu (thay thế bằng dữ liệu thực tế từ API)
  const mockData = {
    1: { name: 'Yêu cầu vận chuyển 1', status: 'Chờ xử lý', details: 'Chi tiết cho yêu cầu 1' },
    2: { name: 'Yêu cầu vận chuyển 2', status: 'Đang giao', details: 'Chi tiết cho yêu cầu 2' },
    3: { name: 'Yêu cầu vận chuyển 3', status: 'Hoàn tất', details: 'Chi tiết cho yêu cầu 3' },
  };

  const requestDetail = mockData[id] || { name: 'Không tìm thấy', status: 'N/A', details: 'Không có chi tiết' };

  console.log('requestDetail', requestDetail);
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Chi tiết yêu cầu vận chuyển - ID: {id}
      </Typography>
      <Typography variant="body1">
        Tên: {requestDetail.name}
      </Typography>
      <Typography variant="body1">
        Trạng thái: {requestDetail.status}
      </Typography>
      <Typography variant="body1">
        Chi tiết: {requestDetail.details}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push('/shipping-request-manage')}
        style={{ marginTop: '10px' }}
      >
        Quay lại danh sách
      </Button>
    </div>
  );
};

export default ShippingRequestDetailScreen;
