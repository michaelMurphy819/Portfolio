import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Cpu,
  Layers,
  Sparkles,
  Smartphone,
  CheckCircle2,
  MapPin,
  ArrowLeft,
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Michael Murphy',
  description:
    'About Michael Murphy — Computer Science student and Vice President of the Software Development Club at Villanova University.',
};

const EXPERIENCES = [
  {
    role: 'Vice President & Lead Developer',
    organization: 'Software Development Club @ Villanova University',
    location: 'Villanova, PA',
    period: 'Sept 2024 — Present',
    badge: 'Leadership',
    description:
      'Serving as Vice President (2026–2027). Organizing technical workshops and leading student development teams building software for university departments.',
    bullets: [
      'Orchestrated technical workshops on systems architecture, Git workflows, and modern web frameworks.',
      'Directed development sprints coordinating frontend, backend, and database schema design.',
      'Mentored underclassmen in technical interview prep, algorithms, and open-source practices.',
    ],
  },
  {
    role: 'International Research Scholar',
    organization: 'Universidad Complutense de Madrid / IES Abroad',
    location: 'Madrid, Spain',
    period: '2025',
    badge: 'Research',
    description:
      'Completed academic and research program in Madrid, authoring a 17-page formal empirical machine learning paper on NVIDIA stock direction prediction against the Efficient Market Hypothesis.',
    bullets: [
      'Engineered 20+ quantitative technical indicators across multi-year OHLCV data.',
      'Benchmarked 6 classifiers (Random Forest, SVM, Logistic Regression, KNN, Naive Bayes, Decision Trees).',
    ],
  },
  {
    role: 'B.S. in Computer Science',
    organization: 'Villanova University',
    location: 'Villanova, PA',
    period: '2023 — 2027 (Expected)',
    badge: 'Education',
    description:
      'Coursework: Computer Systems Architecture, Operating Systems, Analysis of Algorithms, Database Systems, Platform-Based Computing, Machine Learning.',
    bullets: [
      'Active engineering community leader and technology advocate on campus.',
    ],
  },
];

const SKILL_PILLARS = [
  {
    title: 'iOS & Mobile Systems',
    icon: Smartphone,
    color: 'text-[#0071E3]',
    skills: ['Swift & SwiftUI (iOS 17+)', 'HealthKit Biometrics', 'CoreBluetooth & BLE', 'CoreLocation', 'Clean MVVM', 'Combine', 'AVFoundation', 'Offline Disk Queue'],
  },
  {
    title: 'Full-Stack & Web',
    icon: Layers,
    color: 'text-emerald-700',
    skills: ['TypeScript', 'React 19 & Next.js 16', 'PostgreSQL', 'Drizzle ORM', 'Tailwind CSS v4', 'TanStack Query', 'Firebase & Supabase', 'RESTful APIs'],
  },
  {
    title: 'Systems & Infrastructure',
    icon: Cpu,
    color: 'text-purple-700',
    skills: ['C Programming', 'Unix/Linux System Internals', 'POSIX Shell Scripting', 'Memory Management', 'Concurrency & Threads', 'File Systems & I/O'],
  },
  {
    title: 'Machine Learning',
    icon: Sparkles,
    color: 'text-amber-700',
    skills: ['Python (NumPy, Pandas)', 'Scikit-learn Classifiers', 'Feature Engineering', 'ROC-AUC & F1 Evaluation', 'Random Forest & SVM', 'Neural TTS'],
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen px-6 pt-28 sm:pt-36 pb-24">
      <div className="relative z-10 mx-auto max-w-4xl space-y-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
        >
          <ArrowLeft size={13} /> Back to overview
        </Link>

        {/* Profile Card */}
        <div className="apple-card p-6 sm:p-8 bg-white border border-black/[0.08]">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm">
              <Image
                src="/Headshot.jpg"
                alt="Michael Murphy"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-black/[0.04] text-[11px] font-medium text-[#424245] mb-2">
                  <span>Villanova University</span>
                  <span>·</span>
                  <span>VP Software Development Club</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                  Michael Murphy
                </h1>
              </div>

              <p className="text-sm text-[#424245] leading-relaxed">
                Computer Science major at Villanova University. I specialize in native iOS development (Swift/SwiftUI),
                full-stack web architecture (React 19/Next.js/Postgres), and low-level C programming on Unix/Linux systems.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#6E6E73]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#0071E3]" /> Philadelphia / New York
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-[#0071E3]" /> Class of 2027
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-[#1D1D1F] border-b border-black/[0.06] pb-2">
            Experience & Education
          </h2>

          <div className="space-y-3">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="apple-card p-5 bg-white border border-black/[0.08]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1D1D1F]">
                      {exp.role}
                    </h3>
                    <span className="text-[10px] uppercase font-semibold text-[#6E6E73] bg-[#F5F5F7] px-2 py-0.5 rounded-full">
                      {exp.badge}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#86868B]">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#0071E3] mb-2">
                  {exp.organization} · {exp.location}
                </p>
                <p className="text-xs text-[#424245] leading-relaxed mb-3">
                  {exp.description}
                </p>
                <div className="space-y-1">
                  {exp.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#6E6E73]">
                      <CheckCircle2 size={12} className="text-[#0071E3] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Competencies */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-[#1D1D1F] border-b border-black/[0.06] pb-2">
            Core Competencies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILL_PILLARS.map((p) => (
              <div key={p.title} className="apple-card p-5 bg-white border border-black/[0.08]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E6E73] mb-3">
                  {p.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-xs font-medium bg-[#F5F5F7] border border-black/[0.04] rounded-full text-[#1D1D1F]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}