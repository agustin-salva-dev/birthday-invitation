// GoogleCalendarButton — opens Google Calendar event creation. (SRP)
"use client";

import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildGoogleCalendarUrl } from "@/lib/calendar";

export function GoogleCalendarButton() {
  const handleClick = () => {
    window.open(buildGoogleCalendarUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      id="add-to-google-calendar"
      variant="ghost"
      size="sm"
      onClick={handleClick}
    >
      <CalendarPlus size={16} />
      Agregar a Google Calendar
    </Button>
  );
}
