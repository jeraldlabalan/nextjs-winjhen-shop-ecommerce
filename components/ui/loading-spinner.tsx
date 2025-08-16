import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "blue" | "green" | "purple" | "orange" | "pink";
  text?: string;
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12"
};

const colorClasses = {
  blue: "border-blue-600",
  green: "border-green-600",
  purple: "border-purple-600",
  orange: "border-orange-600",
  pink: "border-pink-600"
};

export function LoadingSpinner({ 
  size = "md", 
  color = "orange", 
  text, 
  className 
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div 
        className={cn(
          "animate-spin rounded-full border-b-2",
          sizeClasses[size],
          colorClasses[color]
        )}
      />
      {text && (
        <p className={cn(
          "mt-2 text-gray-600",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base",
          size === "xl" && "text-lg"
        )}>
          {text}
        </p>
      )}
    </div>
  );
}

export function LoadingSpinnerFullScreen({ 
  text = "Loading...",
  color = "orange",
  className 
}: Omit<LoadingSpinnerProps, "size">) {
  return (
    <div className={cn("flex items-center justify-center min-h-screen bg-gray-50", className)}>
      <LoadingSpinner size="xl" color={color} text={text} />
    </div>
  );
}

export function LoadingSpinnerOverlay({ 
  text = "Loading...",
  color = "orange",
  className 
}: Omit<LoadingSpinnerProps, "size">) {
  return (
    <div className={cn("fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50", className)}>
      <LoadingSpinner size="lg" color={color} text={text} />
    </div>
  );
}
