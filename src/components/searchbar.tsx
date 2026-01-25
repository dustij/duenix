"use client";

import { Plus, Search } from "lucide-react";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export function SearchBar() {
  return (
    <div className="flex flex-row items-center gap-2">
      {/* Input */}
      <div>
        <InputGroup className="min-w-sm">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {/* <InputGroupAddon align="inline-end"></InputGroupAddon> */}
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
