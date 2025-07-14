"use client";

import React from "react";
import { Button } from "@/shared/components/atoms/ui/button";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Input } from "@/shared/components/atoms/ui/input";
import { Textarea } from "@/shared/components/atoms/ui/textarea";
import { Separator } from "@/shared/components/atoms/ui/separator";
import { 
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Heart,
  Star,
  ChevronRight,
  ArrowUp,
  Send,
  MessageSquare,
  Users,
  Award,
  Shield,
  Zap,
  Code,
  Building,
  Calendar,
  CreditCard,
  FileText,
  HelpCircle,
  Settings,
  Download,
  Share2,
  Bookmark,
  Eye,
  ThumbsUp,
  TrendingUp,
  Target,
  Compass,
  Gift,
  Lock,
  CheckCircle
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
}

interface FooterProps {
  variant?: "default" | "minimal" | "corporate" | "ecommerce" | "blog" | "startup" | "agency" | "saas";
  logo?: {
    src?: string;
    text?: string;
    href?: string;
  };
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterDescription?: string;
  onNewsletterSubmit?: (email: string) => void;
  showBackToTop?: boolean;
  showCopyright?: boolean;
  copyrightText?: string;
  showTrustBadges?: boolean;
  showLanguageSelector?: boolean;
  languages?: { code: string; label: string; flag?: string }[];
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
  className?: string;
  theme?: "light" | "dark";
}

const defaultSocialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "#",
    icon: <Facebook className="w-5 h-5" />
  },
  {
    name: "Twitter",
    href: "#",
    icon: <Twitter className="w-5 h-5" />
  },
  {
    name: "Instagram",
    href: "#",
    icon: <Instagram className="w-5 h-5" />
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: <Linkedin className="w-5 h-5" />
  }
];

