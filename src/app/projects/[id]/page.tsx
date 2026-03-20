import { createClient } from '@/lib/supabase/server';
import { Project } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import { TerminalFooter } from '@/components/TerminalFooter';

const techColors: Record<string, string> = {
  C: 'bg-blue-950 text-blue-300 border-blue-800',
  Rust: 'bg-orange-950 text-orange-300 border-orange-800',
  TypeScript: 'bg-sky-950 text-sky-300 border-sky-800',
  'Next.js': 'bg-zinc-800 text-zinc-200 border-zinc-600',
  Python: 'bg-yellow-950 text-yellow-300 border-yellow-800',
  Unix: 'bg-green-950 text-green-300 border-green-800',
};
const defaultBadge = 'bg-zinc-800 text-zinc-300 border-zinc-600';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) notFound();
  const project = data as Project;

  const slug = project.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pt-32 pb-20">
        <Link
          href="/projects"
          className="mb-10 flex items-center gap-2 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-100"
        >
          <ArrowLeft size={14} /> back to projects
        </Link>

        <p className="font-mono text-sm text-green-500 mb-4">
          ❯ cat ./projects/{slug}.md
        </p>

        <h1 className="text-4xl font-bold text-zinc-100 tracking-tight mb-6">
          {project.title}
        </h1>

        {/* Tech badges */}
        <div className="mb-10 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs ${
                techColors[tech] ?? defaultBadge
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Content card */}
        <div className="mb-8 flex flex-col gap-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div>
            <p className="mb-2 font-mono text-xs text-green-500">problem:</p>
            <p className="leading-relaxed text-zinc-300">{project.problem}</p>
          </div>
          <div className="h-px bg-zinc-800" />
          <div>
            <p className="mb-2 font-mono text-xs text-sky-400">solution:</p>
            <p className="leading-relaxed text-zinc-300">{project.solution}</p>
          </div>
          {project.description && (
            <>
              <div className="h-px bg-zinc-800" />
              <div>
                <p className="mb-2 font-mono text-xs text-amber-400">details:</p>
                <p className="leading-relaxed text-zinc-300">{project.description}</p>
              </div>
            </>
          )}
          {project.highlights && project.highlights.length > 0 && (
            <>
              <div className="h-px bg-zinc-800" />
              <div>
                <p className="mb-3 font-mono text-xs text-purple-400">highlights:</p>
                <ul className="flex flex-col gap-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 font-mono text-xs text-zinc-400">
                      <span className="text-zinc-600">—</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Action links */}
        <div className="flex gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 font-mono text-sm text-zinc-300 transition-all hover:border-zinc-600 hover:text-zinc-100"
            >
              <Github size={16} /> view source
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 font-mono text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
            >
              <ExternalLink size={16} /> live demo
            </a>
          )}
        </div>
      </main>
      <TerminalFooter />
    </div>
  );
}