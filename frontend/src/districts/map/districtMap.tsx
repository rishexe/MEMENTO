import { useEffect, useRef, useState } from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    useMap
} from "react-leaflet";

import locations from "./locationMarks";
import LocationCard from "./locationCard";
import VisitLogger from "../../visitlog/VisitLogger";
import pinIcon from "./mapPins";

function OutsideBlur({ coordinates }: { coordinates: [number, number][] }) {
    const map = useMap();
    const blurRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!coordinates.length) return;

        const container = map.getContainer();

        const blur = document.createElement("div");
        blur.className = "gangtok-outside-blur";

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        const mask = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "mask"
        );

        const outside = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        const gangtokHole = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        mask.setAttribute("id", "gangtok-blur-mask");
        mask.setAttribute("maskUnits", "userSpaceOnUse");

        /*
         * White = blur
         * Black = don't blur
         */

        outside.setAttribute(
            "d",
            `
            M 0 0
            H 10000
            V 10000
            H 0
            Z
            `
        );

        outside.setAttribute("fill", "white");

        const updateBlur = () => {
            const points = coordinates.map(([lat, lng]) => {
                const point = map.latLngToContainerPoint([
                    lat,
                    lng
                ]);

                return `${point.x},${point.y}`;
            });

            const gangtokPath = `
                M ${points.join(" L ")}
                Z
            `;

            /*
             * Black polygon creates the hole.
             */

            gangtokHole.setAttribute(
                "d",
                gangtokPath
            );

            gangtokHole.setAttribute(
                "fill",
                "black"
            );

            mask.innerHTML = "";

            mask.appendChild(outside);
            mask.appendChild(gangtokHole);

            svg.innerHTML = "";
            svg.appendChild(mask);

            blur.style.mask = `url(#gangtok-blur-mask)`;
            blur.style.webkitMask =
                `url(#gangtok-blur-mask)`;
        };

        blur.appendChild(svg);

        container.appendChild(blur);

        blurRef.current = blur;

        updateBlur();

        map.on("move", updateBlur);
        map.on("zoom", updateBlur);
        map.on("resize", updateBlur);

        return () => {
            map.off("move", updateBlur);
            map.off("zoom", updateBlur);
            map.off("resize", updateBlur);

            blur.remove();
        };
    }, [map, coordinates]);

    return null;
}

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

    const gangtokCoordinates: [number, number][] =
        gangtok?.features?.[0]?.geometry?.coordinates?.[0]?.map(
            ([lng, lat]: [number, number]) =>
                [lat, lng] as [number, number]
        ) || [];

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

                {/* Gradual blur outside Gangtok */}

                {gangtokCoordinates.length > 0 && (
                    <OutsideBlur
                        coordinates={gangtokCoordinates}
                    />
                )}

                {/* Gangtok boundary */}

                {gangtok && (
                    <GeoJSON
                        data={gangtok}
                        style={{
                            color: "#9f452c",
                            weight: 3,
                            opacity: 0.95,
                            fillColor: "#e8c9a8",
                            fillOpacity: 0.08
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
        icon={pinIcon}
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