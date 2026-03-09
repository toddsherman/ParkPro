import { getWeekForDate, getSelectableWeeks, getWeekDays } from "@/lib/utils/dates";

// Helper to create local dates (avoids timezone issues with ISO string parsing)
function localDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

describe("date utilities", () => {
  describe("getWeekForDate", () => {
    it("returns a week starting on Monday", () => {
      // March 11, 2026 is a Wednesday
      const week = getWeekForDate(localDate(2026, 3, 11));
      expect(week.startDate).toBe("2026-03-09"); // Monday
      expect(week.endDate).toBe("2026-03-15"); // Sunday
    });

    it("returns correct label format", () => {
      const week = getWeekForDate(localDate(2026, 3, 11));
      expect(week.label).toContain("Mar");
      expect(week.label).toContain("2026");
    });

    it("handles Monday correctly", () => {
      const week = getWeekForDate(localDate(2026, 3, 9)); // Monday
      expect(week.startDate).toBe("2026-03-09");
    });

    it("handles Sunday correctly", () => {
      const week = getWeekForDate(localDate(2026, 3, 15)); // Sunday
      expect(week.startDate).toBe("2026-03-09");
      expect(week.endDate).toBe("2026-03-15");
    });
  });

  describe("getSelectableWeeks", () => {
    it("returns the requested number of weeks", () => {
      const weeks = getSelectableWeeks(12);
      expect(weeks).toHaveLength(12);
    });

    it("returns consecutive weeks", () => {
      const weeks = getSelectableWeeks(4);
      for (let i = 1; i < weeks.length; i++) {
        const prevEnd = new Date(weeks[i - 1].endDate + "T12:00:00");
        const currStart = new Date(weeks[i].startDate + "T12:00:00");
        const diffDays =
          Math.round((currStart.getTime() - prevEnd.getTime()) / (1000 * 60 * 60 * 24));
        expect(diffDays).toBe(1); // Sunday to Monday = 1 day
      }
    });

    it("each week has a valid label", () => {
      const weeks = getSelectableWeeks(3);
      for (const week of weeks) {
        expect(week.label).toBeTruthy();
        expect(week.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(week.endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });

  describe("getWeekDays", () => {
    it("returns 7 days", () => {
      const days = getWeekDays("2026-03-09");
      expect(days).toHaveLength(7);
    });

    it("returns consecutive days", () => {
      const days = getWeekDays("2026-03-09");
      for (let i = 1; i < days.length; i++) {
        const diff = days[i].getTime() - days[i - 1].getTime();
        expect(diff).toBe(86400000);
      }
    });

    it("starts on the given date", () => {
      const days = getWeekDays("2026-03-09");
      expect(days[0].getDate()).toBe(9);
      expect(days[0].getMonth()).toBe(2); // March = 2
    });
  });
});
