const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "What Have You Done", 
    subtitle: "Track your wins, big and small", 
    description: "A beautiful app to track your daily accomplishments and celebrate your wins with emoji reactions",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#667eea",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["productivity", "self-improvement", "tracking", "accomplishments"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "Celebrate every win, no matter how small",
    ogTitle: "What Have You Done - Track Your Accomplishments",
    ogDescription: "A beautiful app to track your daily accomplishments and celebrate your wins",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

