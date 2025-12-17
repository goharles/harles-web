import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Services", hasDropdown: true },
    { label: "Solutions", hasDropdown: true },
    { label: "Industries", hasDropdown: true },
    { label: "Insights", hasDropdown: false },
    { label: "About", hasDropdown: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 10v12l12 6 12-6V10L16 4z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M16 4v12m0 0l12 6m-12-6L4 16" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-xl font-semibold tracking-tight">VERDANT</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                variant="nav" 
                className="px-3"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Client Portal
            </Button>
            <Button size="sm" className="rounded-full">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button 
                  key={item.label} 
                  variant="ghost" 
                  className="justify-start"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="h-4 w-4 ml-auto" />}
                </Button>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
                <Button variant="outline">Client Portal</Button>
                <Button>Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
