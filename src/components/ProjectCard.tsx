import Link from 'next/link';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="glass-panel group relative flex flex-col gap-6 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(19,181,234,0.3)] hover:border-[#13B5EA]/30">
      {/* Visual Flare */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#13B5EA]/10 to-[#003366]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tighter">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-base leading-relaxed mb-6 line-clamp-3">
            {project.solution}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech_stack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-xs font-semibold bg-white/5 border border-white/10 rounded-full text-zinc-300 shadow-sm backdrop-blur-md">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-auto">
          <div className="flex gap-4">
            {project.github_url && <a href={project.github_url} className="text-zinc-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Github size={20} /></a>}
            {project.live_url && <a href={project.live_url} className="text-zinc-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><ExternalLink size={20} /></a>}
          </div>
          <Link href={`/projects/${project.id}`} className="text-sm font-bold text-[#13B5EA] flex items-center gap-2 hover:gap-3 transition-all">
            Details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}