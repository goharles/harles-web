'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // If not on homepage, navigate to homepage with hash
    if (pathname !== '/') {
      router.push(`/#${targetId}`);
      return;
    }

    // If on homepage, smooth scroll to section
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="footer" className="py-16 bg-secondary/50 border-t border-border scroll-mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">Harles & Associates</h3>
            <p className="text-muted-foreground max-w-xs">
              Sustainability advisory and ESG solutions for organizations committed to responsible business.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#our-strategy"
                  onClick={(e) => handleSmoothScroll(e, 'our-strategy')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer"
                >
                  Our Strategy
                </a>
              </li>
              <li>
                <Link href="/book-a-call" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm">
                Address: No 12, Nii Nortei Nyanchi Street,<br></br>
                Airport-West, 
                Accra, Ghana
              </li>
              <li className="text-muted-foreground text-sm">
                Email: leslienarh@goharles.com
              </li>
              <li className="text-muted-foreground text-sm">
                Tel: +233 55 555 0287
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/harles-associates/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Image
                    src="/linkedin.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-sm">Connect on LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Harles & Associates. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
