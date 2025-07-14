"use client";

import React from "react";
import { Button } from "@/shared/components/atoms/ui/button";
import { Input } from "@/shared/components/atoms/ui/input";
import { Textarea } from "@/shared/components/atoms/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Building,
  Calendar,
  CheckCircle,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  website?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface ContactSectionProps {
  variant?: "default" | "split" | "cards" | "minimal" | "centered" | "with-map";
  title?: string;
  description?: string;
  contactInfo?: ContactInfo;
  showForm?: boolean;
  showInfo?: boolean;
  showMap?: boolean;
  showSocial?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onSubmit?: (data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    company?: string;
    phone?: string;
  }) => void;
}

const defaultContactInfo: ContactInfo = {
  address: "123 Rue de la Innovation, 75001 Paris, France",
  phone: "+33 1 23 45 67 89",
  email: "contact@exemple.com",
  hours: "Lun-Ven: 9h-18h",
  website: "https://exemple.com",
  social: {
    facebook: "https://facebook.com/exemple",
    twitter: "https://twitter.com/exemple",
    instagram: "https://instagram.com/exemple",
    linkedin: "https://linkedin.com/company/exemple"
  }
};

function ContactForm({ 
  onSubmit, 
  theme = "light" 
}: { 
  onSubmit?: ContactSectionProps['onSubmit']; 
  theme?: "light" | "dark";
}) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    onSubmit?.(formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
        phone: ""
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Message envoyé !</h3>
        <p className={cn(
          "text-sm",
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        )}>
          Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Nom complet *
          </label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Votre nom"
            className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Email *
          </label>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="votre@email.com"
            className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Entreprise
          </label>
          <Input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Nom de votre entreprise"
            className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Téléphone
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+33 1 23 45 67 89"
            className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Sujet
        </label>
        <Input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          placeholder="Objet de votre message"
          className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Message *
        </label>
        <Textarea
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          placeholder="Décrivez votre projet ou votre demande..."
          className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Envoyer le message
          </>
        )}
      </Button>
    </form>
  );
}

