"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";

// CheckboxGroup adapter component
export interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  name: string;
  options: CheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  options,
  values = [],
  onChange,
  className,
}) => {
  const handleCheckboxChange = (
    value: string,
    checked: boolean | "indeterminate"
  ) => {
    if (checked === true) {
      onChange([...values, value]);
    } else if (checked === false) {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={`${name}-${option.value}`}
            checked={values.includes(option.value)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(option.value, checked)
            }
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export { Checkbox };
