//  @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@kirin/ui'],
  compiler: { removeConsole: true },
};

export default nextConfig;