const defaultSections: FooterSection[] = [
  {
    title: "Produits",
    links: [
      { label: "Fonctionnalités", href: "/features" },
      { label: "Tarifs", href: "/pricing" },
      { label: "API", href: "/api" },
      { label: "Documentation", href: "/docs" }
    ]
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Carrières", href: "/careers", isNew: true },
      { label: "Presse", href: "/press" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Centre d'aide", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "Statut", href: "/status" },
      { label: "Communauté", href: "/community", isPopular: true }
    ]
  },
  {
    title: "Légal",
    links: [
      { label: "Confidentialité", href: "/privacy" },
      { label: "Conditions", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Sécurité", href: "/security" }
    ]
  }
];

function Logo({ logo }: { logo?: FooterProps['logo'] }) {
  const href = logo?.href || "/";
  
  return (
    <a href={href} className="flex items-center space-x-2">
      {logo?.src ? (
        <img src={logo.src} alt="Logo" className="h-8 w-auto" />
      ) : (
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">L</span>
        </div>
      )}
      {logo?.text && (
        <span className="font-bold text-xl">{logo.text}</span>
      )}
    </a>
  );
}

function NewsletterSubscription({ 
  title = "Restez informé", 
  description = "Abonnez-vous à notre newsletter pour recevoir les dernières actualités",
  onSubmit,
  theme = "light"
}: {
  title?: string;
  description?: string;
  onSubmit?: (email: string) => void;
  theme?: "light" | "dark";
}) {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit?.(email);
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className={cn(
          "text-sm",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {description}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-2">
          <Input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="shrink-0"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className={cn(
          "text-xs",
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        )}>
          En vous abonnant, vous acceptez notre politique de confidentialité.
        </p>
      </form>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { icon: <Shield className="w-5 h-5" />, text: "SSL Sécurisé" },
    { icon: <Award className="w-5 h-5" />, text: "Certifié ISO" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "99.9% Uptime" },
    { icon: <Lock className="w-5 h-5" />, text: "RGPD Conforme" }
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center space-x-2 text-sm text-gray-500">
          {badge.icon}
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
}

function BackToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="sm"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
    >
      <ArrowUp className="w-4 h-4" />
    </Button>
  );
}

export function Footer({
  variant = "default",
  logo,
  description = "Une plateforme innovante pour transformer votre façon de travailler.",
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  contactInfo,
  showNewsletter = true,
  newsletterTitle,
  newsletterDescription,
  onNewsletterSubmit,
  showBackToTop = true,
  showCopyright = true,
  copyrightText,
  showTrustBadges = false,
  showLanguageSelector = false,
  languages = [],
  currentLanguage = "fr",
  onLanguageChange,
  className,
  theme = "light"
}: FooterProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return theme === "dark" 
          ? "bg-gray-900 text-white border-t border-gray-800" 
          : "bg-gray-50 border-t";
      case 'corporate':
        return "bg-slate-900 text-white";
      case 'ecommerce':
        return theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white border-t";
      case 'blog':
        return theme === "dark"
          ? "bg-gray-900 text-white border-t border-gray-800"
          : "bg-gray-50 border-t";
      case 'startup':
        return "bg-gradient-to-r from-blue-900 to-purple-900 text-white";
      case 'agency':
        return "bg-black text-white";
      case 'saas':
        return theme === "dark"
          ? "bg-gray-900 text-white border-t border-gray-800"
          : "bg-white border-t shadow-lg";
      default:
        return theme === "dark" 
          ? "bg-gray-900 text-white" 
          : "bg-gray-50";
    }
  };

  if (variant === 'minimal') {
    return (
      <>
        <footer className={cn("w-full py-8", getVariantStyles(), className)}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <Logo logo={logo} />
                <nav className="hidden md:flex items-center space-x-6">
                  {sections[0]?.links.slice(0, 4).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-sm hover:text-blue-600 transition-colors",
                        theme === "dark" ? "text-gray-300 hover:text-blue-400" : "text-gray-600"
                      )}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      theme === "dark" 
                        ? "hover:bg-gray-800 text-gray-400 hover:text-white" 
                        : "hover:bg-gray-200 text-gray-500 hover:text-gray-900"
                    )}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {showCopyright && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <p className={cn(
                  "text-center text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  {copyrightText || `© ${new Date().getFullYear()} Tous droits réservés.`}
                </p>
              </div>
            )}
          </div>
        </footer>
        {showBackToTop && <BackToTop />}
      </>
    );
  }

  if (variant === 'startup' || variant === 'agency') {
    return (
      <>
        <footer className={cn("w-full py-16", getVariantStyles(), className)}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Logo logo={logo} />
                <p className="text-lg leading-relaxed max-w-md">
                  {description}
                </p>
                
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {contactInfo && (
                  <div className="space-y-3 text-sm opacity-90">
                    {contactInfo.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{contactInfo.email}</span>
                      </div>
                    )}
                    {contactInfo.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{contactInfo.phone}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {showNewsletter && (
                <div>
                  <NewsletterSubscription
                    title={newsletterTitle}
                    description={newsletterDescription}
                    onSubmit={onNewsletterSubmit}
                    theme="dark"
                  />
                </div>
              )}
            </div>

            <Separator className="my-12 bg-white/20" />

            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-6">
                {sections[0]?.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm hover:text-blue-300 transition-colors opacity-90 hover:opacity-100"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {showCopyright && (
                <p className="text-sm opacity-70">
                  {copyrightText || `© ${new Date().getFullYear()} Tous droits réservés.`}
                </p>
              )}
            </div>
          </div>
        </footer>
        {showBackToTop && <BackToTop />}
      </>
    );
  }

  // Default comprehensive footer
  return (
    <>
      <footer className={cn("w-full", getVariantStyles(), className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-2 space-y-6">
                <Logo logo={logo} />
                <p className={cn(
                  "text-sm leading-relaxed",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  {description}
                </p>
                
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        theme === "dark" 
                          ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                          : "hover:bg-gray-200 text-gray-500 hover:text-gray-900"
                      )}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {contactInfo && (
                  <div className="space-y-2">
                    {contactInfo.address && (
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                          {contactInfo.address}
                        </span>
                      </div>
                    )}
                    {contactInfo.phone && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4" />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                          {contactInfo.phone}
                        </span>
                      </div>
                    )}
                    {contactInfo.email && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4" />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                          {contactInfo.email}
                        </span>
                      </div>
                    )}
                    {contactInfo.hours && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                          {contactInfo.hours}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Links Sections */}
              {sections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className={cn(
                            "text-sm transition-colors flex items-center space-x-2",
                            theme === "dark" 
                              ? "text-gray-300 hover:text-white"
                              : "text-gray-600 hover:text-gray-900"
                          )}
                        >
                          <span>{link.label}</span>
                          {link.isNew && (
                            <Badge variant="secondary" className="text-xs">
                              Nouveau
                            </Badge>
                          )}
                          {link.isPopular && (
                            <Badge variant="default" className="text-xs">
                              Populaire
                            </Badge>
                          )}
                          {link.badge && (
                            <Badge variant="outline" className="text-xs">
                              {link.badge}
                            </Badge>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Newsletter */}
              {showNewsletter && (
                <div className="lg:col-span-2 space-y-6">
                  <NewsletterSubscription
                    title={newsletterTitle}
                    description={newsletterDescription}
                    onSubmit={onNewsletterSubmit}
                    theme={theme}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className={cn(
            "py-8 border-t",
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          )}>
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                {showCopyright && (
                  <p className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  )}>
                    {copyrightText || `© ${new Date().getFullYear()} Tous droits réservés.`}
                  </p>
                )}

                {showLanguageSelector && languages.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <select
                      value={currentLanguage}
                      onChange={(e) => onLanguageChange?.(e.target.value)}
                      className="bg-transparent text-sm border-none focus:outline-none cursor-pointer"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {showTrustBadges && <TrustBadges />}
            </div>
          </div>
        </div>
      </footer>
      {showBackToTop && <BackToTop />}
    </>
  );
}

export type { FooterProps, FooterSection, FooterLink, SocialLink, ContactInfo };
