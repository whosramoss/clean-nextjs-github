const isLocalMetadata = true;
const META_URL = "https://github.com/whosramoss/clean-nextjs-github/";
const META_LOCAL_URL = "http://localhost:3000/";

export const META_IMAGE_PATH = isLocalMetadata ? "./" : META_URL;

export const META_NAME = "Clean NextJs Github";
const META_DESCRIPTION = `Next.Js Github with Clean Arch`;
const META_LOCALE = "en";

const META_SITENAME = META_URL;
const META_THUMBNAIL = `${META_URL}tree/main/public/thumbnail.png`;
const META_BASE = isLocalMetadata ? META_LOCAL_URL : META_URL;

const openDefaultMetada = {
  default: {
    title: META_NAME,
    applicationName: META_NAME,
    description: META_DESCRIPTION,
    generator: "Next.JS",
    category: "coding",
    keywords: ["code",],
    alternates: {
      canonical: META_URL,
    },
    manifest: `${META_URL}manifest.json`,
    icons: [
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        url: `${META_BASE}favicon.ico`,
      },
      { rel: "icon", type: "image/x-icon", url: `${META_BASE}favicon.ico` },
      {
        rel: "icon",
        type: "image/png",
        url: `${META_BASE}favicon-32x32.png`,
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        url: `${META_BASE}favicon-16x16.png`,
        sizes: "16x16",
      },
      {
        rel: "icon",
        type: "image/png",
        url: `${META_BASE}android-chrome-192x192.png`,
        sizes: "192x192",
      },
      {
        rel: "icon",
        type: "image/png",
        url: `${META_BASE}android-chrome-512x512.png`,
        sizes: "512x512",
      },
      {
        rel: "apple-touch-icon",
        url: `${META_BASE}apple-touch-icon.png`,
        sizes: "180x180",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    canonical: META_URL,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  graph: {
    metadataBase: new URL(META_BASE),
    openGraph: {
      title: META_NAME,
      description: META_DESCRIPTION,
      url: META_URL,
      siteName: META_SITENAME,
      locale: META_LOCALE,
      type: "website",
      images: [
        {
          url: META_THUMBNAIL,
          width: 1200,
          height: 630,
          alt: META_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: META_NAME,
      description: META_DESCRIPTION,
      images: META_THUMBNAIL,
    },
  },
};

export const baseMetadata = isLocalMetadata
  ? {
    ...openDefaultMetada.default,
    ...openDefaultMetada.robots,
  }
  : {
    ...openDefaultMetada.default,
    ...openDefaultMetada.robots,
    ...openDefaultMetada.graph,
  };
