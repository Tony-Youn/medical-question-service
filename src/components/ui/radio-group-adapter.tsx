"use client";

import React from "react";
import {
  RadioGroup as RadixRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface RadioGroupProps {
  name: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  variant?: "default" | "cards";
}

/**
 * A backward-compatible RadioGroup component that accepts the older options-based API
 * but renders using the new Radix UI RadioGroup under the hood.
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value = "",
  onChange,
  orientation = "vertical",
  className,
  variant = "default",
}) => {
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  if (variant === "cards") {
    return (
      <RadixRadioGroup
        value={value}
        onValueChange={handleValueChange}
        className={cn(
          "grid gap-3",
          orientation === "horizontal" ? "grid-cols-2" : "grid-cols-1",
          className
        )}
      >
        {options.map((option, index) => (
          <label
            key={`${name}-${option.value}-${index}`}
            htmlFor={`${name}-${option.value}-${index}`}
            className={cn(
              "flex items-center justify-between rounded-md border-2 p-4 cursor-pointer transition-all duration-200 ease-in-out",
              value === option.value
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            )}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value={option.value}
                id={`${name}-${option.value}-${index}`}
                className="data-[state=checked]:border-primary"
              />
              <div>{option.label}</div>
            </div>
          </label>
        ))}
      </RadixRadioGroup>
    );
  }

  return (
    <RadixRadioGroup
      value={value}
      onValueChange={handleValueChange}
      className={cn(
        orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3",
        className
      )}
    >
      {options.map((option, index) => (
        <div
          key={`${name}-${option.value}-${index}`}
          className="flex items-center space-x-2"
        >
          <RadioGroupItem
            value={option.value}
            id={`${name}-${option.value}-${index}`}
            className="data-[state=checked]:border-primary"
          />
          <Label
            htmlFor={`${name}-${option.value}-${index}`}
            className="cursor-pointer"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadixRadioGroup>
  );
};
