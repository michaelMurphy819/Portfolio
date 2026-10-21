import { getProjectById, getProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Smartphone,
  Globe,
  Cpu,
  Sparkles,
  FileText,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Michael Murphy`,
    description: project.tagline || project.solution,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  const allProjects = await getProjects();
  const otherProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 2);

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'ios':
        return <Smartphone size={13} className="text-[#0071E3]" />;
      case 'fullstack':
        return <Globe size={13} className="text-emerald-600" />;
      case 'systems':
        return <Cpu size={13} className="text-purple-600" />;
      case 'ai':
        return <Sparkles size={13} className="text-amber-600" />;
      default:
        return <FileText size={13} className="text-zinc-600" />;
    }
  };

  return (
    <main className="relative min-h-screen px-6 pt-28 sm:pt-36 pb-24">
      <div className="relative z-10 mx-auto max-w-4xl space-y-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
        >
          <ArrowLeft size={13} /> Back to overview
        </Link>

        {/* Hero Header */}
        <div className="apple-card p-6 sm:p-8 bg-white border border-black/[0.08]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-black/[0.04] text-xs font-medium text-[#424245]">
              {getCategoryIcon(project.category)}
              <span className="capitalize">{project.category}</span>
            </span>

            {project.status && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
                {project.status}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-2">
            {project.title}
          </h1>

          {project.tagline && (
            <p className="text-sm sm:text-base font-medium text-[#0071E3] max-w-2xl leading-relaxed mb-5">
              {project.tagline}
            </p>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-black/[0.06]">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-button-secondary px-4 py-2 text-xs font-semibold"
              >
                <Github size={13} /> View Source Code
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target={project.live_url.startsWith('http') ? '_blank' : undefined}
                rel={project.live_url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="apple-button-primary px-4 py-2 text-xs font-semibold"
              >
                <ExternalLink size={13} /> {project.live_url === '/research' ? 'Read Research Paper' : 'Live Demo'}
              </a>
            )}
          </div>
        </div>

        {/* Stats Grid if available */}
        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.stats.map((s, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white border border-black/[0.08] shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium block">
                  {s.label}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#1D1D1F] mt-0.5 block truncate">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Architecture Note */}
        {project.architecture && (
          <div className="apple-card p-5 bg-white border border-black/[0.08]">
            <div className="flex items-center gap-2 mb-2">
              <Layers size={14} className="text-[#0071E3]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73]">
                Architecture Pipeline
              </h3>
            </div>
            <p className="font-mono text-xs text-[#424245] bg-[#F5F5F7] p-3 rounded-lg border border-black/[0.04] overflow-x-auto">
              {project.architecture}
            </p>
          </div>
        )}

        {/* Context & Implementation */}
        <div className="space-y-4">
          <div className="apple-card p-6 bg-white border border-black/[0.08]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#6E6E73] mb-2">
              The Problem
            </h2>
            <p className="text-[#424245] text-sm leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="apple-card p-6 bg-white border border-black/[0.08]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#6E6E73] mb-2">
              Engineered Solution
            </h2>
            <p className="text-[#424245] text-sm leading-relaxed">
              {project.solution}
            </p>
            {project.description && (
              <p className="text-[#6E6E73] text-xs leading-relaxed mt-3 pt-3 border-t border-black/[0.06]">
                {project.description}
              </p>
            )}
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="apple-card p-6 bg-white border border-black/[0.08]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#6E6E73] mb-3">
                Key Technical Highlights
              </h2>
              <div className="space-y-2">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#424245]">
                    <CheckCircle2 size={13} className="text-[#0071E3] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="apple-card p-6 bg-white border border-black/[0.08]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#6E6E73] mb-3">
              Technologies & Frameworks
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-[#F5F5F7] border border-black/[0.04] rounded-full text-[#1D1D1F]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Other Projects */}
        <div className="border-t border-black/[0.06] pt-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#6E6E73] mb-4">
            More Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherProjects.map((op) => (
              <Link
                key={op.id}
                href={`/projects/${op.id}`}
                className="apple-card p-4 bg-white border border-black/[0.08] hover:border-black/[0.16] transition-all group"
              >
                <span className="text-[10px] uppercase font-semibold text-[#86868B]">
                  {op.category}
                </span>
                <h4 className="text-sm font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors mt-0.5 mb-1 truncate">
                  {op.title}
                </h4>
                <p className="text-xs text-[#6E6E73] line-clamp-1">
                  {op.tagline || op.solution}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}