import { ArrowRight, Target, BarChart3, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const WorkflowSection = () => {
  const steps = [
    {
      icon: Target,
      title: "Discover",
      description: "We assess your current ESG maturity, data landscape, and strategic objectives to identify opportunities and gaps.",
      color: "bg-highlight-soft text-primary",
    },
    {
      icon: BarChart3,
      title: "Analyze",
      description: "Our analytics team builds custom models and dashboards to transform raw data into actionable sustainability insights.",
      color: "bg-success-soft text-success",
    },
    {
      icon: Rocket,
      title: "Transform",
      description: "We implement solutions, train your teams, and provide ongoing support to ensure lasting impact and continuous improvement.",
      color: "bg-warning-soft text-warning",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            A proven methodology for ESG excellence
          </h2>
          <p className="text-lg text-muted-foreground">
            Our three-phase approach ensures we understand your unique challenges, deliver tailored solutions, and create sustainable value for your organization.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.color} mb-6`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="group">
            Explore Our Methodology
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
