'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { addProject, updateProject, deleteProject } from '@/app/admin/actions'
import { Project } from '@/lib/types'
import { Plus, Pencil, Trash2, LogOut, X, Check, LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
      if (editingId) { await updateProject(editingId, payload); flash('Project updated.') }
      else { await addProject(payload); flash('Project added.') }
      closeForm(); fetchProjects()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try { await deleteProject(id); flash('Project deleted.'); fetchProjects() }
    catch (err) { setError(err instanceof Error ? err.message : 'Delete failed') }
    finally { setDeletingId(null) }
  }

  async function handleLogout() { await supabase.auth.signOut(); router.push('/admin/login') }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
              <LayoutDashboard size={20} className="text-[#13B5EA]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-white">Admin Dashboard</h1>
              <p className="text-sm font-semibold text-zinc-500 mt-1">{projects.length} projects total</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={openNew} className="flex items-center gap-2 rounded-full border border-white/20 bg-white text-[#000814] px-5 py-2.5 font-bold transition-all hover:bg-zinc-200 hover:scale-[1.02] shadow-lg">
              <Plus size={16} /> New Project
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-semibold text-zinc-300 transition-all hover:text-white hover:bg-white/10">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="mb-8 flex items-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-sm font-semibold text-green-400 shadow-inner">
            <Check size={18} /> {successMsg}
          </div>
        )}
        {error && !showForm && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-400 shadow-inner">
            Error: {error}
          </div>
        )}

        {showForm && (
          <div className="glass-panel mb-12 rounded-3xl p-8 shadow-xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={closeForm} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full border border-white/10"><X size={16} /></button>
            </div>
            <form onSubmit={handleSave} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
                <Field label="Tech Stack * (comma separated)" value={form.tech_stack} onChange={(v) => setForm({ ...form, tech_stack: v })} placeholder="C, Unix, TypeScript" required />
              </div>
              <Field label="Problem *" value={form.problem} onChange={(v) => setForm({ ...form, problem: v })} required textarea />
              <Field label="Solution *" value={form.solution} onChange={(v) => setForm({ ...form, solution: v })} required textarea />
              <Field label="Description (optional)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Field label="GitHub URL" value={form.github_url} onChange={(v) => setForm({ ...form, github_url: v })} placeholder="https://github.com/..." />
                <Field label="Live URL" value={form.live_url} onChange={(v) => setForm({ ...form, live_url: v })} placeholder="https://..." />
                <Field label="Sort Order" value={form.sort_order} onChange={(v) => setForm({ ...form, sort_order: v })} placeholder="1" type="number" />
              </div>
              {error && <p className="text-sm font-semibold text-red-400 text-center">Error: {error}</p>}
              <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
                <button type="button" onClick={closeForm} className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-zinc-300 transition-all hover:text-white hover:bg-white/10">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-full border border-white/20 bg-white text-[#000814] px-6 py-3 font-bold transition-all hover:bg-zinc-200 hover:scale-[1.02] shadow-lg disabled:opacity-50">
                  <Check size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-sm font-semibold text-zinc-500 text-center py-12">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="glass-panel flex flex-col items-center justify-center rounded-3xl p-16 text-center shadow-xl">
            <p className="text-lg font-medium text-zinc-400">No projects yet.</p>
            <button onClick={openNew} className="mt-4 text-sm font-bold text-[#13B5EA] hover:text-white transition-colors">Create your first project &rarr;</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map((p) => (
              <div key={p.id} className="glass-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl p-6 transition-all hover:border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(19,181,234,0.1)]">
                <div className="flex flex-col gap-3 min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    {p.sort_order != null && <span className="text-xs font-bold text-[#13B5EA] bg-[#13B5EA]/10 px-2.5 py-1 rounded-full shadow-inner border border-[#13B5EA]/20">#{p.sort_order}</span>}
                    <h3 className="text-lg font-bold text-white truncate tracking-tight">{p.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-1 border-l-2 border-white/10 pl-3 italic"><span className="font-semibold not-italic text-zinc-300 mr-2">Problem:</span>{p.problem}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {p.tech_stack.map((t) => (
                      <span key={t} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-300 shadow-sm">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => openEdit(p)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 transition-all hover:text-white hover:bg-white/10 shadow-sm">
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id} className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition-all hover:text-red-300 hover:bg-red-500/20 shadow-sm disabled:opacity-50">
                    <Trash2 size={14} /> {deletingId === p.id ? '...' : 'Delete'}
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
  const base = 'w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none focus:border-[#13B5EA]/60 focus:bg-white/5 transition-all shadow-inner placeholder:text-zinc-600'
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-zinc-300 ml-1">{label}</label>
      {textarea
        ? <textarea required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className={`${base} resize-none`} />
        : <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={base} />}
    </div>
  )
}