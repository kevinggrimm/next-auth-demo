/**
 * @type {import('next').NextConfig}
 */

// You might need to insert additional domains in script-src if you are using external services
// https://stripe.com/docs/security/guide#content-security-policy
const ContentSecurityPolicy = `
  default-src 
    'self';
  script-src
    https://www.googletagmanager.com/
    https://js.stripe.com
    https://maps.googleapis.com
    'self'
    'unsafe-eval' 
    'unsafe-inline';
  style-src 
    'self' 
    'unsafe-inline';
  img-src 
    * 
    blob: 
    data:;
  media-src 
    'none';
  connect-src 
    https://api.stripe.com
    https://maps.googleapis.com
    *;
  font-src 
    https://fonts.gstatic.com
    ;
  frame-src
    https://js.stripe.com
    https://hooks.stripe.com
    ;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  eslint: {
    dirs: ["pages", "components", "common", "_texts"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  compiler: {
    styledComponents: true,
  }
};

// You might need to insert additional domains in script-src if you are using external services
// https://security.stackexchange.com/questions/205772/trying-to-understand-content-security-policy-why-do-some-sites-e-g-google-use
// https://developers.google.com/tag-platform/tag-manager/web/csp#universal_analytics_google_analytics
// https://stackoverflow.com/questions/41395591/google-analytics-content-security-policy
// https://developers.google.com/tag-platform/tag-manager/web/csp#universal_analytics_google_analytics

module.exports = nextConfig