function ContactInfoCard({ 
  contactInfo, 
  showSocial = true, 
  theme = "light" 
}: { 
  contactInfo: ContactInfo; 
  showSocial?: boolean; 
  theme?: "light" | "dark";
}) {
  const contactItems = [
    {
      icon: MapPin,
      label: "Adresse",
      value: contactInfo.address,
      color: "text-blue-500"
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: contactInfo.phone,
      color: "text-green-500"
    },
    {
      icon: Mail,
      label: "Email",
      value: contactInfo.email,
      color: "text-red-500"
    },
    {
      icon: Clock,
      label: "Horaires",
      value: contactInfo.hours,
      color: "text-orange-500"
    },
    {
      icon: Globe,
      label: "Site web",
      value: contactInfo.website,
      color: "text-purple-500"
    }
  ];

  const socialLinks = [
    { icon: Facebook, url: contactInfo.social?.facebook, label: "Facebook" },
    { icon: Twitter, url: contactInfo.social?.twitter, label: "Twitter" },
    { icon: Instagram, url: contactInfo.social?.instagram, label: "Instagram" },
    { icon: Linkedin, url: contactInfo.social?.linkedin, label: "LinkedIn" }
  ];

  return (
    <div className="space-y-6">
      {contactItems.map((item, index) => {
        if (!item.value) return null;
        
        return (
          <div key={index} className="flex items-start space-x-4">
            <div className={cn(
              "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            )}>
              <item.icon className={cn("w-5 h-5", item.color)} />
            </div>
            <div>
              <div className="font-medium text-sm text-gray-500 mb-1">
                {item.label}
              </div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-300" : "text-gray-900"
              )}>
                {item.value}
              </div>
            </div>
          </div>
        );
      })}

      {showSocial && contactInfo.social && (
        <div className="pt-4 border-t">
          <div className="font-medium text-sm text-gray-500 mb-3">
            Nous suivre
          </div>
          <div className="flex space-x-3">
            {socialLinks.map((social, index) => {
              if (!social.url) return null;
              
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                    theme === "dark" 
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function ContactSection({
  variant = "default",
  title = "Contactez-nous",
  description = "Nous sommes là pour répondre à vos questions et discuter de vos projets. N'hésitez pas à nous contacter.",
  contactInfo = defaultContactInfo,
  showForm = true,
  showInfo = true,
  showMap = false,
  showSocial = true,
  className,
  theme = "light",
  onSubmit
}: ContactSectionProps) {

  if (variant === "minimal") {
    return (
      <section className={cn(
        "py-16",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
        className
      )}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className={cn(
            "text-lg leading-relaxed mb-8",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {contactInfo.email && (
              <Button asChild>
                <a href={`mailto:${contactInfo.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  {contactInfo.email}
                </a>
              </Button>
            )}
            {contactInfo.phone && (
              <Button variant="outline" asChild>
                <a href={`tel:${contactInfo.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  {contactInfo.phone}
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "centered") {
    return (
      <section className={cn(
        "py-16",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
        className
      )}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className={cn(
              "text-lg leading-relaxed",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            {showForm && (
              <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Envoyez-nous un message
                  </CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm onSubmit={onSubmit} theme={theme} />
                </CardContent>
              </Card>
            )}

            {/* Contact Info */}
            {showInfo && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Informations de contact</h3>
                <ContactInfoCard 
                  contactInfo={contactInfo} 
                  showSocial={showSocial} 
                  theme={theme} 
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "cards") {
    return (
      <section className={cn(
        "py-16",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
        className
      )}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className={cn(
              "text-lg max-w-3xl mx-auto leading-relaxed",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Contact Cards */}
            {contactInfo.email && (
              <Card className={cn(
                "text-center p-6 transition-all duration-300 hover:shadow-lg",
                theme === "dark" ? "bg-gray-800 border-gray-700" : ""
              )}>
                <div className={cn(
                  "inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4",
                  theme === "dark" ? "bg-gray-700" : "bg-blue-100"
                )}>
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className={cn(
                  "text-sm mb-4",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Envoyez-nous un email
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:${contactInfo.email}`}>
                    {contactInfo.email}
                  </a>
                </Button>
              </Card>
            )}

            {contactInfo.phone && (
              <Card className={cn(
                "text-center p-6 transition-all duration-300 hover:shadow-lg",
                theme === "dark" ? "bg-gray-800 border-gray-700" : ""
              )}>
                <div className={cn(
                  "inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4",
                  theme === "dark" ? "bg-gray-700" : "bg-green-100"
                )}>
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Téléphone</h3>
                <p className={cn(
                  "text-sm mb-4",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Appelez-nous directement
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href={`tel:${contactInfo.phone}`}>
                    {contactInfo.phone}
                  </a>
                </Button>
              </Card>
            )}

            {contactInfo.address && (
              <Card className={cn(
                "text-center p-6 transition-all duration-300 hover:shadow-lg",
                theme === "dark" ? "bg-gray-800 border-gray-700" : ""
              )}>
                <div className={cn(
                  "inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4",
                  theme === "dark" ? "bg-gray-700" : "bg-purple-100"
                )}>
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Adresse</h3>
                <p className={cn(
                  "text-sm mb-4",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Venez nous rendre visite
                </p>
                <p className="text-sm">{contactInfo.address}</p>
              </Card>
            )}
          </div>

          {/* Contact Form */}
          {showForm && (
            <div className="max-w-2xl mx-auto">
              <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="text-center">
                  <CardTitle>Envoyez-nous un message</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm onSubmit={onSubmit} theme={theme} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Default split variant
  return (
    <section className={cn(
      "py-16",
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className={cn(
            "text-lg max-w-3xl mx-auto leading-relaxed",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          {showForm && (
            <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Envoyez-nous un message
                </CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm onSubmit={onSubmit} theme={theme} />
              </CardContent>
            </Card>
          )}

          {/* Contact Info */}
          {showInfo && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Informations de contact</h3>
                <ContactInfoCard 
                  contactInfo={contactInfo} 
                  showSocial={showSocial} 
                  theme={theme} 
                />
              </div>

              {/* Map placeholder */}
              {showMap && (
                <div className={cn(
                  "h-64 rounded-lg flex items-center justify-center",
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Carte interactive</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export type { ContactSectionProps, ContactInfo };
