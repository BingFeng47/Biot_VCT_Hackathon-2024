/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['static.lolesports.com',"s3.us-west-2.amazonaws.com","lolstatic-a.akamaihd.net"], // Add the domain here
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during builds
    },
  };
  
  export default nextConfig;