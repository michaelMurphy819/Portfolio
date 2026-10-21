export interface Project {
  id: string;
  slug?: string;
  title: string;
  tagline?: string;
  category?: 'ios' | 'fullstack' | 'systems' | 'ai';
  status?: string;
  featured?: boolean;
  problem: string;
  solution: string;
  description?: string;    // longer freeform write-up
  highlights?: string[];   // bullet-point achievements
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  sort_order?: number;
  created_at: string;
  stats?: { label: string; value: string }[];
  architecture?: string;
  supabase_id?: string;
}

export interface Streak {
  id: string;
  date: string; // ISO date string: "2024-01-15"
  activity_type: 'coding' | 'writing' | 'learning';
  notes?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}