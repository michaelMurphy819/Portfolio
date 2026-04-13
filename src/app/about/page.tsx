import Image from 'next/image'
import { Footer } from '@/components/Footer'

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
    label: 'Software Engineering & Impact',
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    items: [
      'Software Engineering Methodologies',
      'Computing for Social Good',
      'Professional Computer Ethics',
      'Agile & Scrum Frameworks',
      'Version Control (Git/GitHub)',
      'System Testing & QA',
      'API Design & Integration'
    ],
  },
  {
    label: 'Algorithms & Data Science',
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    items: [
      'Analysis of Algorithms',
      'Statistical Computing & Probability',
      'Asymptotic Analysis (Big O)',
      'Data Structures (Trees, Graphs, Hash Maps)',
      'Dynamic Programming',
      'Sorting & Searching Optimization',
      'Quantitative Data Analysis'
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-20 w-full flex-1">
        <h1 className="text-5xl font-bold tracking-tighter text-white mb-12">About</h1>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-16">
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