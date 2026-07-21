export const siteConfig = {
  name: 'Career Copilot AI',
  description: 'AI-powered career preparation platform',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1',
  ogImage: '/og.png',
  links: {
    github: 'https://github.com/anomalyco/career-copilot-ai',
  },
};

export type SiteConfig = typeof siteConfig;
