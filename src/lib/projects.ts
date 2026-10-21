import { Project } from './types';
import { PROJECTS } from './projects-data';

export async function getProjects(): Promise<Project[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
      });

      // Query with 2-second timeout protection
      const queryPromise = supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });

      const timeoutPromise = new Promise<{ data: null; error: Error }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error('Timeout') }), 2000)
      );

      const result = await Promise.race([queryPromise, timeoutPromise]);
      const data = result.data;

      if (data && data.length > 0) {
        // Merge Supabase dynamic records with rich local metadata
        return data.map((sbRow: Partial<Project> & { id: string; title: string }) => {
          const localMatch = PROJECTS.find(
            (p) =>
              p.supabase_id === sbRow.id ||
              p.id === sbRow.id ||
              p.title.toLowerCase() === sbRow.title.toLowerCase()
          );

          const project: Project = {
            id: localMatch?.id || sbRow.id,
            slug: localMatch?.slug || localMatch?.id || sbRow.id,
            supabase_id: sbRow.id,
            title: sbRow.title || localMatch?.title || '',
            problem: sbRow.problem || localMatch?.problem || '',
            solution: sbRow.solution || localMatch?.solution || '',
            tech_stack: sbRow.tech_stack || localMatch?.tech_stack || [],
            created_at: sbRow.created_at || localMatch?.created_at || new Date().toISOString(),
            category: localMatch?.category || 'fullstack',
            status: localMatch?.status || 'Active',
            featured: localMatch?.featured ?? true,
            stats: localMatch?.stats,
            architecture: localMatch?.architecture,
            highlights: sbRow.highlights || localMatch?.highlights || [],
            tagline: localMatch?.tagline || sbRow.solution || '',
            github_url: sbRow.github_url || localMatch?.github_url,
            live_url: sbRow.live_url || localMatch?.live_url,
            description: sbRow.description || localMatch?.description,
            sort_order: sbRow.sort_order ?? localMatch?.sort_order,
          };
          return project;
        });
      }
    }
  } catch {
    // Seamless fallback to canonical projects if Supabase is offline
  }

  return PROJECTS;
}

export async function getProjectById(idOrSlug: string): Promise<Project | undefined> {
  const normalized = idOrSlug.toLowerCase();
  const all = await getProjects();
  return all.find(
    (p) =>
      p.id.toLowerCase() === normalized ||
      p.slug?.toLowerCase() === normalized ||
      p.supabase_id?.toLowerCase() === normalized
  );
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  if (!category || category === 'all') return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
}
