import "./locationCard.css";
function locationCard({location,onClose }: any) {
    return (
        <div className="location-card">
            <button className="close-button" onClick={onClose}>
                ×
            </button>

            <div className="location-image">
                <img src={location.image} alt={location.name} />
            </div>

            <div className="location-content">
                <p className="location-category">
                    {location.category}
                </p>

                <h2>{location.name}</h2>

                <p>{location.description}</p>

                <button className="explore-button">
                    Explore Location
                </button>
            </div>
        </div>
    );
}

export default locationCard;