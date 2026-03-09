import {
  PARK_ZONES,
  YOSEMITE_CENTER,
  CROWD_COLORS,
  MONTHLY_BUSYNESS,
  DAY_OF_WEEK_MULTIPLIER,
  ZONE_POPULARITY,
  CAMPGROUND_FACILITY_IDS,
} from "@/lib/constants";

describe("constants", () => {
  describe("PARK_ZONES", () => {
    it("has at least 5 zones", () => {
      expect(PARK_ZONES.length).toBeGreaterThanOrEqual(5);
    });

    it("each zone has required fields", () => {
      for (const zone of PARK_ZONES) {
        expect(zone.id).toBeTruthy();
        expect(zone.name).toBeTruthy();
        expect(zone.description).toBeTruthy();
        expect(typeof zone.latitude).toBe("number");
        expect(typeof zone.longitude).toBe("number");
        expect(zone.latitude).toBeGreaterThan(37);
        expect(zone.latitude).toBeLessThan(39);
        expect(zone.longitude).toBeLessThan(-119);
        expect(zone.longitude).toBeGreaterThan(-120);
        expect(zone.trails.length).toBeGreaterThan(0);
      }
    });

    it("has unique zone IDs", () => {
      const ids = PARK_ZONES.map((z) => z.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("YOSEMITE_CENTER", () => {
    it("is within Yosemite bounds", () => {
      expect(YOSEMITE_CENTER.latitude).toBeGreaterThan(37);
      expect(YOSEMITE_CENTER.latitude).toBeLessThan(39);
      expect(YOSEMITE_CENTER.longitude).toBeGreaterThan(-120);
      expect(YOSEMITE_CENTER.longitude).toBeLessThan(-119);
    });
  });

  describe("CROWD_COLORS", () => {
    it("has all required levels", () => {
      expect(CROWD_COLORS.low).toBeTruthy();
      expect(CROWD_COLORS.moderate).toBeTruthy();
      expect(CROWD_COLORS.high).toBeTruthy();
      expect(CROWD_COLORS.unknown).toBeTruthy();
    });

    it("all colors are valid hex codes", () => {
      for (const color of Object.values(CROWD_COLORS)) {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      }
    });
  });

  describe("MONTHLY_BUSYNESS", () => {
    it("has all 12 months", () => {
      for (let m = 1; m <= 12; m++) {
        expect(MONTHLY_BUSYNESS[m]).toBeDefined();
        expect(MONTHLY_BUSYNESS[m]).toBeGreaterThanOrEqual(1);
        expect(MONTHLY_BUSYNESS[m]).toBeLessThanOrEqual(10);
      }
    });

    it("summer is busier than winter", () => {
      expect(MONTHLY_BUSYNESS[7]).toBeGreaterThan(MONTHLY_BUSYNESS[1]);
    });
  });

  describe("DAY_OF_WEEK_MULTIPLIER", () => {
    it("has all 7 days", () => {
      for (let d = 0; d <= 6; d++) {
        expect(DAY_OF_WEEK_MULTIPLIER[d]).toBeDefined();
        expect(DAY_OF_WEEK_MULTIPLIER[d]).toBeGreaterThan(0);
      }
    });

    it("weekends have higher multipliers than weekdays", () => {
      const saturdayMultiplier = DAY_OF_WEEK_MULTIPLIER[6];
      const tuesdayMultiplier = DAY_OF_WEEK_MULTIPLIER[2];
      expect(saturdayMultiplier).toBeGreaterThan(tuesdayMultiplier);
    });
  });

  describe("ZONE_POPULARITY", () => {
    it("has entries for all zones", () => {
      for (const zone of PARK_ZONES) {
        expect(ZONE_POPULARITY[zone.id]).toBeDefined();
      }
    });

    it("yosemite valley is the most popular", () => {
      const valleyPop = ZONE_POPULARITY["yosemite-valley"];
      for (const [id, pop] of Object.entries(ZONE_POPULARITY)) {
        if (id !== "yosemite-valley") {
          expect(valleyPop).toBeGreaterThanOrEqual(pop);
        }
      }
    });
  });

  describe("CAMPGROUND_FACILITY_IDS", () => {
    it("has at least 5 campgrounds", () => {
      expect(Object.keys(CAMPGROUND_FACILITY_IDS).length).toBeGreaterThanOrEqual(5);
    });

    it("all IDs are numeric strings", () => {
      for (const id of Object.values(CAMPGROUND_FACILITY_IDS)) {
        expect(id).toMatch(/^\d+$/);
      }
    });
  });
});
