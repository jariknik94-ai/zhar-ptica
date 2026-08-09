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
  localBusiness?: boolean;
}

export default function SEO({
  title,
  description,
  canonical,
  robots = "index,follow",
  breadcrumbs = [],
  localBusiness = false,
}: SEOProps) {

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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Жар птица",
    url: SITE_URL,
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": [
      "LocalBusiness",
      "DryCleaningOrLaundry",
      "ProfessionalService",
    ],
    name: "Ателье «Жар птица»",
    foundingDate: "2011",
    url: SITE_URL,
    image: IMAGE,
    logo: IMAGE,
    telephone: "+79516125805",
    priceRange: "₽",
    currenciesAccepted: "RUB",
    paymentAccepted: [
      "Cash",
      "Bank Transfer"
    ],
    description:
      "Ателье «Жар птица» с 2011 года выполняет реставрацию подушек, одеял и перин. Очистка пухо-перьевого наполнителя, замена наперников, пошив постельного белья.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "проспект Ленина, 7",
      addressLocality: "Прокопьевск",
      addressRegion: "Кемеровская область — Кузбасс",
      postalCode: "653053",
      addressCountry: {
        "@type": "Country",
        name: "Россия",
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.864358,
      longitude: 86.640932,
    },
    hasMap:
      "https://2gis.ru/prokopevsk/firm/844954211643087",
    sameAs: [
      "https://wa.me/79039410157",
      "https://t.me/podushkaodeilo",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Прокопьевск",
    },
  };

  return (
    <Helmet>
    <meta name="theme-color" content="#07111f" />
    <meta
  name="author"
  content="Ателье Жар птица"
    />

      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="robots" content={robots} />

      <link
        rel="canonical"
        href={`${SITE_URL}${canonical}`}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Жар птица" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:url" content={`${SITE_URL}${canonical}`} />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={IMAGE}
      />

      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {localBusiness && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

    </Helmet>
  );
}