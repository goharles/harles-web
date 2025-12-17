'use client';

import { useState } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: 'Harles & Associates helped us develop a comprehensive ESG strategy that aligned with our business goals and stakeholder expectations. Their expertise and digital tools made the process seamless.',
      author: 'Sarah Johnson',
      title: 'Sustainability Director',
      company: 'Manufacturing Corp',
    },
    {
      quote: 'The environmental impact assessment services provided by Harles & Associates were thorough, professional, and delivered on time. They helped us navigate complex regulatory requirements with confidence.',
      author: 'Michael Chen',
      title: 'Operations Manager',
      company: 'Energy Solutions Ltd',
    },
    {
      quote: 'Working with Harles & Associates transformed how we approach sustainability. Their combination of expertise in sustainability, environment, and technology is truly unique.',
      author: 'Amara Osei',
      title: 'CEO',
      company: 'Green Innovations Ghana',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Organizations across industries trust Harles & Associates to deliver results.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-secondary/50 rounded-3xl p-8 md:p-12 border border-border shadow-lg min-h-80 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
              </div>
              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed italic">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground text-lg">
                {testimonials[currentIndex].author}
              </p>
              <p className="text-muted-foreground">
                {testimonials[currentIndex].title} at {testimonials[currentIndex].company}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              type="button"
              aria-label="Previous testimonial"
              className="p-3 rounded-full border border-border hover:bg-secondary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : undefined}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentIndex ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              type="button"
              aria-label="Next testimonial"
              className="p-3 rounded-full border border-border hover:bg-secondary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
