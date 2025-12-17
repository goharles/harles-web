import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-banner text-banner-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Ready to accelerate your sustainability transformation?
          </h2>
          <p className="text-lg text-banner-foreground/80 mb-10">
            Partner with Verdant to turn ESG challenges into opportunities. Our team of experts is ready to help you build a more sustainable and profitable future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="xl" 
              className="bg-background text-foreground hover:bg-background/90 rounded-full group"
            >
              Schedule a Consultation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="border-banner-foreground/30 text-banner-foreground hover:bg-banner-foreground/10 rounded-full"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
