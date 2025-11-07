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
    "header": "eyJmaWQiOjIwNjA1NSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweGI3ZDBjNEU1MjhjMkM2MmYzOTlDOTJjQjgzNjY3NGQ4RDhEQWI1NzYifQ",
    "payload": "eyJkb21haW4iOiJ3aGF0aGF2ZXlvdWRvbmUudmVyY2VsLmFwcCJ9",
    "signature": "KhOpmFI5vMx9GdFM+ler58WHNZ7ZposxHUYgEcBRHs1oRT+4vbKfzzDIU1Rn5p8aPIhVXk9gUd/1OrF6112QfRw="
  },
  baseBuilder:{
    "ownerAddress": "0xBc402e0B7A7fc5082a3716095935B676cA21B3AB"
  },
  miniapp: {
    version: "1",
    name: "What Have You Done", 
    subtitle: "Track your wins, big and small", 
    description: "A beautiful app to track your daily accomplishments and celebrate your wins with emoji reactions",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/hero.jpg`,
    splashImageUrl: `${ROOT_URL}/hero.jpg`,
    splashBackgroundColor: "#667eea",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["productivity", "self-improvement", "tracking", "accomplishments"],
    heroImageUrl: `${ROOT_URL}/hero.jpg`, 
    tagline: "Celebrate every win, no matter how small",
    ogTitle: "What Have You Done - Track Your Accomplishments",
    ogDescription: "A beautiful app to track your daily accomplishments and celebrate your wins",
    ogImageUrl: `${ROOT_URL}/hero.jpg`,
  },
} as const;

