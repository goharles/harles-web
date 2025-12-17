const Footer = () => {
  const footerLinks = {
    Services: ["ESG Strategy", "Data Analytics", "Technology Consulting", "Compliance & Reporting", "Training"],
    Solutions: ["Carbon Management", "Supply Chain ESG", "Investor Relations", "Regulatory Compliance"],
    Industries: ["Financial Services", "Energy & Utilities", "Manufacturing", "Healthcare", "Technology"],
    Company: ["About Us", "Our Team", "Careers", "Contact", "Press"],
  };

  return (
    <footer className="py-16 bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L4 10v12l12 6 12-6V10L16 4z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M16 4v12m0 0l12 6m-12-6L4 16" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="text-xl font-semibold tracking-tight">VERDANT</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Data-driven ESG consulting. We help organizations navigate sustainability with analytics and technology.
            </p>
            <div className="flex gap-4">
              {["LinkedIn", "Twitter", "YouTube"].map((social) => (
                <a 
                  key={social}
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Verdant Consulting. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link) => (
              <a 
                key={link}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
