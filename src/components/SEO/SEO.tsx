import { Helmet } from "react-helmet-async";

const SITE_URL = "https://xn--80aaasagpu3bjqh7c5d.xn--p1ai";
const IMAGE = `${SITE_URL}/favicon.png`;

type Breadcrumb = {
  name: string;
  url: string;
};

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function SEO({
  title,
  description,
  canonical,
  robots = "index,follow",
  breadcrumbs = [],
}: SEOProps) {
  const canonicalUrl = `${SITE_URL}${canonical}`;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Жар птица",
    url: SITE_URL,
  };

  const breadcrumbSchema =
    breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.url}`,
          })),
        }
      : null;

  return (
    <Helmet>
      {/* Основные SEO-теги */}
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Жар птица" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:image:alt" content="Ателье «Жар птица»" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={IMAGE} />
      <meta name="twitter:image:alt" content="Ателье «Жар птица»" />

      {/* Schema.org — WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* Schema.org — BreadcrumbList */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}
    </Helmet>
  );
}