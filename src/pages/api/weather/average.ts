import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city, days } = req.query;

  if (!city || !days) {
    return res.status(400).json({ error: 'Missing city or days parameter' });
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await axios.get(`${apiUrl}/weather/average`, {
      params: {
        city,
        days,
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('API Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || 'Failed to fetch weather data',
    });
  }
}
