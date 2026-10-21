import { Metadata } from 'next';
import { ResearchViewer } from '@/components/ResearchViewer';

export const metadata: Metadata = {
  title: 'Research & Publications — Michael Murphy',
  description:
    'Academic research papers authored by Michael Murphy at Villanova University and Universidad Complutense de Madrid: Serverless Cold Start Virtualization Latency and NVIDIA Stock Machine Learning Benchmark.',
};

export default function ResearchPage() {
  return (
    <main className="relative min-h-screen px-6 pt-28 sm:pt-36 pb-24">
      <div className="relative z-10 mx-auto max-w-4xl">
        <ResearchViewer />
      </div>
    </main>
  );
}