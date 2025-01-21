import { request } from 'api';

export const fetchOrders = async () => {
  return new Promise((resolve, reject) => {
    request(
      "get",
      "/order/get-all",
      (res) => resolve(res.data),
      { onError: (err) => reject(err) }
    );
  });
};

export const addOrUpdateOrder = async (order) => {
  const url = "/order/add";
  const method = "post";
  return new Promise((resolve, reject) => {
    request(
      method,
      url,
      (res) => resolve(res.data),
      { onError: (err) => reject(err) },
      order
    );
  });
};

export const deleteOrder = async (id) => {
  return new Promise((resolve, reject) => {
    request(
      "delete",
      `/order/delete/${id}`,
      () => resolve(),
      { onError: (err) => reject(err) }
    );
  });
};
