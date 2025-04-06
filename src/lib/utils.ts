import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge and compose Tailwind CSS classes using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date object to a localized string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date object to a localized date and time string
 */
export function formatDateTime(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Calculate age from birth year
 */
export function calculateAge(birthYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}

/**
 * Calculate BMI from height (cm) and weight (kg)
 */
export function calculateBMI(height: number, weight: number): number {
  if (!height || !weight) return 0;
  // Convert height from cm to m
  const heightInMeters = height / 100;
  return +(weight / (heightInMeters * heightInMeters)).toFixed(1);
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "저체중";
  if (bmi < 23) return "정상";
  if (bmi < 25) return "과체중";
  if (bmi < 30) return "비만";
  return "고도비만";
}
