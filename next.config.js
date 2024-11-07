/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            url: require.resolve("url"), // Додає підтримку для `node:url`
        };
        return config;
    },
};

module.exports = nextConfig;
