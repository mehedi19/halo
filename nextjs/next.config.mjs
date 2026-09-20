/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  /* Match the WordPress/Elementor slug convention used across the kit
     (sitemap, canonicals, nav links all use /path/). */
  trailingSlash: true,
};

export default nextConfig;
