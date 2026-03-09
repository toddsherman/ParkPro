import { WeekSelection } from "../types";
import { format, startOfWeek, endOfWeek, addWeeks } from "date-fns";

/**
 * Get the week selection for a given date (week starts Monday)
 */
export function getWeekForDate(date: Date): WeekSelection {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });

  return {
    startDate: format(start, "yyyy-MM-dd"),
    endDate: format(end, "yyyy-MM-dd"),
    label: `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`,
  };
}

/**
 * Generate a list of selectable weeks starting from today
 */
export function getSelectableWeeks(count: number = 12): WeekSelection[] {
  const weeks: WeekSelection[] = [];
  const today = new Date();
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });

  for (let i = 0; i < count; i++) {
    const weekStart = addWeeks(currentWeekStart, i);
    weeks.push(getWeekForDate(weekStart));
  }

  return weeks;
}

/**
 * Get day names for a week starting from a given Monday
 */
export function getWeekDays(startDateStr: string): Date[] {
  const start = new Date(startDateStr + "T00:00:00");
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}
