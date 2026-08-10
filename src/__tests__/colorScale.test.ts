import { scoreToColor, EMPTY_COLOR } from "@/lib/utils/colorScale";

describe("scoreToColor", () => {
  it("returns valid hex color strings", () => {
    for (let i = 0; i <= 10; i++) {
      const color = scoreToColor(i);
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("returns paper for score 0", () => {
    const color = scoreToColor(0);
    expect(color).toBe("#f4f1ea");
  });

  it("returns ink for score 10", () => {
    const color = scoreToColor(10);
    expect(color).toBe("#1d1c19");
  });

  it("clamps values below 0", () => {
    const color = scoreToColor(-5);
    expect(color).toBe(scoreToColor(0));
  });

  it("clamps values above 10", () => {
    const color = scoreToColor(15);
    expect(color).toBe(scoreToColor(10));
  });

  it("produces different colors for different scores", () => {
    const low = scoreToColor(1);
    const mid = scoreToColor(5);
    const high = scoreToColor(9);
    expect(low).not.toBe(mid);
    expect(mid).not.toBe(high);
    expect(low).not.toBe(high);
  });
});

describe("EMPTY_COLOR", () => {
  it("is a valid hex color", () => {
    expect(EMPTY_COLOR).toMatch(/^#[0-9a-f]{6}$/);
  });
});
