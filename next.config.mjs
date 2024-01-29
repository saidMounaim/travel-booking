/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bqeicuqnl4shkuur.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
