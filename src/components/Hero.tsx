import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-xl animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-6">
              Achieve <span className="text-gradient">Sustainability Excellence</span> with Confidence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Harles &amp; Associates is your trusted partner for sustainability advisory, ESG compliance solutions, environmental assessments, and practical digital tools. We help organizations meet regulatory requirements, reduce environmental risk, and strengthen governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-a-call" className="btn btn-primary group">
                <span>Book a Call</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-highlight-soft via-transparent to-success-soft rounded-3xl blur-3xl opacity-60" />

              <div className="relative bg-card rounded-2xl shadow-product overflow-hidden border border-border">
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm font-medium">ESG Snapshot</p>
                      <p className="text-xs text-muted-foreground">Quarterly performance overview</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                      Updated today
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Governance', value: '82' },
                      { label: 'Environment', value: '76' },
                      { label: 'Social', value: '88' },
                    ].map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-border bg-secondary/50 p-4">
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-semibold">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-border p-4">
                    <p className="text-sm font-medium mb-2">Momentum</p>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[72%] rounded-full bg-primary" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">On track to exceed targets</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-8 bg-card rounded-xl shadow-xl p-4 border border-border animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-highlight-soft rounded-lg">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3v18h18" />
                      <path d="M18 9l-5 5-4-4-3 3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Risk Insights</p>
                    <p className="text-xs text-muted-foreground">Early warnings &amp; actions</p>
                  </div>
                  <button type="button" className="btn btn-secondary h-9 px-4 ml-4">
                    View →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
