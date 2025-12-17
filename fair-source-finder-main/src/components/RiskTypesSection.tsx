import { ArrowRight, Leaf, Database, Cpu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const RiskTypesSection = () => {
  const services = [
    {
      icon: Leaf,
      title: "ESG Strategy",
      description: "Comprehensive sustainability strategy development, materiality assessments, and stakeholder engagement programs.",
      link: "Explore ESG Services",
      color: "bg-success/10 text-success",
    },
    {
      icon: Database,
      title: "Data Analytics",
      description: "Advanced analytics solutions including ESG scorecards, predictive modeling, and real-time performance dashboards.",
      link: "Explore Analytics",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Cpu,
      title: "Technology Consulting",
      description: "ESG platform selection, system integration, cloud migration, and custom software development for sustainability.",
      link: "Explore Technology",
      color: "bg-warning/10 text-warning",
    },
    {
      icon: Shield,
      title: "Compliance & Reporting",
      description: "Regulatory compliance support, ESG disclosure preparation, and audit-ready reporting aligned with global standards.",
      link: "Explore Compliance",
      color: "bg-destructive/10 text-destructive",
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Comprehensive services for your sustainability journey
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-6 bg-card rounded-2xl border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${service.color} mb-5`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-5">{service.description}</p>
              <Button variant="link" className="p-0 h-auto text-primary group-hover:text-primary/80">
                {service.link}
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RiskTypesSection;
