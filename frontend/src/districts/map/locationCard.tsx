import "./locationCard.css";

interface LocationCardProps {
    location: any;
    onClose: () => void;
    onExplore: () => void;
}

function LocationCard({
    location,
    onClose,
    onExplore
}: LocationCardProps) {
    return (
        <div className="location-card">

            <button
                type="button"
                className="close-button"
                onClick={onClose}
            >
                ×
            </button>

            <div className="location-image">
                {location.image ? (
                    <img
                        src={location.image}
                        alt={location.name}
                    />
                ) : (
                    <span>{location.category}</span>
                )}
            </div>

            <div className="location-content">

                <p className="location-category">
                    {location.category}
                </p>

                <h2>{location.name}</h2>

                <p>{location.description}</p>

                <button
                    type="button"
                    className="explore-button"
                    onClick={onExplore}
                >
                    Explore Location
                </button>

            </div>

        </div>
    );
}

export default LocationCard;