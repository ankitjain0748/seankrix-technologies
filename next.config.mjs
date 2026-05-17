// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // Awaiken Demo Images
      {
        protocol: "https",
        hostname: "demo.awaikenthemes.com",
      },

      // WordPress uploads/CDN
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  poweredByHeader: false,

  compress: true,

  productionBrowserSourceMaps: false,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production",
  },

  async headers() {
    return [
      {
        source: "/(.*)",

        headers: [
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },

          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },

          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },

          {
            key: "Strict-Transport-Security",
            value:
              "max-age=63072000; includeSubDomains; preload",
          },

          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=()",
          },

          // FIXED CSP
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self' data: blob: https:;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: blob: https:;
              font-src 'self' data: https:;
              connect-src 'self' https:;
              frame-src 'self' https:;
            `.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;