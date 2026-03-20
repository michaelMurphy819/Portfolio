'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { addProject, updateProject, deleteProject } from '@/app/admin/actions'
import { Project } from '@/lib/types'
import { Plus, Pencil, Trash2, LogOut, X, Check, Terminal } from 'lucide-react'
import { useRouter } from 'next/navigation'

const techColors: Record<string, string> = {
  C: 'bg-blue-950 text-blue-300 border-blue-800',
  Rust: 'bg-orange-950 text-orange-300 border-orange-800',
  TypeScript: 'bg-sky-950 text-sky-300 border-sky-800',
  'Next.js': 'bg-zinc-800 text-zinc-200 border-zinc-600',
  Python: 'bg-yellow-950 text-yellow-300 border-yellow-800',
  Unix: 'bg-green-950 text-green-300 border-green-800',
}
const defaultBadge = 'bg-zinc-800 text-zinc-300 border-zinc-600'

const EMPTY_FORM = {
  title: '', problem: '', solution: '', description: '',
  tech_stack: '', github_url: '', live_url: '', sort_order: '',
}
type FormData = typeof EMPTY_FORM

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function fetchProjects() {
    setLoading(true)
    const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
    setProjects(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  function flash(msg: string) {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  function openNew() { setEditingId(null); setForm(EMPTY_FORM); setError(''); setShowForm(true) }

  function openEdit(p: Project) {
    setEditingId(p.id)
    setForm({
      title: p.title, problem: p.problem, solution: p.solution,
      description: p.description ?? '', tech_stack: p.tech_stack.join(', '),
      github_url: p.github_url ?? '', live_url: p.live_url ?? '',
      sort_order: p.sort_order?.toString() ?? '',
    })
    setError(''); setShowForm(true)
  }

  function closeForm() { setShowForm(false); setEditingId(null); setForm(EMPTY_FORM); setError('') }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError('')
    const payload = {
      title: form.title.trim(), problem: form.problem.trim(), solution: form.solution.trim(),
      description: form.description.trim() || null,
      tech_stack: form.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
      github_url: form.github_url.trim() || null, live_url: form.live_url.trim() || null,
      sort_order: form.sort_order ? parseInt(form.sort_order) : null,
    }
    try {
      if (editingId) { await updateProject(editingId, payload); flash('project updated.') }
      else { await addProject(payload); flash('project added.') }
      closeForm(); fetchProjects()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'something went wrong')
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try { await deleteProject(id); flash('project deleted.'); fetchProjects() }
    catch (err) { setError(err instanceof Error ? err.message : 'delete failed') }
    finally { setDeletingId(null) }
  }

  async function handleLogout() { await supabase.auth.signOut(); router.push('/admin/login') }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Terminal size={16} className="text-green-500" />
              <p className="font-mono text-sm text-green-500">❯ admin --dashboard</p>
            </div>
            <h1 className="font-mono text-2xl font-bold text-zinc-100">Admin Panel</h1>
            <p className="font-mono text-xs text-zinc-600 mt-1">{projects.length} projects</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={openNew} className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 font-mono text-sm font-semibold text-zinc-900 transition-colors hover:bg-white">
              <Plus size={14} /> new project
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 font-mono text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100">
              <LogOut size={14} /> logout
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-800 bg-green-950/30 px-4 py-3 font-mono text-sm text-green-400">
            <Check size={14} /> {successMsg}
          </div>
        )}
        {error && !showForm && (
          <div className="mb-6 rounded-lg border border-red-800 bg-red-950/30 px-4 py-3 font-mono text-sm text-red-400">
            error: {error}
          </div>
        )}

        {showForm && (
          <div className="mb-10 rounded-xl border border-zinc-700 bg-zinc-900/80 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-mono text-sm font-semibold text-zinc-100">{editingId ? '❯ edit project' : '❯ new project'}</h2>
              <button onClick={closeForm} className="text-zinc-600 hover:text-zinc-300 transition-colors"><X size={16} /></button>
            </div>
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
                <Field label="tech stack * (comma separated)" value={form.tech_stack} onChange={(v) => setForm({ ...form, tech_stack: v })} placeholder="C, Unix, TypeScript" required />
              </div>
              <Field label="problem *" value={form.problem} onChange={(v) => setForm({ ...form, problem: v })} required textarea />
              <Field label="solution *" value={form.solution} onChange={(v) => setForm({ ...form, solution: v })} required textarea />
              <Field label="description (optional)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <Field label="github url" value={form.github_url} onChange={(v) => setForm({ ...form, github_url: v })} placeholder="https://github.com/..." />
                <Field label="live url" value={form.live_url} onChange={(v) => setForm({ ...form, live_url: v })} placeholder="https://..." />
                <Field label="sort order" value={form.sort_order} onChange={(v) => setForm({ ...form, sort_order: v })} placeholder="1" type="number" />
              </div>
              {error && <p className="font-mono text-xs text-red-400">error: {error}</p>}
              <div className="flex gap-3 border-t border-zinc-800 pt-5">
                <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 font-mono text-sm font-semibold text-zinc-900 transition-colors hover:bg-white disabled:opacity-50">
                  <Check size={14} /> {saving ? 'saving...' : editingId ? 'save changes' : 'add project'}
                </button>
                <button type="button" onClick={closeForm} className="rounded-lg border border-zinc-800 px-4 py-2.5 font-mono text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100">
                  cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="font-mono text-sm text-zinc-600">loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center">
            <p className="font-mono text-sm text-zinc-600">no projects yet.</p>
            <button onClick={openNew} className="mt-3 font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors">add your first project →</button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700">
                <div className="flex flex-col gap-2 min-w-0">
                  <div className="flex items-center gap-3">
                    {p.sort_order != null && <span className="font-mono text-xs text-zinc-600">#{p.sort_order}</span>}
                    <h3 className="font-mono text-sm font-semibold text-zinc-100 truncate">{p.title}</h3>
                  </div>
                  <p className="font-mono text-xs text-zinc-500 line-clamp-1"><span className="text-green-500 mr-1">problem:</span>{p.problem}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {p.tech_stack.map((t) => (
                      <span key={t} className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-xs ${techColors[t] ?? defaultBadge}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(p)} className="flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100">
                    <Pencil size={12} /> edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id} className="flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-red-800 hover:text-red-400 disabled:opacity-50">
                    <Trash2 size={12} /> {deletingId === p.id ? '...' : 'delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, required = false, textarea = false, placeholder = '', type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void
  required?: boolean; textarea?: boolean; placeholder?: string; type?: string
}) {
  const base = 'rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-700 transition-colors focus:border-zinc-600 w-full'
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs text-zinc-500">{label}</label>
      {textarea
        ? <textarea required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={`${base} resize-none`} />
        : <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={base} />}
    </div>
  )
}