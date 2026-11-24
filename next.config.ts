import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  // Pin the workspace root: the parent folder also holds the backend repo (api_american_glass).
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
