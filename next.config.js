/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.ytimg.com",
      "scontent-hel3-1.cdninstagram.com",
      "scontent-arn2-1.cdninstagram.com",
      "scontent-fra3-1.cdninstagram.com",
    ],
  },
};

module.exports = nextConfig;
