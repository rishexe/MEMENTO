import { mockprofile } from "./mockprofile";
import "./profile.css";


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
    Trophy
} from "lucide-react";

function Profile() {
    return (
        <div className="profile-page">

<div className="profile-header">

    <button className="edit-profile">
        Edit Profile
    </button>

    <img className="profile-avatar"
    src={mockprofile.avatar}
    alt="Profile image not found"
    />

<div className="profile-info">
            <h1>{mockprofile.name}</h1>

            <p>{mockprofile.username}</p>

            <p>{mockprofile.bio}</p>

            <div className="profile-meta">

                <div className="profile-meta-item">

                    <MapPin size={15} />

                    <span>{mockprofile.region}</span>

                </div>

                <div className="profile-meta-item">

                    <CalendarDays size={15} />

                    <span>
                        Explorer since {mockprofile.explorerSince}
                    </span>

                </div>

            </div>

            <div className="explorer-badge">

                <Mountain size={14} />

                <span>Sikkim Explorer</span>

            </div>

</div>

</div>


                        <div className="profile-stats">

                <div className="stat">

                    <Mountain size={20} />

                    <h2>
                        {mockprofile.statistics.districtExplored}
                        /
                        {mockprofile.statistics.totalDistrict}
                    </h2>

                    <p>Districts Explored</p>

                </div>


                <div className="stat">

                    <MapPin size={20} />

                    <h2>
                        {mockprofile.statistics.locationVisited}
                    </h2>

                    <p>Locations Visited</p>

                </div>


                <div className="stat">

                    <Flag size={20} />

                    <h2>
                        {mockprofile.statistics.questCompleted}
                        /
                        {mockprofile.statistics.totalQuest}
                    </h2>

                    <p>Quests Completed</p>

                </div>


                <div className="stat">

                    <Sparkles size={20} />

                    <h2>
                        {mockprofile.statistics.xp}
                    </h2>

                    <p>XP Earned</p>

                </div>

            </div>


            <div className="favourite-section">

                <div className="section-heading">
                    <h2>
                        <Bookmark size={17}/>
                        FAVOURITES</h2>
                    <span className="view-all">View all favourites</span>
                </div>

                <div className="favourite-grid">

                    {mockprofile.favourites.map((place) => (

                        <div
                            className="favourite-card"
                            key={place.name}
                        >

                            <div className="favourite-image">

                                <img
                                    src={place.image}
                                    alt={place.name}
                                />

                                <div className="favourite-bookmark">

                                    <Bookmark size={18}
                                    fill="#9f452c"/>

                                </div>

                            </div>

                            <div className="favourite-info">

                                <h3>{place.name}</h3>

                                <p>{place.district}</p>

                                <small>{place.category}</small>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            <div className="visit-section">

                <div className="section-heading">
                    <h2>
                        <Camera size={17}/>
                        VISIT LOG</h2>
                    <span className="view-all">View all visits</span>
                </div>

                <div className="visit-list">

                    {mockprofile.visits.map((visit) => (

                        <div
                            className="visit-card"
                            key={visit.date + visit.name}
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

                                <h3>{visit.name}</h3>

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
                               <Camera size={16}/>
                               <span> 
                                {visit.photos}
                               </span>
                                 

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            <div className="bucketlist-section">

                <div className="section-heading bucketlist-heading">

                    <h2>

                        <Compass size={17} />

                        BUCKET LIST

                    </h2>

                    <span className="view-list">View all bucket list</span>

                </div>


                <div className="bucketlist-grid">

                    {mockprofile.bucketlist.map((place) => (

                        <div
                            className="bucketlist-card"
                            key={place.name}
                        >

                            <img
                                src={place.image}
                                alt={place.name}
                            />

                            <div className="bucketlist-info">

                                <h3>{place.name}</h3>

                                <p>{place.district}</p>

                                <small>{place.category}</small>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            <div className="achievements-section">

                <div className="section-heading">

                    <h2>
                        <Trophy size={17}/>
                        ACHIEVEMENTS</h2>

                    <span className="view-all">View all achievements</span>

                </div>


                <div className="achievements-grid">

                    {mockprofile.achievements.map((achievement) => (

                        <div
                            className="achievement-card"
                            key={achievement.name}
                        >

                           <div className="achievement-icon">

    {achievement.type === "heritage" && <Landmark size={36} />}
    {achievement.type === "mountain" && <Mountain size={36} />}
    {achievement.type === "memory" && <Camera size={36} />}
    {achievement.type === "district" && <MapPin size={36} />}
    {achievement.type === "trail" && <Flag size={36} />}
    {achievement.type === "early" && <Sunrise size={36} />}

</div>


                            <h3>{achievement.name}</h3>

                            <p>{achievement.description}</p>

                        </div>

                    ))}

                </div>

            </div>


                        <div className="explorer-level-section">

                <div className="section-heading">

                    <h2>EXPLORER LEVEL</h2>

                </div>


                <div className="explorer-level-card">

                    <div className="level-number">

                        {mockprofile.explorerLevel.level}

                    </div>


                    <p>LEVEL</p>


                    <p>
                        {mockprofile.explorerLevel.nextLevelXp -
                        mockprofile.explorerLevel.currentXp}
                        {" XP TO GO"}
                    </p>


                    <div className="level-progress">

                        <div
                            className="level-progress-fill"
                            style={{
                                width: `${(
                                    mockprofile.explorerLevel.currentXp /
                                    mockprofile.explorerLevel.nextLevelXp
                                ) * 100}%`
                            }}
                        >

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;