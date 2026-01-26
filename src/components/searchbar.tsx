"use client";

import { Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-row items-center gap-2">
      {/* Input */}
      <div>
        <InputGroup className="min-w-sm">
          <InputGroupInput
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {!isFocused && (
            <InputGroupAddon>
              <div className="text-gray-400">
                <span>Type </span>
                <kbd className="rounded border px-1.5 py-0.5 text-xs font-medium">
                  /
                </kbd>
                <span> to search</span>
              </div>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>
      {/* Button */}
      <div>
        <Button className="px-5">
          <div className="flex flex-row items-center gap-3">
            <Plus size={16} className="m-[-8]" />
            <span className="text-base">Add</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
