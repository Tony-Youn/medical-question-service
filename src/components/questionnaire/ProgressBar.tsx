"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  stepNames?: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className,
  stepNames,
}) => {
  const progress = Math.min(
    100,
    Math.round((currentStep / Math.max(1, totalSteps - 1)) * 100)
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Progress info */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <div className="font-medium text-primary">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]"></span>
            {stepNames?.[currentStep] || `단계 ${currentStep + 1}`}
          </span>
        </div>

        <div className="text-gray-700 bg-gray-100 py-1.5 px-4 rounded-full text-xs font-medium shadow-sm">
          <span className="hidden xs:inline">진행률 </span>
          {progress}% 완료
        </div>
      </div>

      {/* Main progress bar */}
      <div
        className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-8 shadow-inner"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`진행률: ${progress}%`}
      >
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/80 via-primary/90 to-primary transition-all duration-700 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.2)_25%,_rgba(255,255,255,0.2)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.2)_75%,_rgba(255,255,255,0.2))] bg-[length:20px_20px] animate-[progress-bar-stripes_1s_linear_infinite]"></div>
        </div>
      </div>

      {/* Step indicators */}
      {stepNames && (
        <div className="relative flex justify-between mt-4 px-1">
          {/* Step connector line - Placed as a background line */}
          <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>

          {stepNames.map((name, index) => {
            const isActive = index <= currentStep;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isLast = index === stepNames.length - 1;

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center relative",
                  "transition-all duration-500 ease-in-out",
                  isActive ? "text-primary" : "text-gray-400"
                )}
                style={{
                  width:
                    stepNames.length > 1
                      ? `${100 / stepNames.length}%`
                      : "100%",
                }}
              >
                {/* Completed connector line */}
                {index < stepNames.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-3 h-0.5 transition-all duration-700 ease-out",
                      isCompleted ? "bg-primary" : "bg-transparent"
                    )}
                    style={{
                      right: 0,
                      width: isCompleted ? "100%" : "0%",
                      left: "50%",
                    }}
                  />
                )}

                {/* Step circle */}
                <div
                  className={cn(
                    "relative w-6 h-6 rounded-full flex items-center justify-center",
                    "transition-all duration-500 ease-in-out",
                    "border-2 shadow-sm",
                    isCurrent
                      ? "border-primary bg-white ring-4 ring-primary/20 scale-115 shadow-md"
                      : isCompleted
                      ? "border-primary bg-primary"
                      : "border-gray-300 bg-white"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <svg
                      className="w-3 h-3 text-white drop-shadow-sm"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                  ) : (
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        isCurrent ? "text-primary" : "text-gray-500"
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step name */}
                <span
                  className={cn(
                    "text-xs transition-all duration-300 pt-2",
                    "max-w-[120px] truncate text-center",
                    isCurrent
                      ? "font-semibold text-primary opacity-100 translate-y-0"
                      : isActive
                      ? "font-medium text-gray-700 opacity-90 translate-y-0"
                      : "font-medium text-gray-500 opacity-70 translate-y-0",
                    "hidden xs:block"
                  )}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
