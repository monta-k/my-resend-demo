/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['resend']
  },
  env: {
    BASE_PATH: process.env.BASE_PATH
  }
}

module.exports = nextConfig
