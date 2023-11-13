/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  webpack5: false,
  nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = {
  env: {
    TOKEN_JSON: "kinoxapparel",
    TOKEN_PAYSTACK: "pk_test_9286738c5dddd1dd2a33753aaccc3383eb2ee96a",
  },
};
