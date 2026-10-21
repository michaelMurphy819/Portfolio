'use client';

import { useState, useSyncExternalStore } from 'react';
import {
  FileText,
  Download,
  Brain,
  Award,
  ArrowLeft,
  Cpu,
  Server,
  Zap,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

// Systems Paper Data
const SYSTEMS_METRICS = [
  { label: 'MicroVM Boot', value: '~125ms', sub: 'AWS Firecracker', color: 'text-[#0071E3]' },
  { label: 'Library I/O Rule', value: '80%', sub: 'SlimStart Mapping', color: 'text-amber-700' },
  { label: 'SnapStart Reduction', value: '90%', sub: 'CRIU Snapshotting', color: 'text-emerald-700' },
  { label: 'Paper Scope', value: '7 Pages', sub: 'Villanova University', color: 'text-[#1D1D1F]' },
];

const SYSTEMS_TIERS = [
  {
    tier: 'Traditional VM',
    boot: '10 – 30s',
    isolation: 'Hardware (BIOS/PCI)',
    overhead: 'High',
    tradeoff: 'Massive startup penalty & unused generic device drivers',
  },
  {
    tier: 'AWS Firecracker',
    boot: '~125ms',
    isolation: 'KVM + 4 VirtIO Devs',
    overhead: 'Minimal',
    tradeoff: 'Near-instant bare boot; language runtime initialization remains',
  },
  {
    tier: 'Interpreted (Python/Node)',
    boot: '20 – 50ms',
    isolation: 'MicroVM Sandbox',
    overhead: 'Low',
    tradeoff: 'Fast cold starts; lower peak mathematical execution speed',
  },
  {
    tier: 'Managed JVM (Java/C#)',
    boot: '3 – 8s',
    isolation: 'MicroVM Sandbox',
    overhead: 'Very High',
    tradeoff: 'Heavy classloading & JIT compilation spikes delay handler',
  },
  {
    tier: 'AWS SnapStart (CRIU)',
    boot: '~250ms',
    isolation: 'Encrypted Snapshot',
    overhead: 'Minimal',
    tradeoff: '90% delay reduction; requires entropy reseeding & socket reconnection',
  },
  {
    tier: 'Unikernels (Future)',
    boot: '< 10ms',
    isolation: 'Single Address Space',
    overhead: 'Near Zero',
    tradeoff: 'Bypasses kernel/user context switch; specialized compile pipelines',
  },
];

// Machine Learning Paper Data
const ML_METRICS = [
  { label: 'Top Accuracy', value: '53.7%', sub: 'Random Forest', color: 'text-[#0071E3]' },
  { label: 'Best F1-Score', value: '0.583', sub: 'Logistic Regression', color: 'text-emerald-700' },
  { label: 'Top ROC-AUC', value: '0.527', sub: 'Random Forest', color: 'text-purple-700' },
  { label: 'Paper Scope', value: '17 Pages', sub: 'Villanova & UCM Madrid', color: 'text-[#1D1D1F]' },
];

const ML_ALGORITHMS = [
  { name: 'Random Forest', accuracy: '53.7%', f1: '0.562', auc: '0.527', note: 'Top overall predictive stability' },
  { name: 'Logistic Regression', accuracy: '52.4%', f1: '0.583', auc: '0.518', note: 'Highest sensitivity & F1 score' },
  { name: 'Support Vector Machine (SVM)', accuracy: '51.2%', f1: '0.521', auc: '0.509', note: 'RBF kernel boundary fitting' },
  { name: 'K-Nearest Neighbors (KNN)', accuracy: '50.4%', f1: '0.498', auc: '0.501', note: 'Distance metric clustering' },
  { name: 'Decision Tree', accuracy: '50.1%', f1: '0.511', auc: '0.499', note: 'Prone to high variance on noise' },
  { name: 'Gaussian Naive Bayes', accuracy: '49.8%', f1: '0.485', auc: '0.496', note: 'Feature independence violated' },
];

function subscribeToHash(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHashSnapshot() {
  return typeof window !== 'undefined' ? window.location.hash : '';
}

function getServerHashSnapshot() {
  return '';
}

export function ResearchViewer() {
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);
  const [selectedTab, setSelectedTab] = useState<'systems' | 'ml' | null>(null);

  const activeTab = selectedTab ?? (hash === '#ml-paper' ? 'ml' : 'systems');

  const handleTabChange = (tab: 'systems' | 'ml') => {
    setSelectedTab(tab);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tab === 'systems' ? 'systems-paper' : 'ml-paper'}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Link & Segmented Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
        >
          <ArrowLeft size={13} /> Back to overview
        </Link>

        {/* Apple Segmented Control */}
        <div className="inline-flex p-1 rounded-full bg-[#F5F5F7] border border-black/[0.06] shadow-inner">
          <button
            onClick={() => handleTabChange('systems')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'systems'
                ? 'bg-white text-[#1D1D1F] shadow-sm'
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Cpu size={12} className={activeTab === 'systems' ? 'text-[#0071E3]' : ''} />
              Computer Systems (7 Pages)
            </span>
          </button>
          <button
            onClick={() => handleTabChange('ml')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'ml'
                ? 'bg-white text-[#1D1D1F] shadow-sm'
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Brain size={12} className={activeTab === 'ml' ? 'text-[#0071E3]' : ''} />
              Machine Learning (17 Pages)
            </span>
          </button>
        </div>
      </div>

      {/* SYSTEMS PAPER VIEW */}
      {activeTab === 'systems' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-black/[0.05] text-[11px] font-medium text-[#424245] mb-3">
              <Server size={12} className="text-emerald-700" />
              <span>Computer Systems & Cloud Virtualization</span>
              <span>·</span>
              <span>7 Pages</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-3 leading-tight">
              The Cold Start Problem in Serverless Computing
            </h1>

            <p className="text-sm font-medium text-[#6E6E73] leading-relaxed">
              <span className="text-[#1D1D1F] font-semibold">Michael Murphy</span> · Villanova University, Department of Computer Science · April 2026
            </p>
          </div>

          {/* Summary Card */}
          <div className="apple-card p-6 sm:p-8 bg-white border border-black/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700">
                  Architectural Analysis & Findings
                </span>
                <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight mt-0.5">
                  Virtualization Latency, ELF Memory Mapping & CRIU Mitigations
                </h2>
              </div>

              <a
                href="/systems-paper.pdf"
                download="The_Cold_Start_Problem_in_Serverless_Computing.pdf"
                className="apple-button-primary px-4 py-2 text-xs font-semibold shrink-0"
              >
                <Download size={13} /> Download PDF (120KB)
              </a>
            </div>

            <p className="text-[#424245] text-sm leading-relaxed mb-6">
              In Function-as-a-Service (FaaS) architectures, scale-to-zero economics cause latency spikes known as
              &quot;cold starts&quot; when initializing unallocated instances. With major cloud providers (AWS) transitioning
              in August 2025 to billing directly for execution INIT phases, cold starts evolved from an engineering inconvenience
              into an immediate financial liability. This research explores the systems-level bottlenecks across the control plane,
              microVM hypervisors (AWS Firecracker), runtime loaders, and dynamic memory mapping.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {SYSTEMS_METRICS.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.04] text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium">
                    {m.label}
                  </span>
                  <span className={`text-2xl font-bold ${m.color} block mt-0.5 tracking-tight`}>
                    {m.value}
                  </span>
                  <span className="text-[11px] text-[#6E6E73] mt-0.5 block truncate">
                    {m.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Systems Architecture Table */}
            <div className="rounded-xl border border-black/[0.08] overflow-hidden mb-6">
              <div className="px-4 py-2.5 border-b border-black/[0.06] bg-[#F5F5F7] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1D1D1F]">Serverless Virtualization & Runtime Hierarchy</span>
                <span className="text-[10px] text-[#86868B] uppercase tracking-wider">Systems Architecture</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.04] text-[#86868B] bg-white">
                      <th className="px-4 py-2.5 font-medium">Tier / Paradigm</th>
                      <th className="px-3 py-2.5 font-medium">Boot Latency</th>
                      <th className="px-3 py-2.5 font-medium">Isolation Boundary</th>
                      <th className="px-3 py-2.5 font-medium">Overhead</th>
                      <th className="px-4 py-2.5 font-medium">Architectural Trade-Off</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] bg-white">
                    {SYSTEMS_TIERS.map((tier) => (
                      <tr key={tier.tier} className="hover:bg-[#F5F5F7] transition-colors">
                        <td className="px-4 py-2.5 font-semibold text-[#1D1D1F]">{tier.tier}</td>
                        <td className="px-3 py-2.5 text-[#424245] font-mono">{tier.boot}</td>
                        <td className="px-3 py-2.5 text-[#424245]">{tier.isolation}</td>
                        <td className="px-3 py-2.5 font-semibold text-[#6E6E73]">{tier.overhead}</td>
                        <td className="px-4 py-2.5 text-[#6E6E73]">{tier.tradeoff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Conclusions */}
            <div className="p-4 rounded-xl bg-[#F5F5F7] border border-black/[0.04] space-y-2">
              <h3 className="text-xs font-semibold text-[#1D1D1F] flex items-center gap-1.5">
                <Zap size={13} className="text-emerald-700" />
                Key Systems Insights
              </h3>
              <ul className="text-xs text-[#6E6E73] space-y-1.5 leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-[#1D1D1F]">The SlimStart &quot;80% Rule&quot;:</strong> Startup latency is primarily an I/O memory-mapping bottleneck rather than raw compute. Up to 80% of initialization time is spent by the dynamic linker mapping ELF shared library segments into virtual memory before handler code executes.
                </li>
                <li>
                  <strong className="text-[#1D1D1F]">Firecracker MicroVMs:</strong> By replacing legacy BIOS and bus probing with direct KVM <code className="text-[#1D1D1F] bg-white px-1 py-0.5 rounded border border-black/[0.06]">ioctl()</code> syscalls and 4 minimal VirtIO devices, microVMs achieve bare-metal isolation within ~125ms.
                </li>
                <li>
                  <strong className="text-[#1D1D1F]">CRIU & SnapStart:</strong> Snapshot-based checkpoint/restoration slashes cold starts by 90% (from 5s down to 250ms), requiring kernel-level entropy reseeding and socket reconnection hooks upon unfreezing.
                </li>
              </ul>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div className="apple-card overflow-hidden bg-white border border-black/[0.08] shadow-sm">
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.06] bg-[#F5F5F7]">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-emerald-700" />
                <span className="text-xs font-semibold text-[#1D1D1F]">Paper Preview (7 Pages)</span>
              </div>
              <a
                href="/systems-paper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0071E3] hover:underline"
              >
                Open in new tab <ExternalLink size={12} />
              </a>
            </div>
            <iframe
              src="/systems-paper.pdf"
              className="w-full bg-[#FAFAFC]"
              style={{ height: '80vh' }}
              title="The Cold Start Problem in Serverless Computing"
            />
          </div>
        </div>
      )}

      {/* MACHINE LEARNING PAPER VIEW */}
      {activeTab === 'ml' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-black/[0.05] text-[11px] font-medium text-[#424245] mb-3">
              <Brain size={12} className="text-[#0071E3]" />
              <span>Machine Learning Research</span>
              <span>·</span>
              <span>17 Pages</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-3 leading-tight">
              Measuring the Accuracy of Machine Learning Algorithms on NVIDIA&apos;s Stock
            </h1>

            <p className="text-sm font-medium text-[#6E6E73] leading-relaxed">
              <span className="text-[#1D1D1F] font-semibold">Michael Murphy</span> · Villanova University, IES Abroad,
              Universidad Complutense de Madrid · November 2025
            </p>
          </div>

          {/* Summary Card */}
          <div className="apple-card p-6 sm:p-8 bg-white border border-black/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0071E3]">
                  Abstract & Findings
                </span>
                <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight mt-0.5">
                  Evaluation Against the Efficient Market Hypothesis
                </h2>
              </div>

              <a
                href="/ml-paper.pdf"
                download="Measuring_Accuracy_ML_Algorithms_NVIDIA_Stock.pdf"
                className="apple-button-primary px-4 py-2 text-xs font-semibold shrink-0"
              >
                <Download size={13} /> Download PDF (1.4MB)
              </a>
            </div>

            <p className="text-[#424245] text-sm leading-relaxed mb-6">
              This study evaluates whether supervised machine learning models can predict the daily price direction
              (binary up/down classification) of NVIDIA (NVDA) stock. Using multi-year historical daily OHLCV trading data,
              over 20 quantitative technical indicators (RSI, MACD, Bollinger Bands, ATR) were engineered as predictive features.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {ML_METRICS.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.04] text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium">
                    {m.label}
                  </span>
                  <span className={`text-2xl font-bold ${m.color} block mt-0.5 tracking-tight`}>
                    {m.value}
                  </span>
                  <span className="text-[11px] text-[#6E6E73] mt-0.5 block truncate">
                    {m.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Model Comparison Table */}
            <div className="rounded-xl border border-black/[0.08] overflow-hidden mb-6">
              <div className="px-4 py-2.5 border-b border-black/[0.06] bg-[#F5F5F7] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1D1D1F]">Classifier Benchmark Results</span>
                <span className="text-[10px] text-[#86868B] uppercase tracking-wider">Historical NVDA OHLCV</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.04] text-[#86868B] bg-white">
                      <th className="px-4 py-2.5 font-medium">Algorithm</th>
                      <th className="px-3 py-2.5 font-medium">Accuracy</th>
                      <th className="px-3 py-2.5 font-medium">F1</th>
                      <th className="px-3 py-2.5 font-medium">ROC-AUC</th>
                      <th className="px-4 py-2.5 font-medium">Observation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] bg-white">
                    {ML_ALGORITHMS.map((alg) => (
                      <tr key={alg.name} className="hover:bg-[#F5F5F7] transition-colors">
                        <td className="px-4 py-2.5 font-semibold text-[#1D1D1F]">{alg.name}</td>
                        <td className="px-3 py-2.5 text-[#424245] font-mono">{alg.accuracy}</td>
                        <td className="px-3 py-2.5 text-[#424245] font-mono">{alg.f1}</td>
                        <td className="px-3 py-2.5 text-[#424245] font-mono">{alg.auc}</td>
                        <td className="px-4 py-2.5 text-[#6E6E73]">{alg.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conclusion */}
            <div className="p-4 rounded-xl bg-[#F5F5F7] border border-black/[0.04] space-y-1.5">
              <h3 className="text-xs font-semibold text-[#1D1D1F] flex items-center gap-1.5">
                <Award size={13} className="text-[#0071E3]" />
                Takeaway
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Random Forest led at 53.7% accuracy, but all models clustered near 50%, empirically aligning with the
                semi-strong form of Eugene Fama&apos;s Efficient Market Hypothesis (EMH). Technical indicators derived
                solely from past price/volume have minimal standalone alpha for trading.
              </p>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div className="apple-card overflow-hidden bg-white border border-black/[0.08] shadow-sm">
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.06] bg-[#F5F5F7]">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-[#0071E3]" />
                <span className="text-xs font-semibold text-[#1D1D1F]">Paper Preview (17 Pages)</span>
              </div>
              <a
                href="/ml-paper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0071E3] hover:underline"
              >
                Open in new tab <ExternalLink size={12} />
              </a>
            </div>
            <iframe
              src="/ml-paper.pdf"
              className="w-full bg-[#FAFAFC]"
              style={{ height: '80vh' }}
              title="NVIDIA Stock Machine Learning Research Paper"
            />
          </div>
        </div>
      )}
    </div>
  );
}
