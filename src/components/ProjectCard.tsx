import Link from 'next/link';
import { Github, ExternalLink, ArrowRight, Smartphone, Globe, Cpu, Sparkles, FileText } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
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

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'ios':
        return 'iOS App';
      case 'fullstack':
        return 'Full-Stack';
      case 'systems':
        return 'Systems';
      case 'ai':
        return 'ML & AI';
      default:
        return 'Engineering';
    }
  };

  return (
    <article className="apple-card group relative flex flex-col justify-between p-6 sm:p-7 bg-white border border-black/[0.08] hover:border-black/[0.16] transition-all">
      <div>
        {/* Category & Status */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F7] px-2.5 py-1 text-[11px] font-medium text-[#424245]">
            {getCategoryIcon(project.category)}
            <span>{getCategoryLabel(project.category)}</span>
          </div>

          {project.status && (
            <span
              className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${
                project.status === 'App Store Ready' || project.status === 'Production'
                  ? 'text-emerald-700 border-emerald-200 bg-emerald-50'
                  : project.status === 'Published Paper'
                  ? 'text-blue-700 border-blue-200 bg-blue-50'
                  : 'text-[#6E6E73] border-black/[0.06] bg-[#F5F5F7]'
              }`}
            >
              {project.status}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-[#1D1D1F] mb-2 group-hover:text-[#0071E3] transition-colors">
          {project.title}
        </h3>

        {/* Short Summary (concise for tech-savvy audience) */}
        <p className="text-[#6E6E73] text-sm leading-relaxed mb-5 line-clamp-2">
          {project.tagline || project.solution}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech_stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-medium bg-[#F5F5F7] border border-black/[0.04] rounded-full text-[#424245]"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 5 && (
            <span className="px-2 py-1 text-[11px] font-medium text-[#86868B]">
              +{project.tech_stack.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex items-center justify-between border-t border-black/[0.06] pt-4 mt-auto">
        <div className="flex items-center gap-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#424245] hover:text-[#1D1D1F] px-3 py-1.5 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] border border-black/[0.04] transition-colors"
              aria-label={`${project.title} Source Code`}
            >
              <Github size={13} /> Code
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target={project.live_url.startsWith('http') ? '_blank' : undefined}
              rel={project.live_url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0071E3] hover:text-[#0077ED] px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              <ExternalLink size={12} /> {project.live_url.includes('research') ? 'Paper' : 'Live Demo'}
            </a>
          )}
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
        >
          Details <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  );
}