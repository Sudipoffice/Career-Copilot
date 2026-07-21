import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Pricing', href: '#', disabled: true },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Company: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Twitter', href: '#' },
    { label: 'Contact', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">
                CC
              </span>
              Career Copilot
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI-powered career preparation platform. Analyze, improve, and prepare — all in one place.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://github.com" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-sm ${
                        'disabled' in link && link.disabled
                          ? 'text-muted-foreground/50 cursor-not-allowed'
                          : 'text-muted-foreground hover:text-foreground transition-colors'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Career Copilot AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
