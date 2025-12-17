import { Check, X } from "lucide-react";

const FeaturesSection = () => {
  const comparisons = [
    {
      without: "Siloed ESG data scattered across spreadsheets and systems",
      with: "Unified data platform with real-time ESG metrics and insights",
    },
    {
      without: "Manual reporting processes that consume weeks of effort",
      with: "Automated reporting aligned with GRI, SASB, TCFD, and CDP frameworks",
    },
    {
      without: "Reactive sustainability initiatives with unclear ROI",
      with: "Proactive strategy backed by predictive analytics and measurable outcomes",
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Transform ESG complexity into competitive advantage
          </h2>
          <p className="text-lg text-muted-foreground">
            Our integrated approach combines deep ESG knowledge with cutting-edge data analytics and technology implementation to deliver measurable sustainability outcomes.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: "ESG Strategy & Advisory",
              description: "Develop comprehensive sustainability roadmaps aligned with global standards and stakeholder expectations.",
            },
            {
              title: "Data Analytics & AI",
              description: "Leverage advanced analytics, machine learning, and AI to uncover insights from your ESG data and predict future performance.",
            },
            {
              title: "Technology Implementation",
              description: "Deploy and integrate best-in-class ESG platforms, data infrastructure, and reporting solutions tailored to your needs.",
            },
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* AI Section */}
        <div className="bg-secondary/50 rounded-3xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-4">
            Intelligence-driven consulting with human expertise at the core
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Our proprietary analytics platform processes millions of data points to identify trends and risks, while our experienced consultants translate insights into actionable strategies. The result is data-backed recommendations you can trust and implement with confidence.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Without */}
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="bg-secondary/50 p-4 border-b border-border">
              <h4 className="font-semibold text-muted-foreground">Traditional Approach</h4>
              <p className="text-sm text-muted-foreground">Fragmented and resource-intensive</p>
            </div>
            <div className="p-6 space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{item.without}</p>
                </div>
              ))}
            </div>
          </div>

          {/* With */}
          <div className="rounded-2xl border-2 border-primary overflow-hidden shadow-lg">
            <div className="bg-primary/10 p-4 border-b border-primary/20">
              <h4 className="font-semibold text-primary">With Verdant</h4>
              <p className="text-sm text-primary/80">Integrated, efficient, and impactful</p>
            </div>
            <div className="p-6 space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <p className="text-foreground">{item.with}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
