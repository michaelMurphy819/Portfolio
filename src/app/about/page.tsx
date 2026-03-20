import Image from 'next/image'
import { TerminalFooter } from '@/components/TerminalFooter'

const interests = [
  {
    label: 'Systems & Infrastructure',
    color: 'text-sky-400',
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
        <p className="font-mono text-sm text-green-500 mb-4">❯ cat about.md</p>
        <h1 className="text-4xl font-bold text-zinc-100 mb-6">About</h1>
        <div className="flex flex-col sm:flex-row items-start gap-8 mb-16">
            <Image
                src="/michael.jpg"
                alt="Michael Murphy"
                width={160}
                height={160}
                className="rounded-xl border border-zinc-800 object-cover"
                priority
            />
            <p className="text-zinc-400 max-w-2xl mb-16 leading-relaxed">
            I'm Michael Murphy and I'm a Computer Science student at Villanova University.
            I'm passionate about building software that is not only efficient and robust but 
            also has a positive impact on society. I have a strong interest in low-level systems programming, 
            Unix/Linux internals, and database design. I'm always eager to learn new technologies and methodologies 
            that can help me grow as a software engineer and make meaningful contributions to the field.
        </p>
</div>
        

        <p className="font-mono text-xs text-zinc-600 mb-6">❯ cat interests.json</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {interests.map(({ label, color, items }) => (
            <div
              key={label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <h2 className={`font-mono text-sm font-semibold mb-4 ${color}`}>
                {label}
              </h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="font-mono text-xs text-zinc-400 flex gap-2">
                    <span className="text-zinc-600">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}