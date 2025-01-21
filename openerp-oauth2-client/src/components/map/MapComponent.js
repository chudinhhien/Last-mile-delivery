import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import osm from './osm-provider';
import 'leaflet/dist/leaflet.css';
import './index.css';
import { fetchCustomers } from "components/customer/CustomerAPI";
import { fetchDepots } from "components/depot/DepotAPI";

const markerIcon = new L.Icon({
  iconUrl: require('../../assets/icons/placeholder.png'),
  iconSize: [25, 30],
  iconAnchor: [12, 30],
  popupAnchor: [0, -30],
});
const depotIcon = new L.Icon({
  iconUrl: require('../../assets/icons/warehouse.png'),
  iconSize: [30, 40],
  iconAnchor: [12, 30],
  popupAnchor: [0, -30],
});

// Component phụ để di chuyển bản đồ đến vị trí hiện tại
const MoveMapToCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const MapComponent = () => {
  const [customers, setCustomers] = useState([]); // Danh sách khách hàng
  const [depots, setDepots] = useState([]); // Danh sách kho
  const [center, setCenter] = useState({ lat: 21.028511, lng: 105.804817 }); // Vị trí mặc định: Hà Nội
  const [userLocation, setUserLocation] = useState(null); // Vị trí của người dùng
  const ZOOM_LEVEL = 15;

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoords = { lat: latitude, lng: longitude };
          setUserLocation(userCoords);
          setCenter(userCoords);
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí hiện tại: ", error);
        }
      );
    } else {
      console.error("Trình duyệt không hỗ trợ Geolocation.");
    }
  };

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers();
      const validCustomers = data
        .filter((customer) => customer.location)
        .map((customer) => {
          const [lat, lng] = customer.location.split(",").map(Number);
          return {
            ...customer,
            geoPoint: { latitude: lat, longitude: lng },
          };
        });
      setCustomers(validCustomers);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
    }
  };

  const loadDepots = async () => {
    try {
      const data = await fetchDepots();
      const validDepots = data
        .filter((depot) => depot.location)
        .map((depot) => {
          const [lat, lng] = depot.location.split(",").map(Number);
          return {
            ...depot,
            geoPoint: { latitude: lat, longitude: lng },
          };
        });
      setDepots(validDepots);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách kho:", error);
    }
  };

  useEffect(() => {
    fetchUserLocation();
    loadCustomers();
    loadDepots();
  }, []);

  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ width: '100%', height: '100%' }}>
      <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />

      {/* Di chuyển bản đồ đến trung tâm */}
      <MoveMapToCenter center={center} />

      {/* Hiển thị marker cho vị trí của người dùng */}
      {userLocation && (
        <Marker position={userLocation} icon={markerIcon}>
          <Popup>
            <span>Vị trí của bạn</span>
          </Popup>
        </Marker>
      )}

      {/* Hiển thị marker cho mỗi khách hàng */}
      {customers.map((customer) => (
        <Marker
          key={customer.id}
          position={{
            lat: customer.geoPoint.latitude,
            lng: customer.geoPoint.longitude,
          }}
          icon={markerIcon}
        >
          <Popup>
            <div>
              <strong>{customer.name}</strong>
              <br />
              {customer.address}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Hiển thị marker cho mỗi kho */}
      {depots.map((depot) => (
        <Marker
          key={depot.id}
          position={{
            lat: depot.geoPoint.latitude,
            lng: depot.geoPoint.longitude,
          }}
          icon={depotIcon}
        >
          <Popup>
            <div>
              <strong>{depot.name}</strong>
              <br />
              {depot.address}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
