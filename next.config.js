/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' }
    ]
  },
  experimental: {
    // Server Actions default to a 1MB request body limit — far too small
    // for photo/PDF uploads from a phone camera. Raise it to 15MB so
    // Portfolio images, profile photos, and PDF attachments upload reliably.
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
};
module.exports = nextConfig;
