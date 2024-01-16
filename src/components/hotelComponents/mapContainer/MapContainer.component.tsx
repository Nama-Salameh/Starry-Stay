import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import style from "./MapContainer.module.css";
import { Button } from "@mui/material";

interface MapProps {
  latitude: number;
  longitude: number;
  onClose: () => void;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, onClose }) => {
  const mapRef = useRef<L.Map | null>(null);

  const toggleFullScreen = () => {
    onClose();
  };
  useEffect(() => {
    const mapContainer = document.getElementById("map");

    if (mapContainer && !mapRef.current) {
      const map = L.map("map").setView([latitude, longitude], 13);
      const locationIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      L.marker([latitude, longitude], { icon: locationIcon }).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en").addTo(map);


      mapRef.current = map;

      const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
          onClose();
        }
      };
      document.addEventListener("fullscreenchange", handleFullScreenChange);

      mapContainer.addEventListener("click", toggleFullScreen);

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
        document.removeEventListener(
          "fullscreenchange",
          handleFullScreenChange
        );
      };
    }
  }, [latitude, longitude, onClose]);

  return (
    <div id="map" className={style.mapContainer}>
      <div className={style.mapButtonContainer}>
        <Button className={style.closeButton} onClick={toggleFullScreen}>
          Close map
        </Button>
      </div>
    </div>
  );
};
export default Map;
