'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is Harles & Associates?',
      answer: 'Harles & Associates is a multidisciplinary consultancy providing sustainability advisory, ESG compliance solutions, environmental assessments, and innovative digital tools. We help organizations meet regulatory requirements, strengthen governance, reduce environmental risk, and integrate sustainability into everyday operations.',
    },
    {
      question: 'What services does Harles & Associates offer?',
      answer: 'We offer a comprehensive range of services including sustainability strategy development, ESG reporting, climate risk assessments, environmental impact assessments, digital tools and software solutions, governance and policy development, awareness training, and environmental compliance support.',
    },
    {
      question: 'Who is Harles & Associates designed for?',
      answer: 'Our services are designed for organizations of all sizes—from small businesses to large corporations—across various industries. We serve companies with ESG reporting obligations, environmental compliance requirements, and those seeking to integrate sustainability into their operations.',
    },
    {
      question: 'What makes Harles & Associates different?',
      answer: 'Our unique competitive edge lies in our combined expertise in Sustainability + Environment + Technology. We provide solutions tailored to both Ghanaian and global standards, support both corporate ESG needs and statutory environmental requirements, and offer scalable digital tools that simplify reporting and compliance.',
    },
    {
      question: 'How do I get started with Harles & Associates?',
      answer: 'Getting started is simple. Book a demo with our team to discuss your organization\'s sustainability goals and challenges. We\'ll conduct an initial assessment and develop a tailored roadmap for your organization.',
    },
    {
      question: 'Do you offer training and capacity building?',
      answer: 'Yes, we provide awareness training and capacity building services to help your team understand sustainability concepts, ESG frameworks, and best practices. This ensures your organization can effectively implement and maintain sustainability initiatives.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-secondary/40">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our services and how we can help your organization.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                type="button"
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/60 transition-colors"
              >
                <h3 className="text-base md:text-lg font-semibold text-left">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {openIndex === index && (
                <div id={`faq-panel-${index}`} className="px-6 pb-6 border-t border-border bg-card">
                  <p className="text-muted-foreground leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
