import { imageFor } from "./imageMap";

export type Difficulty = "Easy" | "Moderate" | "Hard";

export const districts = [
  "All Sikkim",
  "Gangtok",
  "Mangan",
  "Namchi",
  "Gyalshing",
  "Pakyong",
  "Soreng"
] as const;

export type Quest = {
  id: number;
  title: string;
  description: string;
  reward: number;
};

export type Trail = {
  id: number;
  district: string;
  location: string;
  title: string;
  teaser: string;
  description: string;
  image: string;
  duration: string;
  distance: string;
  difficulty: Difficulty;
  quests: Quest[];
};

const questTemplates: Record<string, [string, string, string]> = {
  Gangtok: ["Find the first landmark", "Read the hidden story", "Reach the final viewpoint"],
  Mangan: ["Follow the mountain path", "Discover the local clue", "Complete the northern trail"],
  Namchi: ["Find the sacred marker", "Uncover the old story", "Reach the final shrine"],
  Gyalshing: ["Enter the old route", "Find the forgotten landmark", "Complete the heritage trail"],
  Pakyong: ["Follow the eastern road", "Find the hidden viewpoint", "Complete the mountain passage"],
  Soreng: ["Find the village marker", "Discover the quiet path", "Finish the western trail"]
};

const questDetails = [
  "Look around the location and find the landmark that starts this memory.",
  "Explore the trail and uncover the small detail most visitors miss.",
  "Reach the final point and complete this chapter of the journey."
];

function makeQuests(id: number, district: string, location: string): Quest[] {
  const names = questTemplates[district];
  return names.map((name, index) => ({
    id: index + 1,
    title: `${name} — ${location}`,
    description: questDetails[index],
    reward: 25 + index * 25 + (id % 4) * 5
  }));
}

function makeTrail(
  id: number,
  district: string,
  location: string,
  title: string,
  teaser: string,
  distance: string,
  duration: string,
  difficulty: Difficulty
): Trail {
  return {
    id,
    district,
    location,
    title,
    teaser,
    description: `${teaser} Take your time, notice the details, and collect the memories hidden along this route.`,
    image: imageFor(location),
    duration,
    distance,
    difficulty,
    quests: makeQuests(id, district, location)
  };
}

