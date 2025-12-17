import AnnouncementBanner from "@/components/AnnouncementBanner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import FeaturesSection from "@/components/FeaturesSection";
import WorkflowSection from "@/components/WorkflowSection";
import RiskTypesSection from "@/components/RiskTypesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBanner />
      <Header />
      <main>
        <HeroSection />
        <ClientLogos />
        <FeaturesSection />
        <WorkflowSection />
        <RiskTypesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
