import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Harles & Associates',
  description: 'Privacy Policy for Harles & Associates - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-secondary/30 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground mb-4">Legal</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Modified: December 16, 2024</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-lg text-muted-foreground leading-relaxed">
              This Privacy Policy describes how Harles & Associates (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, shares, and protects personal information when you use our website and services. We are committed to protecting your privacy in accordance with the Data Protection Act, 2012 (Act 843) of Ghana and other applicable data protection laws.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect the following types of personal information:
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Contact information (name, email address, phone number, company name)</li>
              <li>Professional information (job title, industry)</li>
              <li>Communication preferences</li>
              <li>Information provided through our booking forms and contact forms</li>
              <li>Any other information you choose to provide to us</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Device information (browser type, operating system, device type)</li>
              <li>IP address and approximate location</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or source</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To provide and improve our sustainability advisory and ESG consulting services</li>
              <li>To respond to your inquiries and schedule consultations</li>
              <li>To send you relevant information about our services (with your consent)</li>
              <li>To analyze website usage and improve user experience</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-4">3. Legal Basis for Processing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under the Data Protection Act, 2012 (Act 843) of Ghana, we process your personal data based on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Consent:</strong> When you have given clear consent for us to process your personal data</li>
              <li><strong>Contractual necessity:</strong> When processing is necessary to fulfill a contract with you</li>
              <li><strong>Legal obligation:</strong> When we need to comply with the law</li>
              <li><strong>Legitimate interests:</strong> When processing is necessary for our legitimate business interests</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share your personal information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Service providers:</strong> Third parties who help us operate our website and deliver services</li>
              <li><strong>Professional advisors:</strong> Lawyers, accountants, and other professionals as needed</li>
              <li><strong>Legal authorities:</strong> When required by law or to protect our legal rights</li>
              <li><strong>Business transfers:</strong> In connection with any merger, acquisition, or sale of assets</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience on our website. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can manage your cookie preferences through our cookie consent banner or your browser settings.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under the Data Protection Act, 2012 (Act 843) of Ghana, you have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Right of access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to restrict processing:</strong> Request limitation of how we use your data</li>
              <li><strong>Right to data portability:</strong> Request transfer of your data</li>
              <li><strong>Right to object:</strong> Object to processing of your personal data</li>
              <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the information provided below.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">7. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">8. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. When your data is no longer needed, we will securely delete or anonymize it.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">9. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than Ghana. When we transfer data internationally, we ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">11. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website with a new &quot;Last Modified&quot; date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us:
            </p>
            <div className="bg-secondary/30 p-6 rounded-xl">
              <p className="text-foreground font-semibold mb-2">Harles & Associates</p>
              <p className="text-muted-foreground">No 12, Nii Nortei Nyanchi Street</p>
              <p className="text-muted-foreground">Airport-West, Accra, Ghana</p>
              <p className="text-muted-foreground mt-2">Email: info@harlesassociates.com</p>
              <p className="text-muted-foreground">Tel: +233 55 555 0287</p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

