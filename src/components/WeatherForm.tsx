"use client";

import React from "react";

interface WeatherFormProps {
  onSubmit: (city: string, days: number) => void;
  isLoading: boolean;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit, isLoading }) => {
  const [city, setCity] = React.useState("");
  const [days, setDays] = React.useState(7);
  const [errors, setErrors] = React.useState<{ city?: string; days?: string }>(
    {}
  );

  const validateForm = (): boolean => {
    const newErrors: { city?: string; days?: string } = {};

    if (!city.trim()) {
      newErrors.city = "City name is required";
    } else if (city.trim().length < 2) {
      newErrors.city = "City name must be at least 2 characters";
    }

    if (days < 1 || days > 90) {
      newErrors.days = "Days must be between 1 and 90";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(city, days);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
        Weather App
      </h1>
      <p className="text-gray-600 text-center mb-6 text-sm">
        Get average temperature data for any city
      </p>

      <div className="mb-5">
        <label
          htmlFor="city"
          className="block text-gray-700 font-semibold mb-2"
        >
          City Name
        </label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (errors.city) setErrors({ ...errors, city: undefined });
          }}
          placeholder="e.g., London, New York, Tokyo"
          disabled={isLoading}
          className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-colors ${
            errors.city
              ? "border-red-400 bg-red-50 text-gray-900"
              : "border-gray-300 bg-white text-gray-900"
          } ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-gray-400 focus:border-blue-500 focus:outline-none"
          }`}
        />
        {errors.city && (
          <p className="text-red-600 text-sm font-medium mt-1">{errors.city}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="days"
          className="block text-gray-700 font-semibold mb-2"
        >
          Number of Days (1-90)
        </label>
        <div className="flex items-center gap-4">
          <input
            id="days"
            type="range"
            min="1"
            max="90"
            value={days}
            onChange={(e) => {
              setDays(parseInt(e.target.value, 10));
              if (errors.days) setErrors({ ...errors, days: undefined });
            }}
            disabled={isLoading}
            className={`flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
          <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg min-w-fit">
            {days} days
          </div>
        </div>
        {errors.days && (
          <p className="text-red-600 text-sm font-medium mt-1">{errors.days}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all text-lg ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95"
        }`}
      >
        {isLoading ? "Loading..." : "Get Temperature"}
      </button>
    </form>
  );
};

export default WeatherForm;
