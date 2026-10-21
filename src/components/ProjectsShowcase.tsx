'use client';

import { useState } from 'react';
import { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';
import { Search } from 'lucide-react';

interface ProjectsShowcaseProps {
  initialProjects: Project[];
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ios', label: 'iOS & Mobile' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'systems', label: 'Systems' },
  { id: 'ai', label: 'AI & Research' },
];

export function ProjectsShowcase({ initialProjects }: ProjectsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = initialProjects.filter((project) => {
    const matchesCategory =
      activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech_stack.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Segmented Category Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Segmented Pills */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#F5F5F7] border border-black/[0.06] overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? initialProjects.length
                : initialProjects.filter((p) => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-[#1D1D1F] font-semibold shadow-sm'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-[#F5F5F7] text-[#1D1D1F]' : 'text-[#86868B]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search
            size={13}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech or project..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-full border border-black/[0.08] bg-white text-xs text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3] transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="apple-card p-10 text-center text-[#6E6E73] bg-white">
          <p className="text-sm font-medium">No projects found.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-2 text-xs font-semibold text-[#0071E3] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
