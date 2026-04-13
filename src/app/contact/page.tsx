import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter text-white mb-4">Get in touch</h1>
          <p className="text-lg text-zinc-400 font-medium">
            Open to opportunities, collaborations, and interesting conversations.
          </p>
        </div>

        <div className="glass-panel mb-8 flex items-center justify-center gap-4 rounded-2xl px-6 py-5 hover:border-white/20 transition-all shadow-lg shadow-[#003366]/10">
          <Mail size={20} className="text-[#13B5EA]" />
          <a
            href="mailto:mikeymurph2005@yahoo.com"
            className="text-base font-bold tracking-tight text-white transition-colors hover:text-[#13B5EA]"
          >
            mikeymurph2005@yahoo.com
          </a>
        </div>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}