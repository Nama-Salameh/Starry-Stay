import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import style from '../../../pages/hotel/Hotel.module.css'
interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<L.Map | null>(null);

  const toggleFullScreen = () => {
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      if (!document.fullscreenElement) {
        mapContainer.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
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
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      mapRef.current = map;

      const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
          mapContainer.removeEventListener("click", toggleFullScreen);
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
        mapContainer.removeEventListener("click", toggleFullScreen);
      };
    }
  }, [latitude, longitude]);

  return <div id="map" className={style.mapContainer}/>;
};
export default Map;
