import { mockprofile } from "./mockprofile";
import "./profile.css";
import { useState, useEffect } from "react";
import { useVisits } from "../VisitContext";

import {
    Landmark,
    Mountain,
    Camera,
    MapPin,
    Flag,
    Sunrise,
    Sparkles,
    Bookmark,
    CalendarDays,
    Compass,
    Trophy,
    X,
    Lock
} from "lucide-react";


type ModalType = "favourites" | "visits" | "bucketlist" | null;


function Modal({
    title,
    onClose,
    children
}: {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}) {

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header">

                    <h2>{title}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="modal-body">
                    {children}
                </div>

            </div>

        </div>

    );
}


function achievementIcon(
    type: string,
    size = 36
) {

    switch (type) {

        case "heritage":
            return <Landmark size={size} />;

        case "mountain":
            return <Mountain size={size} />;

        case "memory":
            return <Camera size={size} />;

        case "district":
            return <MapPin size={size} />;

        case "trail":
            return <Flag size={size} />;

        case "early":
            return <Sunrise size={size} />;

        default:
            return null;

    }

}


function Profile() {

    const {
        visits,
        xp,
        showXpReward,
        addVisit
    } = useVisits();


    // -----------------------------
    // FAVOURITES
    // -----------------------------

    const [favouritedNames, setFavouritedNames] =
        useState<Set<string>>(
            new Set(
                mockprofile.favourites.map(
                    (p) => p.name
                )
            )
        );


    const toggleFavourite = (name: string) => {

        setFavouritedNames((prev) => {

            const next = new Set(prev);

            if (next.has(name)) {

                next.delete(name);

            } else {

                next.add(name);

            }

            return next;

        });

    };


    const visibleFavourites =
        mockprofile.favourites.filter((p) =>
            favouritedNames.has(p.name)
        );


    // -----------------------------
    // BUCKET LIST
    // -----------------------------

    const [bucketlist, setBucketlist] =
        useState(mockprofile.bucketlist);

    const [extraLocations, setExtraLocations] =
        useState(0);


    const completeBucketlistItem = (
        place: typeof mockprofile.bucketlist[number]
    ) => {

        setBucketlist((prev) =>
            prev.filter(
                (p) => p.name !== place.name
            )
        );


        setExtraLocations((prev) => prev + 1);


        const today = new Date();

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        const month = today
            .toLocaleString(
                "en-US",
                { month: "short" }
            )
            .toUpperCase();

        const year = today.getFullYear();


        addVisit({

            date: `${day} ${month} ${year}`,

            name: place.name,

            district: place.district,

            category: place.category,

            description:
                "Finally checked this one off the bucket list!",

            image: place.image,

            photos: 1

        });

    };


    // -----------------------------
    // ACHIEVEMENTS
    // -----------------------------

    const achievementUnlocked = (
        type: string
    ) => {

        const stats = mockprofile.statistics;


        switch (type) {

            case "heritage":
                return stats.districtExplored >= 1;

            case "mountain":
                return stats.locationVisited >= 10;

            case "memory":
                return visits.length >= 3;

            case "district":
                return stats.districtExplored >= 4;

            case "trail":
                return stats.questCompleted >= 20;

            case "early":
                return true;

            default:
                return false;

        }

    };


    const [
        selectedAchievement,
        setSelectedAchievement
    ] = useState<
        typeof mockprofile.achievements[number] | null
    >(null);


    // -----------------------------
    // EXPLORER LEVEL
    // -----------------------------

    const [levelFillWidth, setLevelFillWidth] =
        useState(0);

    const [showLevelModal, setShowLevelModal] =
        useState(false);


    useEffect(() => {

        const target =
            (
                mockprofile.explorerLevel.currentXp /
                mockprofile.explorerLevel.nextLevelXp
            ) * 100;


        const t = setTimeout(
            () => setLevelFillWidth(target),
            200
        );


        return () => clearTimeout(t);

    }, []);


    // -----------------------------
    // MODALS
    // -----------------------------

    const [activeModal, setActiveModal] =
        useState<ModalType>(null);


    return (

        <div className="profile-page">


            {/* PROFILE HEADER */}

            <div className="profile-header">

                <button className="edit-profile">
                    Edit Profile
                </button>


                <img
                    className="profile-avatar"
                    src={mockprofile.avatar}
                    alt="Profile image not found"
                />


                <div className="profile-info">

                    <h1>
                        {mockprofile.name}
                    </h1>


                    <p>
                        {mockprofile.username}
                    </p>


                    <p>
                        {mockprofile.bio}
                    </p>


                    <div className="profile-meta">

                        <div className="profile-meta-item">

                            <MapPin size={15} />

                            <span>
                                {mockprofile.region}
                            </span>

                        </div>


                        <div className="profile-meta-item">

                            <CalendarDays size={15} />

                            <span>
                                Explorer since{" "}
                                {mockprofile.explorerSince}
                            </span>

                        </div>

                    </div>


                    <div className="explorer-badge">

                        <Mountain size={14} />

                        <span>
                            Sikkim Explorer
                        </span>

                    </div>

                </div>

            </div>


            {/* PROFILE STATS */}

            <div className="profile-stats">


                <div className="stat">

                    <Mountain size={20} />

                    <h2>

                        {mockprofile.statistics.districtExplored}

                        /

                        {mockprofile.statistics.totalDistrict}

                    </h2>

                    <p>
                        Districts Explored
                    </p>

                </div>


                <div className="stat">

                    <MapPin size={20} />

                    <h2>
                        {
                            mockprofile.statistics
                                .locationVisited +
                            extraLocations
                        }
                    </h2>

                    <p>
                        Locations Visited
                    </p>

                </div>


                <div className="stat">

                    <Flag size={20} />

                    <h2>

                        {mockprofile.statistics.questCompleted}

                        /

                        {mockprofile.statistics.totalQuest}

                    </h2>

                    <p>
                        Quests Completed
                    </p>

                </div>


                <div className="stat xp-stat">

                    <Sparkles size={20} />

                    <h2>
                        {xp}
                    </h2>

                    <p>
                        XP Earned
                    </p>


                    {showXpReward && (

                        <div className="xp-reward">
                            +20 XP
                        </div>

                    )}

                </div>


            </div>


            {/* FAVOURITES */}

            <div className="favourite-section">

                <div className="section-heading">

                    <h2>
                        <Bookmark size={17} />
                        FAVOURITES
                    </h2>


                    <span
                        className="view-all"
                        onClick={() =>
                            setActiveModal(
                                "favourites"
                            )
                        }
                    >
                        View all favourites
                    </span>

                </div>


                {visibleFavourites.length === 0 ? (

                    <div className="empty-state">

                        No favourites right now.
                        Open "View all favourites"
                        to add some back.

                    </div>

                ) : (

                    <div className="favourite-grid">

                        {visibleFavourites.map(
                            (place) => (

                                <div
                                    className="favourite-card"
                                    key={place.name}
                                >

                                    <div className="favourite-image">

                                        <img
                                            src={place.image}
                                            alt={place.name}
                                        />


                                        <div
                                            className="favourite-bookmark"
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                toggleFavourite(
                                                    place.name
                                                );

                                            }}
                                        >

                                            <Bookmark
                                                size={18}
                                                fill="#9f452c"
                                            />

                                        </div>

                                    </div>


                                    <div className="favourite-info">

                                        <h3>
                                            {place.name}
                                        </h3>

                                        <p>
                                            {place.district}
                                        </p>

                                        <small>
                                            {place.category}
                                        </small>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>


            {/* VISIT LOG */}

            <div className="visit-section">

                <div className="section-heading">

                    <h2>
                        <Camera size={17} />
                        VISIT LOG
                    </h2>


                    <span
                        className="view-all"
                        onClick={() =>
                            setActiveModal("visits")
                        }
                    >
                        View all visits
                    </span>

                </div>


                {visits.length === 0 ? (

                    <div className="empty-state">
                        No visits logged yet.
                    </div>

                ) : (

                    <div className="visit-list">

                        {visits.map((visit) => (

                            <div
                                className="visit-card"
                                key={visit.id}
                            >

                                <div className="visit-date">

                                    <strong>
                                        {visit.date.split(" ")[0]}
                                    </strong>

                                    <span>
                                        {visit.date.split(" ")[1]}
                                    </span>

                                    <small>
                                        {visit.date.split(" ")[2]}
                                    </small>

                                </div>


                                <img
                                    src={visit.image}
                                    alt={visit.name}
                                />


                                <div className="visit-info">

                                    <h3>
                                        {visit.name}
                                    </h3>

                                    <p>
                                        {visit.district}
                                        {" • "}
                                        {visit.category}
                                    </p>

                                    <small>
                                        {visit.description}
                                    </small>

                                </div>


                                <div className="visit-photos">

                                    <Camera size={16} />

                                    <span>
                                        {visit.photos}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* BUCKET LIST */}

            <div className="bucketlist-section">

                <div className="section-heading bucketlist-heading">

                    <h2>
                        <Compass size={17} />
                        BUCKET LIST
                    </h2>


                    <span
                        className="view-list"
                        onClick={() =>
                            setActiveModal(
                                "bucketlist"
                            )
                        }
                    >
                        View all bucket list
                    </span>

                </div>


                {bucketlist.length === 0 ? (

                    <div className="empty-state">

                        You've completed your whole
                        bucket list! 🎉

                    </div>

                ) : (

                    <div className="bucketlist-grid">

                        {bucketlist.map(
                            (place) => (

                                <div
                                    className="bucketlist-card"
                                    key={place.name}
                                    onClick={() =>
                                        completeBucketlistItem(
                                            place
                                        )
                                    }
                                >

                                    <img
                                        src={place.image}
                                        alt={place.name}
                                    />


                                    <div className="bucketlist-complete-overlay">
                                        Mark as visited
                                    </div>


                                    <div className="bucketlist-info">

                                        <h3>
                                            {place.name}
                                        </h3>

                                        <p>
                                            {place.district}
                                        </p>

                                        <small>
                                            {place.category}
                                        </small>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>


            {/* ACHIEVEMENTS */}

            <div className="achievements-section">

                <div className="section-heading">

                    <h2>
                        <Trophy size={17} />
                        ACHIEVEMENTS
                    </h2>


                    <span className="view-all">

                        {
                            mockprofile.achievements.filter(
                                (a) =>
                                    achievementUnlocked(
                                        a.type
                                    )
                            ).length
                        }

                        {" / "}

                        {
                            mockprofile
                                .achievements.length
                        }

                        {" unlocked"}

                    </span>

                </div>


                <div className="achievements-grid">

                    {mockprofile.achievements.map(
                        (achievement) => {

                            const unlocked =
                                achievementUnlocked(
                                    achievement.type
                                );


                            return (

                                <div
                                    className={`achievement-card ${
                                        unlocked
                                            ? ""
                                            : "locked"
                                    }`}
                                    key={achievement.name}
                                    onClick={() =>
                                        setSelectedAchievement(
                                            achievement
                                        )
                                    }
                                >

                                    <div className="achievement-icon">

                                        {unlocked
                                            ? achievementIcon(
                                                achievement.type
                                            )
                                            : <Lock size={30} />
                                        }

                                    </div>


                                    <h3>
                                        {achievement.name}
                                    </h3>


                                    <p>
                                        {achievement.description}
                                    </p>


                                    <span className="achievement-status">

                                        {unlocked
                                            ? "Unlocked"
                                            : "Locked"
                                        }

                                    </span>

                                </div>

                            );

                        }
                    )}

                </div>

            </div>


            {/* EXPLORER LEVEL */}

            <div className="explorer-level-section">

                <div className="section-heading">

                    <h2>
                        EXPLORER LEVEL
                    </h2>

                </div>


                <div
                    className="explorer-level-card"
                    onClick={() =>
                        setShowLevelModal(true)
                    }
                >

                    <div className="level-number">

                        {
                            mockprofile
                                .explorerLevel.level
                        }

                    </div>


                    <p>
                        LEVEL
                    </p>


                    <p>

                        {
                            mockprofile
                                .explorerLevel.nextLevelXp -
                            mockprofile
                                .explorerLevel.currentXp
                        }

                        {" XP TO GO"}

                    </p>


                    <div className="level-progress">

                        <div
                            className="level-progress-fill"
                            style={{
                                width:
                                    `${levelFillWidth}%`
                            }}
                        />

                    </div>

                </div>

            </div>


            {/* FAVOURITES MODAL */}

            {activeModal === "favourites" && (

                <Modal
                    title="All Favourites"
                    onClose={() =>
                        setActiveModal(null)
                    }
                >

                    {mockprofile.favourites.map(
                        (place) => {

                            const isFav =
                                favouritedNames.has(
                                    place.name
                                );


                            return (

                                <div
                                    className="modal-row"
                                    key={place.name}
                                >

                                    <img
                                        src={place.image}
                                        alt={place.name}
                                    />


                                    <div className="modal-row-info">

                                        <h3>
                                            {place.name}
                                        </h3>

                                        <p>
                                            {place.district}
                                            {" • "}
                                            {place.category}
                                        </p>

                                    </div>


                                    <div
                                        className={`modal-row-action ${
                                            isFav
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            toggleFavourite(
                                                place.name
                                            )
                                        }
                                    >

                                        <Bookmark
                                            size={16}
                                            fill={
                                                isFav
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                        />

                                    </div>

                                </div>

                            );

                        }
                    )}

                </Modal>

            )}


            {/* VISITS MODAL */}

            {activeModal === "visits" && (

                <Modal
                    title="All Visits"
                    onClose={() =>
                        setActiveModal(null)
                    }
                >

                    {visits.map((visit) => (

                        <div
                            className="modal-row"
                            key={visit.id}
                        >

                            <img
                                src={visit.image}
                                alt={visit.name}
                            />


                            <div className="modal-row-info">

                                <h3>
                                    {visit.name}
                                </h3>

                                <p>
                                    {visit.date}
                                    {" • "}
                                    {visit.district}
                                </p>

                            </div>

                        </div>

                    ))}

                </Modal>

            )}


            {/* BUCKET LIST MODAL */}

            {activeModal === "bucketlist" && (

                <Modal
                    title="Full Bucket List"
                    onClose={() =>
                        setActiveModal(null)
                    }
                >

                    {mockprofile.bucketlist.map(
                        (place) => {

                            const stillPending =
                                bucketlist.some(
                                    (p) =>
                                        p.name ===
                                        place.name
                                );


                            return (

                                <div
                                    className="modal-row"
                                    key={place.name}
                                >

                                    <img
                                        src={place.image}
                                        alt={place.name}
                                    />


                                    <div className="modal-row-info">

                                        <h3>
                                            {place.name}
                                        </h3>

                                        <p>
                                            {place.district}
                                            {" • "}
                                            {place.category}
                                        </p>

                                    </div>


                                    <button
                                        className="modal-row-button"
                                        disabled={!stillPending}
                                        onClick={() =>
                                            stillPending &&
                                            completeBucketlistItem(
                                                place
                                            )
                                        }
                                    >

                                        {
                                            stillPending
                                                ? "Mark visited"
                                                : "Visited"
                                        }

                                    </button>

                                </div>

                            );

                        }
                    )}

                </Modal>

            )}


            {/* ACHIEVEMENT MODAL */}

            {selectedAchievement && (

                <Modal
                    title={
                        selectedAchievement.name
                    }
                    onClose={() =>
                        setSelectedAchievement(
                            null
                        )
                    }
                >

                    <div
                        style={{
                            textAlign: "center"
                        }}
                    >

                        <div
                            className="achievement-icon"
                            style={{
                                margin:
                                    "0 auto 14px"
                            }}
                        >

                            {
                                achievementUnlocked(
                                    selectedAchievement.type
                                )
                                    ? achievementIcon(
                                        selectedAchievement.type,
                                        40
                                    )
                                    : <Lock size={34} />
                            }

                        </div>


                        <p>
                            {
                                selectedAchievement.description
                            }
                        </p>


                        <span className="achievement-status">

                            {
                                achievementUnlocked(
                                    selectedAchievement.type
                                )
                                    ? "Unlocked"
                                    : "Locked — keep exploring"
                            }

                        </span>

                    </div>

                </Modal>

            )}


            {/* LEVEL MODAL */}

            {showLevelModal && (

                <Modal
                    title="Explorer Level"
                    onClose={() =>
                        setShowLevelModal(false)
                    }
                >

                    <div className="level-modal-stats">

                        <span>
                            Current Level
                        </span>

                        <strong>
                            {
                                mockprofile
                                    .explorerLevel.level
                            }
                        </strong>

                    </div>


                    <div className="level-modal-stats">

                        <span>
                            Current XP
                        </span>

                        <strong>
                            {
                                mockprofile
                                    .explorerLevel.currentXp
                            }
                        </strong>

                    </div>


                    <div className="level-modal-stats">

                        <span>
                            XP for Next Level
                        </span>

                        <strong>
                            {
                                mockprofile
                                    .explorerLevel.nextLevelXp
                            }
                        </strong>

                    </div>


                    <div className="level-modal-stats">

                        <span>
                            XP Remaining
                        </span>

                        <strong>

                            {
                                mockprofile
                                    .explorerLevel.nextLevelXp -
                                mockprofile
                                    .explorerLevel.currentXp
                            }

                        </strong>

                    </div>

                </Modal>

            )}

        </div>

    );
}


export default Profile;