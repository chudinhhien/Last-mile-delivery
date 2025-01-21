import { request } from 'api';
import axios from 'axios';

export const fetchCustomers = async () => {
  return new Promise((resolve, reject) => {
    request(
      "get",
      "/customer/get-all",
      (res) => resolve(res.data),
      { onError: (err) => reject(err) }
    );
  });
};

export const deleteCustomer = async (id) => {
  return new Promise((resolve, reject) => {
    request(
      "delete",
      `/customer/delete/${id}`,
      () => resolve(),
      { onError: (err) => reject(err) }
    );
  });
};

export const addOrUpdateCustomer = async (customer) => {
  const url = "/customer/add";
  return new Promise((resolve, reject) => {
    request(
      "post",
      url,
      (res) => resolve(res.data),
      { onError: (err) => reject(err) },
      customer
    );
  });
};

export const fetchAddressSuggestions = async (address) => {
  if (!address || address.trim().length < 3) {
    return []; // Không gọi API nếu input rỗng hoặc ngắn
  }

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        addressdetails: 1,
        countrycodes: 'vn',
        limit: 8,
      },
    });

    // Trả về danh sách gồm địa chỉ và tọa độ
    return response.data.map((item) => ({
      label: item.display_name, // Tên địa chỉ
      lat: parseFloat(item.lat), // Vĩ độ
      lng: parseFloat(item.lon), // Kinh độ
    }));
  } catch (error) {
    console.error('Error fetching address suggestions:', error);
    throw error;
  }
};
