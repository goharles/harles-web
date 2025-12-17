import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import productDashboard from "@/assets/product-dashboard.png";

const HeroSection = () => {
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="max-w-xl animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-6">
              Data-driven ESG strategy for sustainable growth
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              We combine ESG expertise, advanced analytics, and technology consulting to help organizations navigate sustainability challenges and unlock new value
            </p>
            <Button variant="hero" size="lg" className="group">
              Schedule a Consultation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right Content - Product Screenshot */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Background gradient blob */}
              <div className="absolute -inset-4 bg-gradient-to-br from-highlight-soft via-transparent to-success-soft rounded-3xl blur-3xl opacity-60" />
              
              {/* Product image */}
              <div className="relative bg-card rounded-2xl shadow-product overflow-hidden border border-border">
                <img 
                  src={productDashboard}
                  alt="Verdant ESG Analytics Dashboard showing sustainability metrics and performance data"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-8 bg-card rounded-xl shadow-xl p-4 border border-border animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-highlight-soft rounded-lg">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3v18h18" />
                      <path d="M18 9l-5 5-4-4-3 3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">ESG Performance Score</p>
                    <p className="text-xs text-muted-foreground">Real-time sustainability tracking</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-4">
                    View
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
