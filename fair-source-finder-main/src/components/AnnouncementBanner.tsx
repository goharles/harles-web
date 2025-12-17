import { ArrowRight } from "lucide-react";

const AnnouncementBanner = () => {
  return (
    <div className="bg-banner text-banner-foreground py-3 px-4">
      <div className="container mx-auto flex items-center justify-center gap-4 text-sm">
        <span>
          Unlock the power of ESG data — Transform sustainability metrics into strategic business advantage
        </span>
        <a 
          href="#learn-more" 
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Learn More
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
