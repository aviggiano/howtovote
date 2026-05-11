import type { Metadata } from "next";
import { ExplorePage } from "@/components/explore-page";
import { getExploreDataset } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Explore Donation Graph | How To Vote",
  description:
    "Inspect the donor and project network behind the Ethereum Security round, with badge-aware traces and explorer links.",
};

export default async function ExploreRoute() {
  const { graph, qfEstimateContext } = await getExploreDataset();

  return <ExplorePage graph={graph} qfEstimateContext={qfEstimateContext} />;
}
