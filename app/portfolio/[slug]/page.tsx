import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/portfolio";
import ProjectPageClient from "@/components/modules/ProjectPageClient";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Matthew Pinho`,
      description: project.behindTheLens || project.description,
      images: [
        {
          url: project.imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Get next project for CTA
  let nextProject = null;
  if (project.nextProjectSlug) {
    nextProject = getProjectBySlug(project.nextProjectSlug);
  }

  return <ProjectPageClient project={project} nextProject={nextProject} />;
}
