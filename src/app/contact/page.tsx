import { ContactForm } from '@/components/ContactForm';
import { TerminalFooter } from '@/components/TerminalFooter';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pt-32 pb-20">
        <p className="font-mono text-sm text-green-500 mb-4">❯ ./contact --new</p>
        <h1 className="text-4xl font-bold text-zinc-100 tracking-tight mb-2">Get in touch</h1>
        <p className="font-mono text-sm text-zinc-500 mb-12">
          open to opportunities, collaborations, and interesting conversations.
        </p>

        <div className="mb-8 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4">
          <Mail size={16} className="text-zinc-500" />
          <a
            href="mailto:michaelmurphy819@gmail.com"
            className="font-mono text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            mikeymurph2005@yahoo.com
          </a>
        </div>

        <ContactForm />
      </main>
      <TerminalFooter />
    </div>
  );
}