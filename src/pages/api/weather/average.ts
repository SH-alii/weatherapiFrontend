import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city, days } = req.query;

  if (!city || !days) {
    return res.status(400).json({ error: "Missing city or days parameter" });
  }

  try {
    // Use environment variable or hardcode the backend URL for Vercel
    const apiUrl = 
      process.env.NEXT_PUBLIC_API_URL || 
      process.env.BACKEND_URL ||
      "https://weather-a-pi-backend-26vz8adoc-alis-projects-45358dbe.vercel.app";
    
    const response = await axios.get(`${apiUrl}/weather/average`, {
      params: {
        city,
        days,
      },
      timeout: 10000,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("API Error:", error.message);
    console.error("Full error:", error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || error.message || "Failed to fetch weather data",
    });
  }
}
