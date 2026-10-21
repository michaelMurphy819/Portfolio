import Image from 'next/image';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Download,
} from 'lucide-react';
import { getProjects } from '@/lib/projects';
import { ProjectsShowcase } from '@/components/ProjectsShowcase';
import { ContactMethods } from '@/components/ContactMethods';

const EXPERIENCES = [
  {
    role: 'Vice President & Lead Developer',
    organization: 'Software Development Club @ Villanova University',
    location: 'Villanova, PA',
    period: 'Sept 2024 — Present',
    badge: 'Leadership',
    description:
      'Serving as Vice President (2026–2027). Organizing technical workshops and leading student development teams building production software for university departments.',
  },
  {
    role: 'Computer Systems Research Scholar',
    organization: 'Villanova University Department of Computer Science',
    location: 'Villanova, PA',
    period: '2026',
    badge: 'Systems Research',
    description:
      'Authored a 7-page technical systems paper analyzing serverless cold start latency: AWS Firecracker microVMs (KVM & VirtIO), Linux memory-mapping I/O (SlimStart 80% rule), and CRIU SnapStart checkpoint/restore.',
  },
  {
    role: 'International Research Scholar',
    organization: 'Universidad Complutense de Madrid / IES Abroad',
    location: 'Madrid, Spain',
    period: '2025',
    badge: 'ML Research',
    description:
      'Authored a 17-page empirical machine learning research paper benchmarking 6 classifier models against Eugene Fama’s Efficient Market Hypothesis on historical NVIDIA stock.',
  },
  {
    role: 'B.S. in Computer Science',
    organization: 'Villanova University',
    location: 'Villanova, PA',
    period: '2023 — 2027 (Expected)',
    badge: 'Education',
    description:
      'Coursework: Computer Systems Architecture, Analysis of Algorithms, Database Systems, Operating Systems, Machine Learning.',
  },
];

