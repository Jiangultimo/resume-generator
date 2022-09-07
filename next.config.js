/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/resume',
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, './')
    return config
  },
  rewrites: () => {
    return [{
      source: '/',
      destination: '/index'
    }]
  }
}

module.exports = nextConfig
