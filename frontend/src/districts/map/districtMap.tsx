import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker
} from "react-leaflet";

import locations from "./locationMarks";
import LocationCard from "./locationCard";
import VisitLogger from "../../visitlog/VisitLogger";

function DistrictMap() {
    const [gangtok, setGangtok] = useState<any>(null);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [showVisitLogger, setShowVisitLogger] = useState(false);

    useEffect(() => {
        fetch("/maps/gangtok.geojson")
            .then((res) => res.json())
            .then((data) => {
                setGangtok(data);
            });
    }, []);

    function selectLocation(location: any) {
        setSelectedLocation(location);
        setShowVisitLogger(false);
    }

    function closeLocation() {
        setSelectedLocation(null);
        setShowVisitLogger(false);
    }

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

                {gangtok && (
                    <GeoJSON
                        data={gangtok}
                        style={{
                            color: "#9f452c",
                            weight: 2,
                            fillColor: "#f4ead2",
                            fillOpacity: 0.25
                        }}
                    />
                )}

                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[location.lat, location.lng]}
                        eventHandlers={{
                            click: () => selectLocation(location)
                        }}
                    />
                ))}

            </MapContainer>


            {selectedLocation && !showVisitLogger && (
                <LocationCard
                    location={selectedLocation}
                    onClose={closeLocation}
                    onExplore={() => setShowVisitLogger(true)}
                />
            )}


            {selectedLocation && showVisitLogger && (
                <div className="visit-logger-overlay">

                    <VisitLogger
                        locationName={selectedLocation.name}
                        locationMeta={`Gangtok • ${selectedLocation.category}`}
                        locationImage={selectedLocation.image}
                        onCancel={() => setShowVisitLogger(false)}
                        onSubmit={(payload) => {
                            console.log("Visit logged:", payload);
                        }}
                    />

                </div>
            )}

        </div>
    );
}

export default DistrictMap;