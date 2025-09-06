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
{
  "accountAssociation": {
    "header": "eyJmaWQiOjc1MjU0NywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDRGODdDMGVlMGRhMDkwNEQ1Mjk4MTFiNDk0OUM2MGJhNkQ2ZEFBZTkifQ",
    "payload": "eyJkb21haW4iOiJ2MC1wcm9vZi1vZi1mb2N1cy1hcHAudmVyY2VsLmFwcCJ9",
    "signature": "MHg2ODkyNjZmYzY4ZDRjZDI3NDc5NmVjMTQ4NGJjMjc4YjVhZmYxNTY5MmY0NWY5YzU4MTAzMDA3OGIxNjE3NmIxMWI2ZTM5MTgwNTUxMzUwMTY1MzBjYjhiZjEwNDRhYmY0ZTE0YTUxMzA4MTdmOTVmZThkODE5YTRiZTIyMjRhMDFi"
  }
}
