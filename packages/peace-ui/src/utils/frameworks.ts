export const FRAMEWORKS = {
  "next-app": {
    name: "next-app",
    label: "Next.js",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/next",
      tailwind: "https://tailwindcss.com/docs/guides/nextjs",
    },
  },
  "next-pages": {
    name: "next-pages",
    label: "Next.js",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/next",
      tailwind: "https://tailwindcss.com/docs/guides/nextjs",
    },
  },
  remix: {
    name: "remix",
    label: "Remix",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/remix",
      tailwind: "https://tailwindcss.com/docs/guides/remix",
    },
  },
  "react-router": {
    name: "react-router",
    label: "React Router",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/react-router",
      tailwind:
        "https://tailwindcss.com/docs/installation/framework-guides/react-router",
    },
  },
  vite: {
    name: "vite",
    label: "Vite",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/vite",
      tailwind: "https://tailwindcss.com/docs/guides/vite",
    },
  },
  astro: {
    name: "astro",
    label: "Astro",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/astro",
      tailwind: "https://tailwindcss.com/docs/guides/astro",
    },
  },
  laravel: {
    name: "laravel",
    label: "Laravel",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/laravel",
      tailwind: "https://tailwindcss.com/docs/guides/laravel",
    },
  },
  "tanstack-start": {
    name: "tanstack-start",
    label: "TanStack Start",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/tanstack",
      tailwind: "https://tailwindcss.com/docs/installation/using-postcss",
    },
  },
  gatsby: {
    name: "gatsby",
    label: "Gatsby",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/gatsby",
      tailwind: "https://tailwindcss.com/docs/guides/gatsby",
    },
  },
  expo: {
    name: "expo",
    label: "Expo",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/expo",
      tailwind: "https://www.nativewind.dev/docs/getting-started/installation",
    },
  },
  manual: {
    name: "manual",
    label: "Manual",
    links: {
      installation: "https://peace-ui.dev/docs/getting-started/manual",
      tailwind: "https://tailwindcss.com/docs/installation",
    },
  },
} as const

export type Framework = (typeof FRAMEWORKS)[keyof typeof FRAMEWORKS]
