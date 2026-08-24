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



];

export const regionProgress = { completed: 9, total: 42 };