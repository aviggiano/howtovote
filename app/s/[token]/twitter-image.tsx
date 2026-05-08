import { notFound } from "next/navigation";
import { getAllocationDataset } from "@/lib/projects";
import { buildShareImageResponse } from "@/lib/share-image";
import { alt, contentType, size } from "@/lib/share-image";
import { getSharePreviewSummary } from "@/lib/share-preview";
import { decodeShareToken } from "@/lib/url-state";

export { alt, contentType, size };

type ShareImageProps = {
  params: Promise<{ token: string }>;
};

export default async function Image({ params }: ShareImageProps) {
  const { token } = await params;
  const decodedState = decodeShareToken(token);

  if (!decodedState) {
    notFound();
  }

  const { projects } = await getAllocationDataset();
  return buildShareImageResponse(
    getSharePreviewSummary(projects, decodedState),
  );
}
