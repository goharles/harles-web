export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Assess',
      description: 'We conduct a comprehensive assessment of your current sustainability maturity, regulatory requirements, and organizational goals.',
    },
    {
      number: '02',
      title: 'Plan',
      description: 'Develop a tailored roadmap with clear milestones, timelines, and resource requirements aligned with your business strategy.',
    },
    {
      number: '03',
      title: 'Implement',
      description: 'Execute sustainability initiatives with our expert guidance, leveraging our digital tools and best practices.',
    },
    {
      number: '04',
      title: 'Monitor & Report',
      description: 'Continuously track progress, measure impact, and produce auditable reports for stakeholders and regulators.',
    },
  ];

  return (
    <section id="our-strategy" className="py-20 lg:py-28 bg-secondary/40 scroll-mt-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            How We Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our proven methodology ensures sustainable results and lasting impact for your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-2xl border border-border p-8 text-center h-full hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl font-semibold text-primary mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
