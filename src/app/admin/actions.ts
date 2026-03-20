'use server'
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

// Service role client — bypasses RLS, only used server-side
function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function addProject(payload: {
  title: string
  problem: string
  solution: string
  description: string | null
  tech_stack: string[]
  github_url: string | null
  live_url: string | null
  sort_order: number | null
}) {
  const supabase = adminClient()
  const { error } = await supabase.from('projects').insert([payload])
  if (error) throw new Error(error.message)
  revalidatePath('/projects')
}

export async function updateProject(
  id: string,
  payload: {
    title: string
    problem: string
    solution: string
    description: string | null
    tech_stack: string[]
    github_url: string | null
    live_url: string | null
    sort_order: number | null
  }
) {
  const supabase = adminClient()
  const { error } = await supabase.from('projects').update(payload).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/projects')
}

export async function deleteProject(id: string) {
  const supabase = adminClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/projects')
}