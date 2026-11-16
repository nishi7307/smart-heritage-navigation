"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Site } from "@/lib/data";

const pin = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

export default function HeritageMap({ sites, selectedId, onSelect }: {
  sites: Site[]; selectedId: string; onSelect: (id: string) => void;
}) {
  const selected = sites.find((site) => site.id === selectedId) ?? sites[0];
  return (
    <div className="map-wrap">
      <MapContainer key={selected.id} center={[selected.lat, selected.lng]} zoom={15} scrollWheelZoom className="map">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {sites.map((site) => (
          <Marker key={site.id} position={[site.lat, site.lng]} icon={pin} eventHandlers={{ click: () => onSelect(site.id) }}>
            <Popup><strong>{site.name}</strong><br />{site.city}, {site.state}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <p className="map-note">Map pins show the approximate site centre. Select a pin or a site card to explore.</p>
    </div>
  );
}
