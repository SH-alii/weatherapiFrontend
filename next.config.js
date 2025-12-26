/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/weather/:path*",
          destination: `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
          }/weather/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
