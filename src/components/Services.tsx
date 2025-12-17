export default function Services() {
  const services = [
    {
      title: 'Sustainability Strategy',
      description: 'Develop comprehensive sustainability strategies tailored to your organization\'s goals and stakeholder expectations.',
    },
    {
      title: 'ESG Reporting',
      description: 'Produce auditable ESG reports aligned with ISSB, GRI, and sector-specific frameworks.',
    },
    {
      title: 'Climate Risk Assessment',
      description: 'Identify and quantify climate-related risks and opportunities across your operations.',
    },
    {
      title: 'Environmental Impact Assessment',
      description: 'Comprehensive EIA and ESIA services to support project development and regulatory compliance.',
    },
    {
      title: 'Digital Tools & Software',
      description: 'Scalable digital solutions that simplify sustainability reporting and compliance management.',
    },
    {
      title: 'Governance & Policy',
      description: 'Develop robust governance frameworks and policies to embed sustainability across your organization.',
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 scroll-mt-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Our Core Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive sustainability and environmental solutions designed to help your organization thrive responsibly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
