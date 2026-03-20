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
    <main className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <p className="font-mono text-sm text-green-500 mb-4">❯ ls ./projects</p>
      <h1 className="text-4xl font-bold text-zinc-100 mb-2">Projects</h1>
      <p className="font-mono text-sm text-zinc-500 mb-12">
        {projects.length} projects found
      </p>

      {error && (
        <p className="font-mono text-sm text-red-400">
          Error loading projects: {error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}