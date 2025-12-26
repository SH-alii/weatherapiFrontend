import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const days = searchParams.get('days');

  if (!city || !days) {
    return NextResponse.json(
      { error: 'Missing city or days parameter' },
      { status: 400 }
    );
  }

  try {
    // Backend URL
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.BACKEND_URL ||
      'https://weather-a-pi-backend-26vz8adoc-alis-projects-45358dbe.vercel.app';

    const url = new URL(`${backendUrl}/weather/average`);
    url.searchParams.set('city', city);
    url.searchParams.set('days', days);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Backend error (${response.status}):`, error);
      return NextResponse.json(
        { error: 'Failed to fetch from backend' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
