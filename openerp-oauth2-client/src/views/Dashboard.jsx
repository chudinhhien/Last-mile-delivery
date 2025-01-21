import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import MapComponent from 'components/map/MapComponent';

// Dữ liệu mẫu
const overviewData = [
  { title: 'Tổng đơn hàng', value: 120, color: '#1976d2' },
  { title: 'Khách hàng mới', value: 15, color: '#4caf50' },
  { title: 'Kho hoạt động', value: 5, color: '#ff9800' },
  { title: 'Đơn hàng bị hủy', value: 8, color: '#f44336' },
];

const pieData = [
  { name: 'Đã giao', value: 80 },
  { name: 'Đang giao', value: 30 },
  { name: 'Hủy', value: 10 },
];

const revenueData = [
  { day: 'Mon', revenue: 2 },
  { day: 'Tue', revenue: 4 },
  { day: 'Wed', revenue: 3 },
  { day: 'Thu', revenue: 5 },
  { day: 'Fri', revenue: 7 },
  { day: 'Sat', revenue: 6 },
  { day: 'Sun', revenue: 4 },
];

const Dashboard = () => {
  return (
    <Box>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard Logistics
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Overview Section */}
        <Grid container spacing={3}>
          {overviewData.map((data, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ color: data.color }}>
                    {data.value}
                  </Typography>
                  <Typography variant="subtitle1">{data.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Charts Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}> {/* Thêm height */}
              <CardHeader title="Trạng thái đơn hàng" />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <PieChart width={350} height={350}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? '#4caf50' : index === 1 ? '#ff9800' : '#f44336'}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    wrapperStyle={{
                      marginTop: 20,
                      fontSize: 14,
                    }}
                  />
                </PieChart>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}> {/* Đồng bộ height */}
              <CardHeader title="Số đơn hàng theo ngày" />
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center', // Căn giữa biểu đồ
                  alignItems: 'center',
                  height: '100%', // Đồng bộ chiều cao
                }}
              >
                <LineChart width={400} height={300} data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#1976d2" />
                </LineChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Map Section */}
        <Card>
          <CardHeader title="Bản đồ" />
          <CardContent sx={{ height: 400 }}>
            <MapComponent style={{ width: '100%', height: '100%' }} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
