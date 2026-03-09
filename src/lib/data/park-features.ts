import type { FeatureCollection, LineString } from "geojson";

// ─── Trail Properties ────────────────────────────────────────────────────────

interface TrailProperties {
  name: string;
  difficulty: "easy" | "moderate" | "strenuous";
}

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

// ─── MAJOR TRAILS ───────────────────────────────────────────────────────────

/**
 * GeoJSON FeatureCollection of Yosemite's popular hiking trails.
 * Coordinates are [longitude, latitude] in WGS84 (EPSG:4326).
 */
export const parkTrails: FeatureCollection<LineString, TrailProperties> = {
  type: "FeatureCollection",
  features: [
    // ── Mist Trail (strenuous) ───────────────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Mist Trail", difficulty: "strenuous" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.5585, 37.7320], // Happy Isles trailhead
          [-119.5570, 37.7310],
          [-119.5555, 37.7300],
          [-119.5535, 37.7295],
          [-119.5515, 37.7290],
          [-119.5495, 37.7285],
          [-119.5475, 37.7278],
          [-119.5458, 37.7272],
          [-119.5445, 37.7270], // Vernal Fall footbridge area
          [-119.5430, 37.7270], // Vernal Fall
          [-119.5415, 37.7262],
          [-119.5400, 37.7255],
          [-119.5385, 37.7248],
          [-119.5370, 37.7242],
          [-119.5355, 37.7238],
          [-119.5340, 37.7233],
          [-119.5320, 37.7230], // Nevada Fall
        ],
      },
    },

    // ── Yosemite Falls Trail (strenuous) ─────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Yosemite Falls Trail", difficulty: "strenuous" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.5965, 37.7465], // Trailhead near Yosemite Lodge
          [-119.5970, 37.7475],
          [-119.5975, 37.7485],
          [-119.5978, 37.7495],
          [-119.5975, 37.7505],
          [-119.5972, 37.7510],
          [-119.5968, 37.7518],
          [-119.5963, 37.7525],
          [-119.5960, 37.7532],
          [-119.5958, 37.7540],
          [-119.5955, 37.7548],
          [-119.5957, 37.7555],
          [-119.5955, 37.7565], // Upper Yosemite Fall
        ],
      },
    },

    // ── Mirror Lake Loop (easy) ──────────────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Mirror Lake Loop", difficulty: "easy" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.5610, 37.7420], // Shuttle stop near Curry Village
          [-119.5590, 37.7430],
          [-119.5570, 37.7445],
          [-119.5555, 37.7460],
          [-119.5540, 37.7478],
          [-119.5530, 37.7495],
          [-119.5520, 37.7510],
          [-119.5520, 37.7530], // Mirror Lake
          [-119.5530, 37.7540],
          [-119.5545, 37.7535],
          [-119.5555, 37.7520],
          [-119.5565, 37.7505],
          [-119.5575, 37.7488],
          [-119.5585, 37.7470],
          [-119.5595, 37.7450],
          [-119.5610, 37.7420], // Back to start
        ],
      },
    },

    // ── Valley Loop Trail (easy) ─────────────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Valley Loop Trail", difficulty: "easy" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.6370, 37.7350], // El Capitan Meadow area
          [-119.6300, 37.7355],
          [-119.6230, 37.7360],
          [-119.6150, 37.7370],
          [-119.6070, 37.7380],
          [-119.5990, 37.7390],
          [-119.5910, 37.7400],
          [-119.5830, 37.7410],
          [-119.5760, 37.7420],
          [-119.5700, 37.7425],
          [-119.5640, 37.7420],
          [-119.5590, 37.7415],
          [-119.5560, 37.7405], // Near Curry Village
          [-119.5570, 37.7390],
          [-119.5610, 37.7378],
          [-119.5680, 37.7370],
          [-119.5760, 37.7365],
          [-119.5850, 37.7360],
          [-119.5940, 37.7355],
          [-119.6030, 37.7350],
          [-119.6120, 37.7345],
          [-119.6210, 37.7342],
          [-119.6300, 37.7345],
          [-119.6370, 37.7350], // Back to El Capitan Meadow
        ],
      },
    },

    // ── Cathedral Lakes Trail (moderate) ─────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Cathedral Lakes Trail", difficulty: "moderate" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.3810, 37.8750], // Tuolumne Meadows trailhead
          [-119.3830, 37.8738],
          [-119.3850, 37.8722],
          [-119.3870, 37.8705],
          [-119.3888, 37.8685],
          [-119.3900, 37.8665],
          [-119.3918, 37.8645],
          [-119.3935, 37.8625],
          [-119.3950, 37.8600],
          [-119.3968, 37.8575],
          [-119.3985, 37.8550],
          [-119.4000, 37.8525],
          [-119.4015, 37.8500],
          [-119.4030, 37.8480],
          [-119.4050, 37.8460],
          [-119.4070, 37.8480], // Lower Cathedral Lake
        ],
      },
    },

    // ── Mariposa Grove Trail (moderate) ──────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Mariposa Grove Trail", difficulty: "moderate" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.6006, 37.5145], // Grove parking / trailhead
          [-119.5998, 37.5140],
          [-119.5990, 37.5130],
          [-119.5985, 37.5120],
          [-119.5980, 37.5100], // Grizzly Giant area
          [-119.5975, 37.5088],
          [-119.5970, 37.5075],
          [-119.5960, 37.5065],
          [-119.5950, 37.5055],
          [-119.5945, 37.5045], // Upper grove area
          [-119.5950, 37.5035],
          [-119.5960, 37.5028],
          [-119.5972, 37.5035],
          [-119.5985, 37.5048],
          [-119.5992, 37.5060],
          [-119.5998, 37.5075],
          [-119.6002, 37.5090],
          [-119.6005, 37.5110],
          [-119.6006, 37.5130],
          [-119.6006, 37.5145], // Back to trailhead
        ],
      },
    },

    // ── Panorama Trail (strenuous) ───────────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Panorama Trail", difficulty: "strenuous" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.5726, 37.7308], // Glacier Point
          [-119.5700, 37.7305],
          [-119.5670, 37.7298],
          [-119.5640, 37.7290],
          [-119.5610, 37.7282],
          [-119.5580, 37.7275],
          [-119.5555, 37.7268],
          [-119.5530, 37.7260],
          [-119.5505, 37.7255],
          [-119.5478, 37.7250],
          [-119.5450, 37.7247],
          [-119.5420, 37.7243],
          [-119.5395, 37.7240],
          [-119.5370, 37.7238],
          [-119.5345, 37.7235],
          [-119.5320, 37.7230], // Joins Mist Trail near Nevada Fall
        ],
      },
    },

    // ── Lembert Dome Trail (moderate) ────────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Lembert Dome Trail", difficulty: "moderate" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.3510, 37.8810], // Tuolumne Meadows trailhead
          [-119.3500, 37.8818],
          [-119.3490, 37.8825],
          [-119.3480, 37.8832],
          [-119.3470, 37.8838],
          [-119.3462, 37.8845],
          [-119.3455, 37.8852],
          [-119.3448, 37.8858],
          [-119.3440, 37.8865],
          [-119.3430, 37.8870], // Lembert Dome summit
        ],
      },
    },
  ],
};

// ─── PARK ENTRANCES ─────────────────────────────────────────────────────────

export const parkEntrances: ParkEntrance[] = [
  {
    id: "arch-rock",
    name: "Arch Rock Entrance",
    latitude: 37.7175,
    longitude: -119.7930,
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
    latitude: 37.9430,
    longitude: -119.8485,
    highway: "Hetch Hetchy Road",
    seasonalClosure: false,
    description: "Northwestern entrance to Hetch Hetchy area, day-use only",
  },
];
