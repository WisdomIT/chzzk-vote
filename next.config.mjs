/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/chzzkBase/:path*",
        destination: "https://api.chzzk.naver.com/:path*"
      },
      {
        source: "/api/proxy/gameBase/:path*",
        destination: "https://comm-api.game.naver.com/nng_main/:path*"
      }
    ]
  }
};

export default nextConfig;
