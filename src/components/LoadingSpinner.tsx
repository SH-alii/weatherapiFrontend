"use client";

import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-spin" />
        <div className="absolute inset-2 bg-white rounded-full" />
      </div>
      <p className="mt-4 text-white font-semibold text-lg">
        Fetching weather data...
      </p>
      <p className="mt-1 text-blue-100 text-sm">
        Please wait while we retrieve the data
      </p>
    </div>
  );
};

export default LoadingSpinner;
