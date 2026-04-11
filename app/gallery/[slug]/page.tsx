import { PRIVATE_GALLERIES } from '@/src/data/gallery';
import { GalleryPageClient } from '@/components/modules/GalleryPageClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return PRIVATE_GALLERIES.map((event) => ({
    slug: event.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = PRIVATE_GALLERIES.find(g => g.slug === slug);

  if (!event) {
    notFound();
  }

  return <GalleryPageClient event={event} />;
}
