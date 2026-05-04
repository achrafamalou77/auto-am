/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bynpfodragqvgrsrphgo.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'www.amineauto.dz',
      },
      {
        protocol: 'https',
        hostname: 'auto-am.vercel.app',
      },
    ],
  },
};

export default nextConfig;
