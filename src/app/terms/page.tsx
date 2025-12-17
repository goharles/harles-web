import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Harles & Associates',
  description: 'Terms of Service for Harles & Associates - Read our terms and conditions for using our website and services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-secondary/30 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground mb-4">Legal</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last Modified: December 16, 2024</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Welcome to Harles & Associates. Please read these Terms of Service (&quot;Terms&quot;) carefully before using our website at harlesassociates.com (the &quot;Website&quot;). By accessing or using our Website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Website.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using this Website, you accept and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all visitors, users, and others who access or use the Website. We may update these Terms from time to time, and your continued use of the Website constitutes acceptance of any changes.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">2. Description of Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Harles & Associates is a multidisciplinary consultancy providing:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Sustainability advisory services</li>
              <li>ESG (Environmental, Social, and Governance) compliance solutions</li>
              <li>Environmental impact assessments</li>
              <li>Climate risk assessments</li>
              <li>Governance and policy development</li>
              <li>Digital sustainability tools and software</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              The information provided on this Website is for general informational purposes only and does not constitute professional advice.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">3. Use of Website</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Use the Website in any way that violates any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the Website</li>
              <li>Use the Website to transmit any harmful, offensive, or illegal content</li>
              <li>Interfere with or disrupt the Website or servers connected to the Website</li>
              <li>Use automated systems or software to extract data from the Website</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Use the Website for any commercial purpose without our prior written consent</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-4">4. Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Harles & Associates, its licensors, or other providers of such material and are protected by Ghana and international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website without our prior written consent.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">5. User Submissions</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any information, feedback, or materials you submit through the Website (including through contact forms or booking requests) will be treated in accordance with our Privacy Policy. By submitting any content, you grant us a non-exclusive, royalty-free license to use, reproduce, and display such content for the purpose of providing our services.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">6. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Website may contain links to third-party websites or services that are not owned or controlled by Harles & Associates. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any such third-party websites or services.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE WEBSITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. HARLES & ASSOCIATES DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, HARLES & ASSOCIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE WEBSITE.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">9. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to defend, indemnify, and hold harmless Harles & Associates, its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms or your use of the Website.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Ghana, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the courts of Ghana, and you consent to the jurisdiction of such courts.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">11. Severability</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of these Terms is held to be invalid, illegal, or unenforceable, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, shall be severed from these Terms, and the remaining provisions shall continue in full force and effect.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">12. Entire Agreement</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Harles & Associates regarding your use of the Website and supersede all prior and contemporaneous agreements, representations, and understandings.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">13. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
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

