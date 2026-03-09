// ─── Park Entrance ───────────────────────────────────────────────────────────

export interface ParkEntrance {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  highway: string;
  seasonalClosure: boolean;
  description: string;
}

// ─── PARK ENTRANCES ─────────────────────────────────────────────────────────

export const parkEntrances: ParkEntrance[] = [
  {
    id: "arch-rock",
    name: "Arch Rock Entrance",
    latitude: 37.6861,
    longitude: -119.7310,
    highway: "Highway 140",
    seasonalClosure: false,
    description: "Year-round western entrance via El Portal Road",
  },
  {
    id: "big-oak-flat",
    name: "Big Oak Flat Entrance",
    latitude: 37.7975,
    longitude: -119.8760,
    highway: "Highway 120 West",
    seasonalClosure: false,
    description: "Year-round northwestern entrance",
  },
  {
    id: "south-entrance",
    name: "South Entrance",
    latitude: 37.5065,
    longitude: -119.6350,
    highway: "Highway 41",
    seasonalClosure: false,
    description: "Year-round southern entrance via Wawona",
  },
  {
    id: "tioga-pass",
    name: "Tioga Pass Entrance",
    latitude: 37.9106,
    longitude: -119.2578,
    highway: "Highway 120 East",
    seasonalClosure: true,
    description: "Eastern entrance, closed November through late May",
  },
  {
    id: "hetch-hetchy",
    name: "Hetch Hetchy Entrance",
    latitude: 37.8936,
    longitude: -119.8416,
    highway: "Hetch Hetchy Road",
    seasonalClosure: false,
    description: "Northwestern entrance to Hetch Hetchy area, day-use only",
  },
];
