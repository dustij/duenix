"use client";

import { useState } from "react";

export function Sidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex min-w-64 flex-col border-r border-gray-200 p-4"></div>
  );
}
