import { TerminalFooter } from '@/components/TerminalFooter'

export default function ResearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-20 w-full flex-1">
        <p className="font-mono text-sm text-green-500 mb-4">❯ open ml-paper.pdf</p>
        <h1 className="text-4xl font-bold text-zinc-100 mb-2">Research</h1>
        <p className="font-mono text-sm text-zinc-500 mb-8">
          Machine Learning · Villanova University · November 2025
        </p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mb-8">
          <h2 className="font-mono text-lg font-semibold text-zinc-100 mb-1">
            Measuring the Accuracy of Various Machine Learning Algorithms in Determining the Price of NVIDIA&apos;s Stock
          </h2>
          <p className="font-mono text-xs text-zinc-500 mb-6">
            Michael Murphy · Villanova University, IES Abroad, Universidad Complutense de Madrid · 17 pages · 2025
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {['Random Forest', 'Logistic Regression', 'SVM', 'KNN', 'Naive Bayes', 'Decision Tree', 'Scikit-learn', 'Python'].map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-300">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            This project compares six machine learning algorithms in predicting the daily price
            direction of NVIDIA (NVDA) stock as a binary classification task. Using historical OHLCV
            data from Kaggle, over 20 technical indicators were engineered as features. Random Forest
            emerged as the top performer with 53.7% accuracy and a ROC-AUC of 0.527, though all
            models clustered near 50%, consistent with the efficient market hypothesis. Results suggest
            that technical indicators alone have limited predictive power for real-world trading.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 rounded-lg border border-zinc-800 bg-zinc-950/50">
            <div>
              <p className="font-mono text-xs text-zinc-600 mb-1">best accuracy</p>
              <p className="font-mono text-lg font-bold text-green-400">53.7%</p>
              <p className="font-mono text-xs text-zinc-500">Random Forest</p>
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-600 mb-1">best F1-score</p>
              <p className="font-mono text-lg font-bold text-sky-400">0.583</p>
              <p className="font-mono text-xs text-zinc-500">Logistic Regression</p>
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-600 mb-1">best ROC-AUC</p>
              <p className="font-mono text-lg font-bold text-purple-400">0.527</p>
              <p className="font-mono text-xs text-zinc-500">Random Forest</p>
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-600 mb-1">models tested</p>
              <p className="font-mono text-lg font-bold text-amber-400">6</p>
              <p className="font-mono text-xs text-zinc-500">classifiers</p>
            </div>
          </div>

          <a
            href="/Artificial_Intelligence_Write_Up.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            ↓ download pdf
          </a>
        </div>

        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          <iframe
            src="/ml-paper.pdf"
            className="w-full"
            style={{ height: '90vh' }}
            title="NVIDIA Stock Price ML Research Paper"
          />
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}