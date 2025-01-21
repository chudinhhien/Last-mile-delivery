import { request } from 'api';
import axios from 'axios';

// Lấy danh sách tất cả các depot
export const fetchDepots = async () => {
  return new Promise((resolve, reject) => {
    request(
      "get",
      "/depot/get-all",
      (res) => resolve(res.data),
      { onError: (err) => reject(err) }
    );
  });
};

// Lấy thông tin một depot theo ID
export const fetchDepotById = async (id) => {
  return new Promise((resolve, reject) => {
    request(
      "get",
      `/depot/get/${id}`,
      (res) => resolve(res.data),
      { onError: (err) => reject(err) }
    );
  });
};

// Thêm mới hoặc cập nhật một depot
export const addOrUpdateDepot = async (depot) => {
  const url = "/depot/add";
  return new Promise((resolve, reject) => {
    request(
      "post",
      url,
      (res) => resolve(res.data),
      { onError: (err) => reject(err) },
      depot
    );
  });
};

// Xóa một depot theo ID
export const deleteDepot = async (id) => {
  return new Promise((resolve, reject) => {
    request(
      "delete",
      `/depot/delete/${id}`,
      () => resolve(),
      { onError: (err) => reject(err) }
    );
  });
};

// Gợi ý địa chỉ dựa trên input
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
