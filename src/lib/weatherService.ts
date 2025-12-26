import axios, { AxiosError } from "axios";

const API_BASE_URL = "/api/weather";

export interface WeatherData {
  city: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
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
}

export interface ApiError {
  message: string;
  status?: number;
}

export async function fetchWeatherData(
  city: string,
  days: number
): Promise<WeatherData> {
  try {
    const response = await axios.get<WeatherData>(`${API_BASE_URL}/average`, {
      params: {
        city: city.trim(),
        days: parseInt(days.toString(), 10),
      },
      timeout: 10000,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;

    if (axiosError.response?.status === 404) {
      throw new Error(
        `City "${city}" not found. Please check the spelling and try again.`
      );
    }

    if (axiosError.response?.status === 400) {
      const errorMsg =
        axiosError.response.data?.error || "Invalid input parameters.";
      throw new Error(errorMsg);
    }

    if (axiosError.code === "ECONNABORTED") {
      throw new Error(
        "Request timeout. The server is taking too long to respond."
      );
    }

    if (axiosError.message === "Network Error") {
      throw new Error(
        "Network error. Please check if the API server is running at " +
          API_BASE_URL
      );
    }

    throw new Error(
      axiosError.response?.data?.error ||
        "Failed to fetch weather data. Please try again."
    );
  }
}
