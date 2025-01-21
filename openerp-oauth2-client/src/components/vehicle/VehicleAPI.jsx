import { request } from "api";

export const fetchVehicles = async () => {
  return new Promise((resolve, reject) => {
    request(
      "get",
      "/vehicle/get-all",
      (res) => resolve(res.data),
      { onError: (err) => reject(err) }
    );
  });
};

export const fetchVehicleById = async (id) => {
  return new Promise((resolve, reject) => {
    request(
      "get",
      `/vehicle/get/${id}`,
      (res) => resolve(res.data),
      { onError: (err) => reject(err) }
    );
  });
};

export const deleteVehicle = async (id) => {
  return new Promise((resolve, reject) => {
    request(
      "delete",
      `/vehicle/delete/${id}`,
      () => resolve(),
      { onError: (err) => reject(err) }
    );
  });
};

export const addOrUpdateVehicle = async (vehicle) => {
  const url = "/vehicle/add";
  return new Promise((resolve, reject) => {
    request(
      "post",
      url,
      (res) => resolve(res.data),
      { onError: (err) => reject(err) },
      vehicle
    );
  });
};
