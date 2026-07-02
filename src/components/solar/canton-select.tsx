"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cantons } from "@/lib/solar/canton-data";

type CantonSelectProps = {
  value?: string;
  onValueChange: (value: string) => void;
  id?: string;
  invalid?: boolean;
};

export function CantonSelect({
  value,
  onValueChange,
  id,
  invalid,
}: CantonSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(typeof v === "string" ? v : "")}
    >
      <SelectTrigger
        id={id}
        aria-invalid={invalid}
        className="h-12 w-full px-3 text-sm"
      >
        <SelectValue placeholder="Kanton wählen" />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {cantons.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {c.name} ({c.code})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
