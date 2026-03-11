/**
 * Tests for API route handlers.
 * These test the fallback behavior when API keys are not configured.
 */

// We need to test the route handlers directly
// Since they use the Request/Response API, we mock them

describe("API route: /api/weather", () => {
  it("returns valid fallback weather data without API key", async () => {
    // Import the route handler
    const { GET } = await import("@/app/api/weather/route");

    const url = new URL("http://localhost:3000/api/weather?lat=37.7459&lng=-119.5933&startDate=2026-06-15");
    const request = new Request(url.toString());

    const response = await GET(request);
    expect(response.status).toBe(200);

    const json = await response.json();
    // Route wraps data in { daily: [...], source: "fallback" }
    const data = json.daily;
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(7);

    for (const day of data) {
      expect(day).toHaveProperty("date");
      expect(day).toHaveProperty("dayOfWeek");
      expect(day).toHaveProperty("tempHighF");
      expect(day).toHaveProperty("tempLowF");
      expect(day).toHaveProperty("condition");
      expect(day).toHaveProperty("precipChance");
      expect(typeof day.tempHighF).toBe("number");
      expect(typeof day.tempLowF).toBe("number");
      expect(day.tempHighF).toBeGreaterThan(day.tempLowF);
    }
  });
});

describe("API route: /api/alerts", () => {
  it("returns empty alerts array without API key", async () => {
    const { GET } = await import("@/app/api/alerts/route");

    const request = new Request("http://localhost:3000/api/alerts");
    const response = await GET(request);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.source).toBe("stub");
    expect(Array.isArray(json.alerts)).toBe(true);
    expect(json.alerts.length).toBe(0);
  });
});

describe("API route: /api/busyness", () => {
  it("returns valid crowd data without API key", async () => {
    const { GET } = await import("@/app/api/busyness/route");

    const url = new URL(
      "http://localhost:3000/api/busyness?zoneId=yosemite-valley&startDate=2026-06-15"
    );
    const request = new Request(url.toString());

    const response = await GET(request);
    expect(response.status).toBe(200);

    const json = await response.json();
    // Route wraps data in { daily: [...], source: "scoring" }
    const data = json.daily;
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(7);

    const validLevels = ["low", "moderate", "high", "unknown"];
    for (const day of data) {
      expect(day).toHaveProperty("date");
      expect(day).toHaveProperty("dayOfWeek");
      expect(day).toHaveProperty("overallLevel");
      expect(validLevels).toContain(day.overallLevel);
    }

    expect(json.source).toBe("scoring");
  });
});

describe("API route: /api/availability", () => {
  it("returns valid fallback availability data without API key", async () => {
    const { GET } = await import("@/app/api/availability/route");

    const url = new URL(
      "http://localhost:3000/api/availability?facilityId=232447&startDate=2026-06-15"
    );
    const request = new Request(url.toString());

    const response = await GET(request);
    expect(response.status).toBe(200);

    const json = await response.json();
    // Route wraps data in { availability: [...], source: "fallback" }
    const data = json.availability;
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(7);

    for (const day of data) {
      expect(day).toHaveProperty("date");
      expect(day).toHaveProperty("totalSites");
      expect(day).toHaveProperty("availableSites");
      expect(day).toHaveProperty("percentBooked");
      expect(day.totalSites).toBeGreaterThan(0);
      expect(day.percentBooked).toBeGreaterThanOrEqual(0);
      expect(day.percentBooked).toBeLessThanOrEqual(100);
    }

    expect(json.source).toBe("fallback");
  });
});
