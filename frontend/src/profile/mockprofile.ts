export const mockprofile = {
    name: "Explorer",
    username: "@explorer",
    bio: "Collect moments, not just destinations!!",
    explorerSince: "Sept 2026",
    region: "Sikkim, India",
   avatar: "https://i.pinimg.com/1200x/07/b2/28/07b228d584714794e4782690aa4e40e7.jpg",
   
    statistics:{
        districtExplored:4,
        totalDistrict:10,
        locationVisited:20,
        questCompleted:20,
        totalQuest: 30,
        xp:2000
    },
   favourites: [
    {
        name: "Rumtek Monastery",
        district: "Gangtok",
        image: "https://api.theindia.co.in/storage/image/places/banner_Rumtek-Monastery-Gangtok_106.jpg",
        category: "Monastery"
    },

    {
        name: "Tsomgo Lake",
        district: "East Sikkim",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
        category: "Lake"
    },

    {
        name: "Buddha Park",
        district: "Ravangla",
        image: "https://i.pinimg.com/736x/89/79/9a/89799ac58ad944197f01da818c942afe.jpg",
        category: "Park"
    },

    {
        name: "MG Marg",
        district: "Gangtok",
        image: "https://static2.tripoto.com/media/filter/tst/img/141278/TripDocument/1462268956_19550002771_3048c31f60_o.jpg",
        category: "Market"
    }
],
visits: [
    {
        date: "18 AUG 2026",
        name: "Rumtek Monastery",
        district: "Gangtok",
        category: "Religious • Monastery",
        description: "A serene Buddhist monastery with beautiful architecture.",
        image: "https://i.pinimg.com/1200x/d6/bf/38/d6bf3829c93dc68ff8e2d3abc256ee14.jpg",
        photos: 6
    },

    {
        date: "16 AUG 2026",
        name: "Enchey Monastery",
        district: "Gangtok",
        category: "Religious • Monastery",
        description: "Peaceful and historical monastery in the heart of Gangtok.",
        image: "https://i.pinimg.com/736x/a6/e2/40/a6e2407d426b1e4d852dd2505233c1ea.jpg",
        photos: 4
    },

    {
        date: "14 AUG 2026",
        name: "MG Marg",
        district: "Gangtok",
        category: "Market • Local Experience",
        description: "Bustling street with shops, cafes and local vibes.",
        image: "https://i.pinimg.com/1200x/14/db/7a/14db7a7b72899fb3dbeb95d5c4bc8f00.jpg",
        photos: 8
    },

    {
        date: "10 AUG 2026",
        name: "Bakthang Falls",
        district: "East Sikkim",
        category: "Nature • Waterfall",
        description: "Beautiful waterfall surrounded by lush greenery.",
        image: "https://i.pinimg.com/736x/4e/fe/0d/4efe0de75a62320908026459e14a6228.jpg",
        photos: 3
    }
],
  bucketlist: [
    {
        name: "Yumthang Valley",
        district: "North Sikkim",
        image: "https://i.pinimg.com/736x/b2/37/a5/b237a5d38264ba319767b9345e5a98ea.jpg",
        category: "Valley"
    },

    {
        name: "Gurudongmar Lake",
        district: "North Sikkim",
        image: "https://i.pinimg.com/1200x/ef/2a/29/ef2a296b0cc0c5057dd08041bac18872.jpg",
        category: "Lake"
    },

    {
        name: "Pelling Skywalk",
        district: "West Sikkim",
        image: "https://i.pinimg.com/736x/bd/5d/18/bd5d18769c90fd1fa371dd201f91ed66.jpg",
        category: "Viewpoint"
    },

    {
        name: "Dzongri Trek",
        district: "West Sikkim",
        image: "https://i.pinimg.com/736x/3f/b1/21/3fb121294d0785b75d878cef6d76c9c7.jpg",
        category: "Trek"
    }
],
   achievements: [
    {
        name: "Heritage Explorer",
        type: "heritage",
        description: "Visit heritage and cultural locations."
    },

    {
        name: "Mountain Seeker",
        type: "mountain",
        description: "Explore mountain destinations."
    },

    {
        name: "Memory Collector",
        type: "memory",
        description: "Create memorable travel logs."
    },

    {
        name: "District Wanderer",
        type: "district",
        description: "Explore different districts."
    },

    {
        name: "Trail Completer",
        type: "trail",
        description: "Complete travel trails."
    },

    {
        name: "Early Explorer",
        type: "early",
        description: "Be among the first to discover new places."
    }
],
explorerLevel: {
    level: 12,
    currentXp: 3820,
    nextLevelXp: 5000
}


}