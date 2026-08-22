import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    Polygon
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
            })
            .catch((err) => {
                console.error("Could not load Gangtok GeoJSON:", err);
            });
    }, []);

    function handleMarkerClick(location: any) {
        setSelectedLocation(location);
        setShowVisitLogger(false);
    }

    function handleClose() {
        setSelectedLocation(null);
        setShowVisitLogger(false);
    }

    /*
     * Convert GeoJSON [lng, lat]
     * into Leaflet [lat, lng]
     */
    const gangtokCoordinates =
        gangtok?.features?.[0]?.geometry?.coordinates?.[0]?.map(
            ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
        );

    /*
     * Huge rectangle around the whole world.
     * Gangtok will be cut out of it using
     * the second ring.
     */
    const outsideMap = [
        [-90, -180],
        [-90, 180],
        [90, 180],
        [90, -180],
        [-90, -180]
    ] as [number, number][];

    return (
        <div className="map-container">

            <MapContainer
                center={[27.33, 88.61]}
                zoom={11}
                scrollWheelZoom={true}
                className="district-map"
            >

                {/* Base map */}

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />


                {/* Fade everything outside Gangtok */}

                {gangtokCoordinates && (
                    <Polygon
                        positions={[
                            outsideMap,
                            gangtokCoordinates
                        ]}
                        pathOptions={{
                            stroke: false,
                            fillColor: "#f4ead2",
                            fillOpacity: 0.78,
                            fillRule: "evenodd"
                        }}
                    />
                )}


                {/* Actual Gangtok boundary */}

                {gangtok && (
                    <GeoJSON
                        data={gangtok}
                        style={{
                            color: "#9f452c",
                            weight: 3,
                            opacity: 1,
                            fillColor: "#f4ead2",
                            fillOpacity: 0.05
                        }}
                    />
                )}


                {/* Location pins */}

                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[
                            location.lat,
                            location.lng
                        ]}
                        eventHandlers={{
                            click: () =>
                                handleMarkerClick(location)
                        }}
                    />
                ))}

            </MapContainer>


            {/* Location Card */}

            {selectedLocation && !showVisitLogger && (
                <LocationCard
                    location={selectedLocation}
                    onClose={handleClose}
                    onExplore={() =>
                        setShowVisitLogger(true)
                    }
                />
            )}


            {/* Visit Logger */}

            {selectedLocation && showVisitLogger && (
                <div className="visit-logger-overlay">

                    <VisitLogger
                        locationName={
                            selectedLocation.name
                        }
                        locationMeta={
                            `Gangtok • ${selectedLocation.category}`
                        }
                        locationImage={
                            selectedLocation.image
                        }
                        onCancel={() =>
                            setShowVisitLogger(false)
                        }
                        onSubmit={(payload) => {
                            console.log(
                                "Visit logged:",
                                payload
                            );
                        }}
                    />

                </div>
            )}

        </div>
    );
}

export default DistrictMap;