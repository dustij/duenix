"use client";
import { BellIcon, HelpCircle, Settings } from "lucide-react";
import { AvatarDropdown } from "./avatar-dropdown";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="flex w-full flex-row justify-between border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold text-sky-400">DUENIX</span>
      </div>
      <div className="flex flex-row gap-1">
        <Button variant="ghost" className="rounded-full" size="icon_md">
          <BellIcon />
        </Button>
        <Button variant="ghost" className="rounded-full" size="icon_md">
          <HelpCircle />
        </Button>
        <Button variant="ghost" className="rounded-full" size="icon_md">
          <Settings />
        </Button>
        <div className="flex items-center justify-center pl-3">
          <AvatarDropdown />
        </div>
      </div>
    </header>
  );
}
