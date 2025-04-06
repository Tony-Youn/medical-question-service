"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FormCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  isActive?: boolean;
  status?: "info" | "warning" | "success" | "error" | "default";
}

const FormCard: React.FC<FormCardProps> = ({
  title,
  description,
  children,
  footer,
  className,
  isActive = true,
  status = "default",
}) => {
  // Status-based styling
  const statusStyles = {
    default: "",
    info: "border-blue-200 bg-gradient-to-b from-blue-50/70 to-blue-50/40",
    warning:
      "border-amber-200 bg-gradient-to-b from-amber-50/70 to-amber-50/40",
    success:
      "border-green-200 bg-gradient-to-b from-green-50/70 to-green-50/40",
    error: "border-red-200 bg-gradient-to-b from-red-50/70 to-red-50/40",
  };

  // Status colors for text
  const statusTextColor = {
    default: "",
    info: "text-blue-800",
    warning: "text-amber-800",
    success: "text-green-800",
    error: "text-red-800",
  };

  // Status icons
  const StatusIcon =
    status !== "default" ? (
      <div
        className={cn(
          "absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center",
          "shadow-sm transition-all duration-300",
          status === "info" && "bg-blue-100 text-blue-600",
          status === "warning" && "bg-amber-100 text-amber-600",
          status === "success" && "bg-green-100 text-green-600",
          status === "error" && "bg-red-100 text-red-600"
        )}
      >
        {status === "info" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14M8 3.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5M6.25 8c0-.414.336-.75.75-.75h.5a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25z" />
          </svg>
        )}
        {status === "warning" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              fillRule="evenodd"
              d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25zM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4m0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
              clipRule="evenodd"
            />
          </svg>
        )}
        {status === "success" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {status === "error" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14M8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4m0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    ) : null;

  return (
    <Card
      className={cn(
        "relative transition-all duration-300",
        "border border-gray-200",
        "shadow-sm hover:shadow-md",
        isActive && [
          "ring-1 ring-primary/20",
          "transform-gpu",
          "scale-100",
          "shadow-md",
        ],
        status !== "default" && statusStyles[status],
        isActive && status !== "default" && "ring-0",
        className
      )}
      style={{
        // More refined shadow effect
        boxShadow: isActive
          ? "0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1)"
          : "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      {StatusIcon}

      {(title || description) && (
        <CardHeader className={cn("pb-4", status !== "default" && "pb-3")}>
          {title && (
            <CardTitle
              className={cn(
                "text-xl font-semibold tracking-tight",
                status !== "default" && statusTextColor[status]
              )}
            >
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="mt-1.5 text-sm leading-relaxed">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}

      <CardContent
        className={cn("pt-0 px-6", !title && !description && "pt-6")}
      >
        <div className="transition-all duration-300 ease-in-out">
          {children}
        </div>
      </CardContent>

      {footer && (
        <CardFooter
          className={cn(
            "flex justify-between pt-4 pb-5 px-6 border-t",
            status === "default" ? "border-gray-100" : "border-opacity-30",
            status === "info" && "border-blue-200",
            status === "warning" && "border-amber-200",
            status === "success" && "border-green-200",
            status === "error" && "border-red-200"
          )}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default FormCard;
