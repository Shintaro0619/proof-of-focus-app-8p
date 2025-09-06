/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: '/api/manifest',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
