import { createClient } from '@/lib/supabase/server';
import { Project } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';

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

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pt-32 pb-20">
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <h1 className="text-5xl font-bold tracking-tighter text-white mb-8">
          {project.title}
        </h1>

        {/* Tech badges */}
        <div className="mb-12 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-semibold bg-white/5 border border-white/10 rounded-full text-zinc-300 shadow-sm backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Content card */}
        <div className="glass-panel mb-12 flex flex-col gap-8 rounded-3xl p-8 sm:p-12 shadow-xl">
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-[#13B5EA]">Problem</h2>
            <p className="leading-relaxed text-zinc-300 text-lg">{project.problem}</p>
          </section>
          
          <div className="h-px bg-white/10" />
          
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-white">Solution</h2>
            <p className="leading-relaxed text-zinc-300 text-lg">{project.solution}</p>
          </section>

          {project.description && (
            <>
              <div className="h-px bg-white/10" />
              <section>
                <h2 className="mb-4 text-xl font-bold tracking-tight text-white">Details</h2>
                <p className="leading-relaxed text-zinc-300 text-lg">{project.description}</p>
              </section>
            </>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <>
              <div className="h-px bg-white/10" />
              <section>
                <h2 className="mb-4 text-xl font-bold tracking-tight text-white">Key Highlights</h2>
                <ul className="flex flex-col gap-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-lg text-zinc-300 font-medium">
                      <span className="text-[#13B5EA] font-black">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
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
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 hover:scale-[1.02] shadow-sm"
            >
              <Github size={18} /> Source Code
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white text-[#000814] px-6 py-3 text-sm font-bold transition-all hover:bg-zinc-200 hover:scale-[1.02] shadow-lg"
            >
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}