import L from "leaflet";

/*
 * Custom map pin, styled to match the
 * app's terracotta / parchment palette
 * instead of Leaflet's default blue marker.
 */
const pinIcon = L.divIcon({
    className: "district-pin",
    html: `
        <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15 0C6.7 0 0 6.7 0 15c0 11.2 15 25 15 25s15-13.8 15-25C30 6.7 23.3 0 15 0z"
                fill="#9f452c"
            />
            <circle cx="15" cy="15" r="6" fill="#f8efd9" />
        </svg>
    `,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -36]
});

export default pinIcon;