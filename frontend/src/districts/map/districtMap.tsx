import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON ,Marker,Popup} from "react-leaflet";
import locations from "./locationMarks";
import LocationCard from "./locationCard";
function DistrictMap() {
    const [gangtok, setGangtok] = useState<any>(null);
     const [selectedLocation, setSelectedLocation] = useState<any>(null);
    useEffect(() => {
        fetch("/maps/gangtok.geojson")
            .then((response) => response.json())
            .then((data) => {
                setGangtok(data);
            });
    }, []);

    return (
        <div className="map-container">

            <MapContainer
                center={[27.33, 88.61]}
                zoom={11}
                scrollWheelZoom={true}
                className="district-map"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[location.lat, location.lng]}
                        eventHandlers={{
                            click: () => {
                                setSelectedLocation(location);
                            }
                        }}
                    />
                ))}
            </MapContainer>

            {selectedLocation && (
                <LocationCard
                    location={selectedLocation}
                    onClose={() => setSelectedLocation(null)}
                />
            )}

        </div>
    );
}

export default DistrictMap;