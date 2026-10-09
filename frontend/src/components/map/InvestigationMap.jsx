import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

function InvestigationMap({
  latitude,
  longitude,
}) {
  if (
    latitude === null ||
    latitude === undefined ||
    longitude === null ||
    longitude === undefined
  ) {
    return (
      <div className="flex min-h-[350px] items-center justify-center border border-[#292930] bg-[#0d0d11]">
        <p className="text-xs uppercase tracking-[0.2em] text-[#85858f]">
          Coordinate not yet recovered
        </p>
      </div>
    )
  }

  const position = [
    Number(latitude),
    Number(longitude),
  ]

  return (
    <div className="overflow-hidden border border-[#292930]">
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={true}
        className="h-[400px] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            Investigation location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default InvestigationMap