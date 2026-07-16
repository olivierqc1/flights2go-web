/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/flights2go-web',
  assetPrefix: '/flights2go-web/',
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;