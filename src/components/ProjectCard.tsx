import Link from 'next/link';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

const techColors: Record<string, string> = {
  C: 'bg-blue-950 text-blue-300 border-blue-800',
  Rust: 'bg-orange-950 text-orange-300 border-orange-800',
  TypeScript: 'bg-sky-950 text-sky-300 border-sky-800',
  'Next.js': 'bg-zinc-800 text-zinc-200 border-zinc-600',
  Python: 'bg-yellow-950 text-yellow-300 border-yellow-800',
  Unix: 'bg-green-950 text-green-300 border-green-800',
};

const defaultBadge = 'bg-zinc-800 text-zinc-300 border-zinc-600';

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900 hover:shadow-lg hover:shadow-black/40">
      {/* Subtle top accent line on hover */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Title */}
      <Link href={`/projects/${project.id}`}>
        <h3 className="font-mono text-lg font-semibold text-zinc-100 tracking-tight hover:text-white transition-colors">
          {project.title}
        </h3>
      </Link>

      {/* Problem / Solution */}
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-zinc-400">
          <span className="font-mono text-xs text-green-500 mr-2">problem:</span>
          {project.problem}
        </p>
        <p className="text-zinc-400">
          <span className="font-mono text-xs text-sky-400 mr-2">solution:</span>
          {project.solution}
        </p>
      </div>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech_stack.map((tech) => (
          <span
            key={tech}
            className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs ${techColors[tech] ?? defaultBadge}`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 border-t border-zinc-800 pt-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <Github size={14} />
            source
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <ExternalLink size={14} />
            live demo
          </a>
        )}
        <Link
          href={`/projects/${project.id}`}
          className="ml-auto flex items-center gap-1 font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-300"
        >
          details <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  );
}