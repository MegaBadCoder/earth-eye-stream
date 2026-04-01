import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "МТ-ЛАБ",
  url: "https://id-preview--a52c278b-8112-484b-b996-d7eb9b42a3a9.lovable.app",
  email: "info@mtlab.space",
  telephone: "+7 (499) 649-49-99",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Раевского, д. 4",
    addressLocality: "Москва",
    postalCode: "121151",
    addressCountry: "RU",
  },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "МТ-ЛАБ — спутниковый мониторинг Земли" },
      {
        name: "description",
        content:
          "ПГО от МТ-ЛАБ — платформа геопространственной осведомлённости для государства, агрохолдингов, банков, лесопользователей и судоходных компаний.",
      },
      { name: "author", content: "МТ-ЛАБ" },
      { property: "og:title", content: "МТ-ЛАБ — спутниковый мониторинг Земли" },
      {
        property: "og:description",
        content:
          "ПГО от МТ-ЛАБ: актуальные снимки, мониторинг, аналитика и API на базе собственных вычислительных мощностей.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      {
        property: "og:url",
        content: "https://id-preview--a52c278b-8112-484b-b996-d7eb9b42a3a9.lovable.app",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fe8798cf-5e8b-4e70-96a0-8b6c41e56878/id-preview-0c868228--a52c278b-8112-484b-b996-d7eb9b42a3a9.lovable.app-1775056155586.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "МТ-ЛАБ — спутниковый мониторинг Земли" },
      {
        name: "twitter:description",
        content:
          "ПГО от МТ-ЛАБ: геопространственная аналитика, мониторинг изменений и API для государства и бизнеса.",
      },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fe8798cf-5e8b-4e70-96a0-8b6c41e56878/id-preview-0c868228--a52c278b-8112-484b-b996-d7eb9b42a3a9.lovable.app-1775056155586.png" },
      { name: "description", content: "Lovable Generated Project" },
      { property: "og:description", content: "Lovable Generated Project" },
      { name: "twitter:description", content: "Lovable Generated Project" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://id-preview--a52c278b-8112-484b-b996-d7eb9b42a3a9.lovable.app",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Outlet />
    </>
  );
}
