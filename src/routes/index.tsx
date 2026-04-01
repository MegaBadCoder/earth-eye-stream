import { createFileRoute } from "@tanstack/react-router";

import { MtlabLandingPage } from "@/components/mtlab/landing-page";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <MtlabLandingPage />;
}
