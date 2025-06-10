import React from "react";
import { cn } from "../lib/utils";

export const FormTextarea = ({
  name,
  label,
  register,
  error,
  placeholder,
  rows = 3,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-emerald-400"
      >
        {label}
      </label>
      <textarea
        id={name}
        rows={rows}
        {...register(name)}
        placeholder={placeholder}
        className={cn(
          "block w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base resize-none",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-400 mt-1">{error.message}</p>}
    </div>
  );
};
