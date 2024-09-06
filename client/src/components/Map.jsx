import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = ({ locations, className }) => {
  const mapRef = useRef(null);
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    if (mapRef.current && locations.length) {
      const map = mapRef.current;
      const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
      map.fitBounds(bounds);
    }
  }, [locations]);

  useEffect(() => {
    if (mapRef.current && activePopup) {
      const popup = mapRef.current._layers[activePopup];
      if (popup) {
        popup.openPopup();
      }
    }
  }, [activePopup]);

  return (
    <MapContainer
      className={className}
      style={{ height: "500px" }}
      center={[-27.05707429567691, -65.40457777895453]} // Centro inicial antes de ajustar
      zoom={15}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng]}
          eventHandlers={{
            click: () => {
              setActivePopup(`marker-${index}`);
            },
          }}
        >
          <Popup closeOnClick={false} closeButton={true}>
            <div className="text-center">
              <h3>Ubicación Pedrotti S.R.L</h3>
              <p>Sarmiento</p>
              <p>Congreso</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
