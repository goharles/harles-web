import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-banner text-banner-foreground">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
          Ready to Transform Your Sustainability Journey?
        </h2>
        <p className="text-lg text-banner-foreground/80 max-w-3xl mx-auto mb-10">
          Let&apos;s work together to achieve sustainability excellence, strengthen your ESG performance, and create lasting value for your organization.
        </p>
        <div className="flex items-center justify-center">
          <Link href="/book-a-call" className="btn bg-background text-foreground hover:bg-background/90 rounded-full group">
            <span>Book a Call</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
