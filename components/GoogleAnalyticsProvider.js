// app/GoogleAnalyticsProvider.js
"use client"; // Mark this file as a Client Component

import { GoogleAnalytics } from "nextjs-google-analytics";

export default function GoogleAnalyticsProvider() {
  return <GoogleAnalytics trackPageViews />;
}