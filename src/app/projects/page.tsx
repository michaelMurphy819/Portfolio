import { getProjects } from '@/lib/projects';
import { ProjectsShowcase } from '@/components/ProjectsShowcase';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects — Michael Murphy',
  description:
    'Explore engineering projects by Michael Murphy across native iOS, full-stack distributed systems, and machine learning.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="relative min-h-screen px-6 pt-28 sm:pt-36 pb-24">
      <div className="relative z-10 mx-auto max-w-4xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
        >
          <ArrowLeft size={13} /> Back to overview
        </Link>

        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-black/[0.04] text-[11px] font-medium text-[#424245] mb-2">
            <span>Engineering Portfolio</span>
            <span>·</span>
            <span>{projects.length} Projects</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-2">
            Projects
          </h1>

          <p className="text-sm text-[#6E6E73] leading-relaxed max-w-2xl">
            Native iOS applications, full-stack web platforms, and machine learning models.
          </p>
        </div>

        <ProjectsShowcase initialProjects={projects} />
      </div>
    </main>
  );
}