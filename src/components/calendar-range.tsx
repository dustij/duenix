"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

export default function CalendarRange() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 9),
    to: new Date(2025, 5, 26),
  });

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      className="w-full rounded-lg border"
    />
  );
}
