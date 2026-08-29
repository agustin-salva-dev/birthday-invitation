// Google Calendar URL generator. (SRP — single responsibility: calendar links)

import { EVENT, CALENDAR_EVENT } from "./constants";

function formatDateForCalendar(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0]
    .concat("Z");
}

export function buildGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: CALENDAR_EVENT.title,
    dates: `${formatDateForCalendar(EVENT.date)}/${formatDateForCalendar(EVENT.endTime)}`,
    details: CALENDAR_EVENT.description,
    location: CALENDAR_EVENT.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
