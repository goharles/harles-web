'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
};

const COOKIE_CONSENT_KEY = 'harles-cookie-consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
    };
    setPreferences(essentialOnly);
    savePreferences(essentialOnly);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Cannot toggle essential cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center p-4 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
        onClick={() => {}} // Prevent closing by clicking backdrop
      />
      
      {/* Banner */}
      <div className="relative w-full max-w-2xl bg-background border border-border rounded-2xl shadow-xl pointer-events-auto mb-4 animate-fade-up">
        <div className="p-6">
          {!showPreferences ? (
            // Main consent view
            <>
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                    By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can also customize your preferences.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="btn btn-primary flex-1"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectNonEssential}
                  className="btn btn-secondary flex-1"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="btn bg-transparent border border-border hover:bg-secondary/50 flex-1"
                >
                  Customize
                </button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Learn more in our{' '}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </>
          ) : (
            // Preferences view
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Cookie Preferences</h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Go back"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Essential Cookies */}
                <div className="flex items-start justify-between p-4 bg-secondary/30 rounded-xl">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">Essential Cookies</h4>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Required</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      These cookies are necessary for the website to function and cannot be disabled.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-not-allowed opacity-70">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-secondary/30 rounded-xl">
                  <div className="flex-1 pr-4">
                    <h4 className="font-medium mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website to improve user experience.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.analytics ? 'bg-primary' : 'bg-muted'
                      }`}
                      aria-label={`${preferences.analytics ? 'Disable' : 'Enable'} analytics cookies`}
                    >
                      <div 
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          preferences.analytics ? 'right-1' : 'left-1'
                        }`} 
                      />
                    </button>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-4 bg-secondary/30 rounded-xl">
                  <div className="flex-1 pr-4">
                    <h4 className="font-medium mb-1">Functional Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable enhanced functionality and personalization, such as remembering your preferences.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      onClick={() => togglePreference('functional')}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.functional ? 'bg-primary' : 'bg-muted'
                      }`}
                      aria-label={`${preferences.functional ? 'Disable' : 'Enable'} functional cookies`}
                    >
                      <div 
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          preferences.functional ? 'right-1' : 'left-1'
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="btn btn-primary flex-1"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="btn btn-secondary flex-1"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

