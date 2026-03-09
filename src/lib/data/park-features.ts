import type { FeatureCollection, LineString } from "geojson";

// ─── Road Properties ─────────────────────────────────────────────────────────

interface RoadProperties {
  name: string;
  type: "highway" | "secondary";
}

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

// ─── 1. MAJOR ROADS ─────────────────────────────────────────────────────────

/**
 * GeoJSON FeatureCollection of Yosemite National Park's major roads.
 * Coordinates are [longitude, latitude] in WGS84 (EPSG:4326).
 */
export const parkRoads: FeatureCollection<LineString, RoadProperties> = {
  type: "FeatureCollection",
  features: [
    // ── Northside Drive / Southside Drive (Valley Loop) ──────────────────
    {
      type: "Feature",
      properties: { name: "Northside Drive / Southside Drive (Valley Loop)", type: "highway" },
      geometry: {
        type: "LineString",
        coordinates: [
          // Southside Drive – heading east from the El Capitan junction area
          [-119.6380, 37.7340],
          [-119.6320, 37.7330],
          [-119.6255, 37.7325],
          [-119.6190, 37.7340],
          [-119.6130, 37.7355],
          [-119.6060, 37.7370],
          [-119.5985, 37.7380],
          [-119.5920, 37.7375],
          [-119.5860, 37.7365],
          [-119.5800, 37.7370],
          [-119.5740, 37.7380],
          [-119.5680, 37.7390],
          [-119.5620, 37.7395],
          [-119.5570, 37.7395],
          // Curry Village / Happy Isles turn-around area
          [-119.5545, 37.7390],
          // Northside Drive – heading west back to El Capitan junction
          [-119.5565, 37.7420],
          [-119.5610, 37.7430],
          [-119.5680, 37.7440],
          [-119.5740, 37.7450],
          [-119.5810, 37.7460],
          [-119.5880, 37.7465],
          [-119.5950, 37.7470],
          [-119.6020, 37.7460],
          [-119.6090, 37.7450],
          [-119.6160, 37.7440],
          [-119.6230, 37.7420],
          [-119.6300, 37.7395],
          [-119.6350, 37.7370],
          [-119.6380, 37.7340],
        ],
      },
    },

    // ── El Portal Road (Highway 140) ─────────────────────────────────────
    {
      type: "Feature",
      properties: { name: "El Portal Road (Highway 140)", type: "highway" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.7930, 37.7175], // Arch Rock Entrance
          [-119.7870, 37.7190],
          [-119.7800, 37.7210],
          [-119.7720, 37.7225],
          [-119.7640, 37.7235],
          [-119.7560, 37.7240],
          [-119.7470, 37.7250],
          [-119.7380, 37.7260],
          [-119.7290, 37.7275],
          [-119.7200, 37.7285],
          [-119.7110, 37.7300],
          [-119.7020, 37.7310],
          [-119.6930, 37.7315],
          [-119.6850, 37.7320],
          [-119.6770, 37.7330],
          [-119.6680, 37.7335],
          [-119.6590, 37.7340],
          [-119.6500, 37.7340],
          [-119.6420, 37.7340],
          [-119.6380, 37.7340], // Joins Valley Loop at El Capitan junction
        ],
      },
    },

    // ── Big Oak Flat Road (Highway 120 West) ─────────────────────────────
    {
      type: "Feature",
      properties: { name: "Big Oak Flat Road (Highway 120 West)", type: "highway" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.8760, 37.7975], // Big Oak Flat Entrance
          [-119.8700, 37.7950],
          [-119.8640, 37.7915],
          [-119.8580, 37.7880],
          [-119.8520, 37.7845],
          [-119.8460, 37.7810],
          [-119.8390, 37.7780],
          [-119.8310, 37.7760],
          [-119.8230, 37.7730],
          [-119.8150, 37.7700],
          [-119.8080, 37.7660],
          [-119.8015, 37.7610], // Crane Flat junction area
          [-119.7930, 37.7560],
          [-119.7840, 37.7530],
          [-119.7750, 37.7500],
          [-119.7650, 37.7480],
          [-119.7550, 37.7460],
          [-119.7440, 37.7440],
          [-119.7340, 37.7420],
          [-119.7220, 37.7400],
          [-119.7100, 37.7380],
          [-119.6980, 37.7360],
          [-119.6850, 37.7340],
          [-119.6720, 37.7335],
          [-119.6590, 37.7340], // Merges into Valley road system
        ],
      },
    },

    // ── Wawona Road (Highway 41) ─────────────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Wawona Road (Highway 41)", type: "highway" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.6350, 37.5065], // South Entrance
          [-119.6380, 37.5120],
          [-119.6420, 37.5185],
          [-119.6470, 37.5250],
          [-119.6520, 37.5310],
          [-119.6560, 37.5370], // Wawona area
          [-119.6580, 37.5450],
          [-119.6600, 37.5540],
          [-119.6610, 37.5640],
          [-119.6620, 37.5750],
          [-119.6640, 37.5860],
          [-119.6660, 37.5980],
          [-119.6670, 37.6100],
          [-119.6680, 37.6220],
          [-119.6670, 37.6340],
          [-119.6660, 37.6460],
          [-119.6650, 37.6580],
          [-119.6640, 37.6700],
          [-119.6630, 37.6810],
          [-119.6620, 37.6920], // Chinquapin junction area
          [-119.6600, 37.7020],
          [-119.6570, 37.7100],
          [-119.6530, 37.7160],
          [-119.6480, 37.7215],
          [-119.6450, 37.7260],
          [-119.6420, 37.7310],
          [-119.6400, 37.7340], // Joins Valley road near Bridalveil
        ],
      },
    },

    // ── Tioga Road (Highway 120 East) ────────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Tioga Road (Highway 120 East)", type: "highway" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.8015, 37.7610], // Crane Flat junction
          [-119.7940, 37.7640],
          [-119.7850, 37.7680],
          [-119.7760, 37.7720],
          [-119.7660, 37.7760],
          [-119.7560, 37.7800],
          [-119.7440, 37.7830],
          [-119.7320, 37.7860],
          [-119.7180, 37.7880],
          [-119.7040, 37.7900],
          [-119.6890, 37.7920],
          [-119.6740, 37.7940],
          [-119.6590, 37.7960],
          [-119.6430, 37.7975],
          [-119.6270, 37.8000],
          [-119.6100, 37.8030],
          [-119.5930, 37.8060],
          [-119.5760, 37.8090],
          [-119.5590, 37.8130],
          [-119.5420, 37.8170],
          [-119.5250, 37.8210],
          [-119.5080, 37.8260],
          [-119.4910, 37.8320],
          [-119.4740, 37.8380],
          [-119.4570, 37.8440],
          [-119.4400, 37.8500],
          [-119.4230, 37.8560],
          [-119.4060, 37.8620],
          [-119.3890, 37.8670],
          [-119.3720, 37.8710],
          [-119.3593, 37.8735], // Tuolumne Meadows
          [-119.3460, 37.8770],
          [-119.3320, 37.8810],
          [-119.3180, 37.8860],
          [-119.3040, 37.8910],
          [-119.2900, 37.8960],
          [-119.2780, 37.9010],
          [-119.2680, 37.9060],
          [-119.2578, 37.9106], // Tioga Pass Entrance
        ],
      },
    },

    // ── Glacier Point Road (secondary) ───────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Glacier Point Road", type: "secondary" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.6620, 37.6920], // Chinquapin junction
          [-119.6560, 37.6940],
          [-119.6480, 37.6960],
          [-119.6400, 37.6990],
          [-119.6310, 37.7020],
          [-119.6220, 37.7050],
          [-119.6140, 37.7085],
          [-119.6060, 37.7115],
          [-119.5990, 37.7150],
          [-119.5930, 37.7180],
          [-119.5880, 37.7210],
          [-119.5830, 37.7240],
          [-119.5790, 37.7270],
          [-119.5760, 37.7295],
          [-119.5726, 37.7308], // Glacier Point
        ],
      },
    },

    // ── Hetch Hetchy Road (secondary) ────────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Hetch Hetchy Road", type: "secondary" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.8530, 37.8140], // Evergreen Road junction
          [-119.8490, 37.8210],
          [-119.8460, 37.8290],
          [-119.8430, 37.8370],
          [-119.8400, 37.8450],
          [-119.8380, 37.8530],
          [-119.8340, 37.8610],
          [-119.8290, 37.8690],
          [-119.8240, 37.8770],
          [-119.8190, 37.8850],
          [-119.8140, 37.8930],
          [-119.8090, 37.9010],
          [-119.8030, 37.9100],
          [-119.7970, 37.9200],
          [-119.7920, 37.9300],
          [-119.7880, 37.9400],
          [-119.7862, 37.9497], // Hetch Hetchy Dam
        ],
      },
    },

    // ── Mariposa Grove Road (secondary) ──────────────────────────────────
    {
      type: "Feature",
      properties: { name: "Mariposa Grove Road", type: "secondary" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-119.6350, 37.5105], // Junction with Wawona Road near South Entrance
          [-119.6310, 37.5110],
          [-119.6260, 37.5115],
          [-119.6210, 37.5120],
          [-119.6160, 37.5125],
          [-119.6100, 37.5130],
          [-119.6050, 37.5138],
          [-119.6006, 37.5145], // Mariposa Grove parking
        ],
      },
    },
  ],
};

// ─── 2. MAJOR TRAILS ────────────────────────────────────────────────────────

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

// ─── 3. PARK ENTRANCES ──────────────────────────────────────────────────────

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