// 42 destinations: 7 in each of Sikkim's 6 districts.
export const trails: Trail[] = [
  makeTrail(1, "Gangtok", "Gangtok", "Heart of Gangtok", "A city trail through streets, viewpoints and cultural corners.", "3.2 km", "1–2 hrs", "Easy"),
  makeTrail(2, "Gangtok", "Rumtek", "Whispers of Rumtek", "Monastery paths, prayer wheels and quiet mountain stories.", "5.8 km", "2–3 hrs", "Easy"),
  makeTrail(3, "Gangtok", "Tsomgo Lake", "Mirror of the Mountains", "A high-altitude journey to the sacred glacial lake.", "8.1 km", "3–4 hrs", "Moderate"),
  makeTrail(4, "Gangtok", "Nathula Pass", "The High Pass", "A historic mountain pass at the edge of Sikkim.", "6.4 km", "3 hrs", "Hard"),
  makeTrail(5, "Gangtok", "Enchey", "The Quiet Monastery", "A peaceful route through Gangtok's spiritual hillside.", "3.9 km", "2 hrs", "Easy"),
  makeTrail(6, "Gangtok", "Tashi View Point", "Above the Clouds", "A viewpoint trail where the city gives way to the Himalayas.", "4.5 km", "2 hrs", "Moderate"),
  makeTrail(7, "Gangtok", "Bakthang Falls", "The Falling River", "A short nature trail to a dramatic Himalayan waterfall.", "2.6 km", "1–2 hrs", "Easy"),

  makeTrail(8, "Mangan", "Mangan", "Gateway to the North", "A northern town trail framed by forests and mountain ridges.", "3.5 km", "2 hrs", "Easy"),
  makeTrail(9, "Mangan", "Phodong", "Monastery Road", "A cultural route through the hills north of Gangtok.", "4.8 km", "2–3 hrs", "Easy"),
  makeTrail(10, "Mangan", "Singhik", "The Great Mountain View", "A quiet ridge with expansive Himalayan views.", "4.2 km", "2 hrs", "Moderate"),
  makeTrail(11, "Mangan", "Dzongu", "Hidden Dzongu", "A slow journey through a protected mountain landscape and local villages.", "7.5 km", "3–4 hrs", "Moderate"),
  makeTrail(12, "Mangan", "Lachen", "Road to Lachen", "High mountain roads leading deeper into North Sikkim.", "12 km", "4–5 hrs", "Hard"),
  makeTrail(13, "Mangan", "Lachung", "The Village Above the River", "Follow the valley route towards the gateway to Yumthang.", "10.5 km", "4 hrs", "Hard"),
  makeTrail(14, "Mangan", "Yumthang", "Valley of Flowers", "A high Himalayan valley filled with changing mountain landscapes.", "9 km", "4–5 hrs", "Hard"),

  makeTrail(15, "Namchi", "Namchi", "Sacred South", "Temples, viewpoints and stories from southern Sikkim.", "4.2 km", "2 hrs", "Easy"),
  makeTrail(16, "Namchi", "Ravangla", "Buddha Park Trail", "A peaceful hill journey around Ravangla's iconic landscape.", "5.2 km", "2–3 hrs", "Easy"),
  makeTrail(17, "Namchi", "Temi", "Tea Garden Trail", "Walk through the green slopes of Sikkim's famous tea country.", "4.7 km", "2 hrs", "Easy"),
  makeTrail(18, "Namchi", "Tendong", "The Sacred Ridge", "A forested climb into the hills above southern Sikkim.", "7.1 km", "4 hrs", "Hard"),
  makeTrail(19, "Namchi", "Maenam", "Into the Forest", "A mountain trail through the forests above Ravangla.", "8.5 km", "4–5 hrs", "Hard"),
  makeTrail(20, "Namchi", "Ralang", "Ralang Monastery", "A cultural trail around one of southern Sikkim's monastery landscapes.", "4.3 km", "2 hrs", "Easy"),
  makeTrail(21, "Namchi", "Jorethang", "River Gateway", "A lower-hill journey connecting the southern valleys.", "3.8 km", "2 hrs", "Easy"),

  makeTrail(22, "Gyalshing", "Pelling", "Kanchenjunga Trail", "Forests and viewpoints beneath the great mountain.", "8.4 km", "3–4 hrs", "Moderate"),
  makeTrail(23, "Gyalshing", "Yuksom", "First Capital", "Walk through the historic landscape where Sikkim's first Chogyal was consecrated.", "6.2 km", "3 hrs", "Moderate"),
  makeTrail(24, "Gyalshing", "Khecheopalri Lake", "The Wishing Lake", "A forest journey to one of Sikkim's sacred lakes.", "5.5 km", "3 hrs", "Moderate"),
  makeTrail(25, "Gyalshing", "Tashiding", "Sacred Hill", "A spiritual route through one of West Sikkim's revered landscapes.", "4.1 km", "2 hrs", "Moderate"),
  makeTrail(26, "Gyalshing", "Pemayangtse", "Perfect Sublime Lotus", "A monastery trail surrounded by mountain history.", "3.6 km", "2 hrs", "Easy"),
  makeTrail(27, "Gyalshing", "Rabdentse", "Ruins of the Kingdom", "Follow the forest path to the ruins of Sikkim's former capital.", "3.2 km", "2 hrs", "Easy"),
  makeTrail(28, "Gyalshing", "Sanga Choeling", "Skywalk Ridge", "A hillside route above Pelling with sweeping valley views.", "4.9 km", "2–3 hrs", "Moderate"),

  makeTrail(29, "Pakyong", "Pakyong", "Eastern Gateway", "A quiet eastern-hills trail around the district headquarters.", "3.7 km", "2 hrs", "Easy"),
  makeTrail(30, "Pakyong", "Rongli", "Silk Route Beginning", "Follow the historic eastern route towards the old Silk Road.", "5.4 km", "2–3 hrs", "Easy"),
  makeTrail(31, "Pakyong", "Rhenock", "Eastern Passage", "A quieter route through the eastern hills.", "4.1 km", "2 hrs", "Easy"),
  makeTrail(32, "Pakyong", "Aritar", "Lampokhari Loop", "A scenic lake and village journey through eastern Sikkim.", "5.1 km", "2–3 hrs", "Moderate"),
  makeTrail(33, "Pakyong", "Zuluk", "The Hairpin Road", "A high-altitude journey through the famous winding mountain road.", "7.8 km", "4 hrs", "Hard"),
  makeTrail(34, "Pakyong", "Rorathang", "River Crossing", "A lower-eastern trail through valleys and settlements.", "4.4 km", "2 hrs", "Easy"),
  makeTrail(35, "Pakyong", "Lungthung", "Cloud Ridge", "A high ridge route overlooking the eastern Himalayas.", "6.7 km", "3–4 hrs", "Hard"),

  makeTrail(36, "Soreng", "Soreng", "Quiet Soreng", "A slower journey through Sikkim's western hills.", "3.5 km", "2 hrs", "Easy"),
  makeTrail(37, "Soreng", "Rinchenpong", "Old Monastery Road", "A peaceful hill route near one of the area's historic monasteries.", "5.8 km", "2–3 hrs", "Moderate"),
  makeTrail(38, "Soreng", "Kaluk", "Village Above the Valley", "A relaxed route through scenic rural landscapes.", "4.6 km", "2 hrs", "Easy"),
  makeTrail(39, "Soreng", "Sombaria", "Western Gateway", "A village route through the quieter western hills.", "5.3 km", "2–3 hrs", "Easy"),
  makeTrail(40, "Soreng", "Sri Badam", "The Old Monastery", "Discover one of the historic religious landscapes of the district.", "4.0 km", "2 hrs", "Moderate"),
  makeTrail(41, "Soreng", "Sangadorjee", "Hidden Valley", "A tranquil journey through agricultural hills and mountain views.", "5.6 km", "2–3 hrs", "Moderate"),
  makeTrail(42, "Soreng", "Rammam", "Edge of the Hills", "A remote-feeling route along the western edge of Sikkim.", "7.2 km", "3–4 hrs", "Hard")
];

export const regionProgress = { completed: 9, total: 42 };