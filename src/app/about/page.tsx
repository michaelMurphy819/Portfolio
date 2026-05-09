import Image from 'next/image'
import { Footer } from '@/components/Footer'
import { Briefcase } from 'lucide-react'

const experiences = [
  {
    role: 'Machine Learning Research Intern',
    company: 'Villanova University',
    date: 'May 2026 - Aug 2026',
    bullets: [
      'Interviewed 15+ AI startup founders to help fix AI drifting in their models.',
      'Implemented Reinforcement Learning algorithms in Python to improve AI performance.',
      'Co-Authored a research paper on the effectiveness of my research and script.'
    ]
  },
  {
    role: 'Software Development Club',
    company: 'Villanova University',
    date: 'Sept 2024 - Present',
    bullets: [
      'Collaborated on various software development projects with other students.',
      'Developed new technical skills and improved existing ones.',
      'Serving as Vice President of the club (2026-2027)',

    ]
  }
]

const interests = [
  {
    label: 'Systems & Infrastructure',
    color: 'text-[#13B5EA]',
    border: 'border-[#13B5EA]/20',
    bg: 'bg-[#13B5EA]/5',
    items: [
      'Computer Systems Architecture',
      'Database Systems (SQL & Schema Design)',
      'Unix/Linux Internals & Shell Scripting',
      'Memory Management & C Programming',
      'Platform Based Computing',
      'Multi-threaded Programming',
      'File Systems & I/O'
    ],
  },
  {
    label: 'Software Engineering',
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    items: [
      'Computing for Social Good',
      'Professional Computer Ethics',
      'Software Development Club',
      'Version Control (Git/GitHub)',
      'System Testing & QA'
    ],
  },
  {
    label: 'Algorithms & Data Science',
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    items: [
      'Analysis of Algorithms',
      'Statistical Computing',
      'Asymptotic Analysis (Big O)',
      'Data Structures',
      'Dynamic Programming',
      'Discrete Mathematics'
    ],
  },
  {
    label: 'Artificial Intelligence',
    color: 'text-red-400',
    border: 'border-red-500/20',
    bg: 'bg-red-500/5',
    items: [
      'Machine Learning',
      'Neural Networks',
      'Agentic AI'
    ],
  }
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-20 w-full flex-1">
        <h1 className="text-5xl font-bold tracking-tighter text-white mb-12">About</h1>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-20">
          <Image
            src="/michael.jpg"
            alt="Michael Murphy"
            width={180}
            height={180}
            className="rounded-2xl shadow-xl shadow-[#003366]/30 border border-white/10 object-cover"
            priority
          />
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed text-center sm:text-left font-medium">
            I am Michael Murphy, a Computer Science student at Villanova University.
            I am passionate about building software that is not only efficient and robust but
            also has a positive impact on society. I have a strong interest in low-level systems programming,
            Unix/Linux internals, and database design. I am always eager to learn new technologies and methodologies
            that can help me grow as a software engineer and make meaningful contributions to the field.
          </p>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Experience</h2>
            <p className="text-zinc-500 font-medium">Professional work and research background.</p>
          </div>

          <div className="relative border-l-2 border-white/10 pl-6 sm:pl-8 ml-4 sm:ml-0 space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 h-6 w-6 rounded-full bg-[#000814] border-4 border-[#13B5EA] shadow-[0_0_15px_rgba(19,181,234,0.4)]" />

                <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10 hover:border-white/20 transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#13B5EA] transition-colors">{exp.role}</h3>
                      <p className="text-sm font-semibold text-zinc-400 flex items-center gap-2 mt-1">
                        <Briefcase size={14} className="text-[#13B5EA]" />
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#13B5EA] bg-[#13B5EA]/10 border border-[#13B5EA]/20 px-3 py-1.5 rounded-full select-none w-fit">
                      {exp.date}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-zinc-300 text-sm font-medium leading-relaxed flex items-start gap-3">
                        <span className="text-zinc-600 font-black relative top-0.5 mt-px">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        {/* Interests Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Areas of Interest</h2>
          <p className="text-zinc-500 font-medium">Core competencies and academic focuses.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {interests.map(({ label, color, border, bg, items }) => (
            <div
              key={label}
              className={`glass-panel rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${border} ${bg} p-8`}
            >
              <h2 className={`text-lg font-bold tracking-tight mb-6 ${color}`}>
                {label}
              </h2>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="text-sm font-semibold text-zinc-300 flex items-start gap-2">
                    <span className={`mt-0.5 ${color}`}>•</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}