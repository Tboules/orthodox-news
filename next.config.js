/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.graphassets.com", "localhost:3000"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};