const SKILLS = [
  { category: 'Mobile & iOS', items: ['Swift', 'SwiftUI (iOS 17+)', 'HealthKit', 'CoreBluetooth', 'CoreLocation', 'Combine', 'MVVM'] },
  { category: 'Full-Stack & Backend', items: ['TypeScript', 'React 19', 'Next.js 16', 'PostgreSQL', 'Drizzle ORM', 'Tailwind CSS v4', 'Firebase', 'Supabase'] },
  { category: 'Systems & Languages', items: ['C', 'Python', 'Unix/Linux Internals', 'POSIX Shell', 'Memory Management', 'AWS Firecracker', 'Git'] },
  { category: 'Machine Learning', items: ['Scikit-learn', 'Pandas', 'NumPy', 'Random Forest', 'Statistical Model Evaluation', 'NLP'] },
];

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="relative min-h-screen px-6 pt-28 sm:pt-36 pb-20">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Profile / About Hero */}
        <section className="apple-card p-6 sm:p-8 bg-white border border-black/[0.08]">
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
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-black/[0.05] text-[11px] font-medium text-[#424245] mb-2">
                  <span>Computer Science</span>
                  <span>·</span>
                  <span>Villanova University</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                  Michael Murphy
                </h1>
                <p className="text-xs sm:text-sm font-medium text-[#0071E3] mt-0.5">
                  Vice President of Software Development Club
                </p>
              </div>

              <p className="text-sm text-[#424245] leading-relaxed">
                Computer Science major at Villanova University. I build native iOS applications (Swift/SwiftUI),
                production full-stack web platforms (Next.js/React/Postgres), and low-level systems. Focused on clean
                architecture, low latency, and pragmatic engineering.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="#contact"
                  className="apple-button-primary px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Mail size={13} /> Contact
                </a>
                <a
                  href="https://github.com/michaelMurphy819"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-button-secondary px-3.5 py-1.5 text-xs font-semibold"
                >
                  <Github size={13} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/michael-murphy-12a594222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-button-secondary px-3.5 py-1.5 text-xs font-semibold"
                >
                  <Linkedin size={13} /> LinkedIn
                </a>
                <Link
                  href="/research"
                  className="apple-button-secondary px-3.5 py-1.5 text-xs font-semibold"
                >
                  <FileText size={13} /> Research Papers (2)
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
                Projects
              </h2>
              <p className="text-xs text-[#6E6E73] mt-0.5">
                Native iOS, full-stack web platforms, systems, and machine learning.
              </p>
            </div>
          </div>

          <ProjectsShowcase initialProjects={projects} />
        </section>

        {/* Experience & Background Section */}
        <section id="about" className="scroll-mt-28 space-y-6">
          <div className="border-b border-black/[0.06] pb-3">
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
              Experience & Education
            </h2>
            <p className="text-xs text-[#6E6E73] mt-0.5">
              Leadership, academic research, and engineering background.
            </p>
          </div>

          <div className="space-y-3">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="apple-card p-5 bg-white border border-black/[0.08]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1D1D1F]">
                      {exp.role}
                    </span>
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
                <p className="text-xs text-[#424245] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Stack */}
        <section className="space-y-4">
          <div className="border-b border-black/[0.06] pb-3">
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
              Technical Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILLS.map((s) => (
              <div key={s.category} className="apple-card p-4 bg-white border border-black/[0.08]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E6E73] mb-2.5">
                  {s.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-medium bg-[#F5F5F7] border border-black/[0.04] rounded-full text-[#1D1D1F]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Papers Showcase */}
        <section id="research" className="scroll-mt-28 space-y-6">
          <div className="border-b border-black/[0.06] pb-3">
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
              Academic Research & Publications
            </h2>
            <p className="text-xs text-[#6E6E73] mt-0.5">
              Technical papers authored at Villanova University and Universidad Complutense de Madrid.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Paper 1: Computer Systems Final Paper */}
            <div className="apple-card p-6 bg-white border border-black/[0.08]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Computer Systems · 7 Pages
                    </span>
                    <span className="text-[11px] text-[#86868B] font-medium">Villanova University · 2026</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D1D1F]">
                    The Cold Start Problem in Serverless Computing
                  </h3>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    Low-level architectural analysis of cold start latency in Function-as-a-Service (FaaS):
                    AWS Firecracker microVMs (~125ms boot), KVM ioctl() syscalls, VirtIO, Linux memory-mapping I/O
                    (SlimStart 80% rule), and CRIU SnapStart mitigation.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/research#systems-paper"
                    className="apple-button-secondary px-4 py-2 text-xs font-semibold"
                  >
                    Read Summary
                  </Link>
                  <a
                    href="/systems-paper.pdf"
                    download="The_Cold_Start_Problem_in_Serverless_Computing.pdf"
                    className="apple-button-primary px-4 py-2 text-xs font-semibold"
                  >
                    <Download size={13} /> PDF (120KB)
                  </a>
                </div>
              </div>
            </div>

            {/* Paper 2: AI Stock Prediction Paper */}
            <div className="apple-card p-6 bg-white border border-black/[0.08]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      Machine Learning · 17 Pages
                    </span>
                    <span className="text-[11px] text-[#86868B] font-medium">Villanova & UCM Madrid · 2025</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D1D1F]">
                    Measuring the Accuracy of Various ML Algorithms on NVIDIA&apos;s Stock
                  </h3>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    Empirical benchmark of 6 classifiers (Random Forest: 53.7%, Logistic Regression: 0.583 F1)
                    across 20+ technical indicators against Eugene Fama&apos;s Efficient Market Hypothesis.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/research#ml-paper"
                    className="apple-button-secondary px-4 py-2 text-xs font-semibold"
                  >
                    Read Summary
                  </Link>
                  <a
                    href="/ml-paper.pdf"
                    download="Measuring_Accuracy_ML_Algorithms_NVIDIA_Stock.pdf"
                    className="apple-button-primary px-4 py-2 text-xs font-semibold"
                  >
                    <Download size={13} /> PDF (1.4MB)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-28 space-y-4">
          <div className="border-b border-black/[0.06] pb-3">
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
              Contact
            </h2>
            <p className="text-xs text-[#6E6E73] mt-0.5">
              Available for software engineering roles and technical discussions.
            </p>
          </div>

          <ContactMethods />
        </section>
      </div>
    </main>
  );
}