/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted on any static host (S3, Netlify, GitHub Pages, Nginx).
  output: "export",
  // Static export cannot use the on-demand Image Optimization API.
  images: { unoptimized: true },
  // Emit folder/index.html so links work without a server rewrite layer.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
