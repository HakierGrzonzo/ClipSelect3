/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
        "@mui/icons-material": {
            transform: "@mui/icons-material/{{member}}",
        },
    },
    typescript: {
      ignoreBuildErrors: true
    },
  eslint: {
    ignoreDuringBuilds: true
  },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "source.unsplash.com",
                port: "",
                pathname: "/random",
            },
        ],
    },
  output: 'standalone',
}

module.exports = nextConfig
