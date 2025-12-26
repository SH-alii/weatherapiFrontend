"use client";

import React from "react";
import WeatherForm from "@/components/WeatherForm";
import { useState } from "react";
import TemperatureResults from "@/components/TemperatureResults";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { fetchWeatherData, WeatherData } from "@/lib/weatherService";

function getBackgroundColor(temperature: number): string {
  if (temperature < 0) return "from-blue-600 to-blue-800"; // Freezing
  if (temperature < 10) return "from-blue-400 to-cyan-500"; // Cold
  if (temperature < 20) return "from-cyan-400 to-teal-500"; // Cool
  if (temperature < 25) return "from-green-400 to-emerald-500"; // Mild
  if (temperature < 30) return "from-yellow-400 to-orange-400"; // Warm
  if (temperature < 35) return "from-orange-400 to-red-500"; // Hot
  return "from-red-600 to-red-800"; // Very hot
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (city: string, days: number) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await fetchWeatherData(city, days);
      setWeatherData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  const backgroundGradient = weatherData
    ? getBackgroundColor(weatherData.temperature.average)
    : "from-slate-700 to-slate-900";

  return (
    <main className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br ${backgroundGradient} transition-all duration-500`}>
      <div className="flex flex-col items-center justify-center w-full">
        {/* Form */}
        <WeatherForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Loading State */}
        {isLoading && <LoadingSpinner />}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorMessage message={error} onDismiss={handleDismissError} />
        )}

        {/* Results State */}
        {weatherData && !isLoading && !error && (
          <TemperatureResults
            city={weatherData.city}
            country={weatherData.country}
            temperature={weatherData.temperature}
            dateRange={weatherData.dateRange}
            coordinates={weatherData.coordinates}
          />
        )}

        {/* Welcome Message */}
        {!weatherData && !isLoading && !error && (
          <div className="mt-8 text-white text-center max-w-md">
            <p className="text-lg font-light">
              Enter a city name and select the number of days to view historical
              weather data.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
