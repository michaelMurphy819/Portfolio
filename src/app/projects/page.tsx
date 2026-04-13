import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/ProjectCard'
import { Project } from '@/lib/types'

export const revalidate = 60 // re-fetch from Supabase every 60s

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  const projects: Project[] = data ?? []

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32 pb-20">
      <div className="mb-14">
        <h1 className="text-5xl font-bold tracking-tighter text-white mb-4">Projects</h1>
        <p className="text-lg text-zinc-400 font-medium max-w-2xl">
          Showcasing {projects.length} deep dive{projects.length !== 1 ? 's' : ''} into systems engineering and development.
        </p>
      </div>

      {error && (
        <div className="glass-panel text-red-400 p-6 rounded-2xl mb-12 border border-red-500/20 bg-red-500/5 font-semibold">
          Error loading projects: {error.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}