import { Footer } from '@/components/Footer'

export default function ResearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-20 w-full flex-1">
        <h1 className="text-5xl font-bold tracking-tighter text-white mb-2">Research</h1>
        <p className="text-lg font-medium text-zinc-400 mb-12">
          Machine Learning · Villanova University · November 2025
        </p>

        <div className="glass-panel rounded-2xl p-8 mb-12 shadow-xl shadow-[#003366]/10 hover:border-white/20 transition-all">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            Measuring the Accuracy of Various Machine Learning Algorithms in Determining the Price of NVIDIA&apos;s Stock
          </h2>
          <p className="text-sm font-semibold text-[#13B5EA] mb-6">
            Michael Murphy · Villanova University, IES Abroad, Universidad Complutense de Madrid · 17 pages · 2025
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {['Random Forest', 'Logistic Regression', 'SVM', 'KNN', 'Naive Bayes', 'Decision Tree', 'Scikit-learn', 'Python'].map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300 shadow-sm">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-zinc-400 text-base font-medium leading-relaxed mb-8">
            This project compares six machine learning algorithms in predicting the daily price
            direction of NVIDIA (NVDA) stock as a binary classification task. Using historical OHLCV
            data from Kaggle, over 20 technical indicators were engineered as features. Random Forest
            emerged as the top performer with 53.7% accuracy and a ROC-AUC of 0.527, though all
            models clustered near 50%, consistent with the efficient market hypothesis. Results suggest
            that technical indicators alone have limited predictive power for real-world trading.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase mb-2">Best Accuracy</p>
              <p className="text-2xl font-bold text-white">53.7%</p>
              <p className="text-xs font-semibold text-[#13B5EA] mt-1">Random Forest</p>
            </div>
            <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase mb-2">Best F1-Score</p>
              <p className="text-2xl font-bold text-white">0.583</p>
              <p className="text-xs font-semibold text-[#13B5EA] mt-1">Logistic Regression</p>
            </div>
            <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase mb-2">Best ROC-AUC</p>
              <p className="text-2xl font-bold text-white">0.527</p>
              <p className="text-xs font-semibold text-[#13B5EA] mt-1">Random Forest</p>
            </div>
            <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase mb-2">Models Tested</p>
              <p className="text-2xl font-bold text-white">6</p>
              <p className="text-xs font-semibold text-[#13B5EA] mt-1">Classifiers</p>
            </div>
          </div>

          <a
            href="/Artificial_Intelligence_Write_Up.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white text-[#000814] px-6 py-3 font-bold transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Download Full Report
          </a>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="/ml-paper.pdf"
            className="w-full bg-white/5"
            style={{ height: '90vh' }}
            title="NVIDIA Stock Price ML Research Paper"
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}