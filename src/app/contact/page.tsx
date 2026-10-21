import { ContactForm } from '@/components/ContactForm';
import { ContactMethods } from '@/components/ContactMethods';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact — Michael Murphy',
  description:
    'Get in touch with Michael Murphy for software engineering opportunities, research collaborations, or technical projects.',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen px-6 pt-28 sm:pt-36 pb-24">
      <div className="relative z-10 mx-auto w-full max-w-2xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
        >
          <ArrowLeft size={13} /> Back to overview
        </Link>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-2">
            Contact
          </h1>
          <p className="text-sm text-[#6E6E73] leading-relaxed">
            Reach out via email or connect on LinkedIn and GitHub.
          </p>
        </div>

        <ContactMethods />

        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6E6E73]">
            Quick Message
          </h2>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}