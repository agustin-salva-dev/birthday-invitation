// GuestSearchInput — controlled search input with loading indicator. (SRP)
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface GuestSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  isSearching: boolean;
}

export function GuestSearchInput({
  value,
  onChange,
  isSearching,
}: GuestSearchInputProps) {
  return (
    <div className="relative">
      <Input
        id="guest-search-input"
        type="text"
        placeholder="Escribí tu nombre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        icon={
          isSearching ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Search size={16} />
          )
        }
        autoComplete="off"
        autoFocus
      />
    </div>
  );
}
