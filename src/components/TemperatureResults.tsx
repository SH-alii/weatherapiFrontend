"use client";

import React from "react";

interface TemperatureResultsProps {
  city: string;
  country: string;
  temperature: {
    average: number;
    max: number;
    min: number;
    dataPoints: number;
    unit: string;
  };
  dateRange: {
    startDate: string;
    endDate: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const TemperatureResults: React.FC<TemperatureResultsProps> = ({
  city,
  country,
  temperature,
  dateRange,
  coordinates,
}) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        {city}, {country}
      </h2>

      <div className="mb-6 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          📍 Latitude: {coordinates.latitude.toFixed(4)}°
        </p>
        <p className="flex items-center gap-2">
          📍 Longitude: {coordinates.longitude.toFixed(4)}°
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-sm font-medium">Average</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {temperature.average}°
          </p>
          <p className="text-xs text-gray-500 mt-1">{temperature.unit}</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-sm font-medium">Max</p>
          <p className="text-3xl font-bold text-red-600 mt-1">
            {temperature.max}°
          </p>
          <p className="text-xs text-gray-500 mt-1">{temperature.unit}</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-sm font-medium">Min</p>
          <p className="text-3xl font-bold text-cyan-600 mt-1">
            {temperature.min}°
          </p>
          <p className="text-xs text-gray-500 mt-1">{temperature.unit}</p>
        </div>
      </div>

      <div className="border-t pt-4 text-sm text-gray-600">
        <p className="mb-2">
          <span className="font-semibold">Data Points:</span>{" "}
          {temperature.dataPoints} days
        </p>
        <p className="mb-1">
          <span className="font-semibold">Period:</span>
        </p>
        <p className="text-xs text-gray-500">
          {new Date(dateRange.startDate).toLocaleDateString()} →{" "}
          {new Date(dateRange.endDate).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600">
          ℹ️ Temperatures calculated from historical weather data provided by
          Open-Meteo API.
        </p>
      </div>
    </div>
  );
};

export default TemperatureResults;
