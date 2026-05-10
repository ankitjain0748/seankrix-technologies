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

          // XSS Protection
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },

          // Prevent Clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },

          // Content Type Security
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // Referrer Security
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },

          // HTTPS Security
          {
            key: "Strict-Transport-Security",
            value:
              "max-age=63072000; includeSubDomains; preload",
          },

          // Permissions Policy
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=()",
          },

          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://images.unsplash.com;
              font-src 'self' data:;
              connect-src 'self' https://api.emailjs.com;
            `
              .replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;