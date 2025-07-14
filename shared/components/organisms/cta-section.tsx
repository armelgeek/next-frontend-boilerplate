"use client";

import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Input } from "@/shared/components/atoms/ui/input";
import { Textarea } from "@/shared/components/atoms/ui/textarea";
import { 
  ArrowRight, 
  Sparkles, 
  Users,
  Star,
  Mail,
  Phone,
  MessageCircle,
  Send
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface CTAAction {
  label: string;
  variant?: "default" | "outline" | "ghost";
  onClick?: () => void;
  href?: string;
}

interface CTASectionProps {
  variant?: "default" | "gradient" | "centered" | "split" | "newsletter" | "contact" | "minimal";
  title: string;
  subtitle?: string;
  description: string;
  actions?: CTAAction[];
  image?: string;
  badge?: string;
  className?: string;
  backgroundPattern?: boolean;
  showSocialProof?: boolean;
  socialProofText?: string;
  onEmailSubmit?: (email: string) => void;
  onContactSubmit?: (data: { name: string; email: string; message: string }) => void;
}

export function CTASection({
  variant = "default",
  title,
  subtitle,
  description,
  actions = [],
  image,
  badge,
  className,
  backgroundPattern = false,
  showSocialProof = false,
  socialProofText = "Rejoignez plus de 10,000 utilisateurs satisfaits",
  onEmailSubmit,
  onContactSubmit
}: CTASectionProps) {
  if (variant === "gradient") {
    return (
      <section className={cn(
        "relative py-24 overflow-hidden",
        "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700",
        backgroundPattern && "before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-10",
        className
      )}>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          {badge && (
            <Badge variant="outline" className="mb-6 border-white/20 text-white bg-white/10">
              <Sparkles className="w-4 h-4 mr-2" />
              {badge}
            </Badge>
          )}
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{title}</h2>
          {subtitle && (
            <p className="text-xl mb-4 text-white/90">{subtitle}</p>
          )}
          <p className="text-lg mb-10 max-w-2xl mx-auto text-white/80">{description}</p>
          
          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "secondary" : "outline"}
                  size="lg"
                  className={cn(
                    "flex items-center gap-2",
                    index === 0 ? "bg-white text-blue-600 hover:bg-white/90" : "border-white/20 text-white hover:bg-white/10"
                  )}
                  onClick={action.onClick}
                >
                  {action.label}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ))}
            </div>
          )}

          {showSocialProof && (
            <div className="flex items-center justify-center gap-2 text-white/70">
              <Users className="w-4 h-4" />
              <span className="text-sm">{socialProofText}</span>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "newsletter") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0">
            <CardContent className="p-12 text-center">
              {badge && (
                <Badge className="mb-4">
                  <Mail className="w-4 h-4 mr-2" />
                  {badge}
                </Badge>
              )}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              {subtitle && (
                <p className="text-xl mb-4 text-gray-600">{subtitle}</p>
              )}
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>
              
              <div className="max-w-md mx-auto mb-6">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        onEmailSubmit?.((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      const input = document.querySelector('input[type="email"]') as HTMLInputElement;
                      onEmailSubmit?.(input?.value || '');
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {showSocialProof && (
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{socialProofText}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (variant === "contact") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {badge && (
                <Badge className="mb-4">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {badge}
                </Badge>
              )}
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
              {subtitle && (
                <p className="text-xl mb-4 text-gray-600">{subtitle}</p>
              )}
              <p className="text-lg text-gray-600 mb-8">{description}</p>
              
              {showSocialProof && (
                <div className="flex items-center gap-2 text-gray-500 mb-6">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{socialProofText}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>contact@exemple.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>+33 1 23 45 67 89</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  onContactSubmit?.({
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    message: formData.get('message') as string
                  });
                }}>
                  <div>
                    <Input
                      name="name"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Votre message..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Envoyer le message
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {badge && (
                <Badge className="mb-4">
                  {badge}
                </Badge>
              )}
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
              {subtitle && (
                <p className="text-xl mb-4 text-gray-600">{subtitle}</p>
              )}
              <p className="text-lg text-gray-600 mb-8">{description}</p>
              
              {actions.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant}
                      size="lg"
                      className="flex items-center gap-2"
                      onClick={action.onClick}
                    >
                      {action.label}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              )}

              {showSocialProof && (
                <div className="flex items-center gap-2 text-gray-500 mt-6">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{socialProofText}</span>
                </div>
              )}
            </div>
            
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full rounded-xl shadow-2xl"
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <Sparkles className="w-24 h-24 mx-auto mb-4" />
                    <p>Votre image ici</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className={cn("py-16", className)}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          
          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "centered") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          {badge && (
            <Badge className="mb-6">
              {badge}
            </Badge>
          )}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
          {subtitle && (
            <p className="text-xl mb-4 text-gray-600">{subtitle}</p>
          )}
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">{description}</p>
          
          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={action.onClick}
                >
                  {action.label}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ))}
            </div>
          )}

          {image && (
            <div className="relative max-w-3xl mx-auto mb-8">
              <img
                src={image}
                alt={title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          )}

          {showSocialProof && (
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Users className="w-4 h-4" />
              <span className="text-sm">{socialProofText}</span>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className={cn("py-20 bg-gray-50", className)}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        {badge && (
          <Badge className="mb-6">
            {badge}
          </Badge>
        )}
        <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
        {subtitle && (
          <p className="text-xl mb-4 text-gray-600">{subtitle}</p>
        )}
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">{description}</p>
        
        {actions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="lg"
                className="flex items-center gap-2"
                onClick={action.onClick}
              >
                {action.label}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ))}
          </div>
        )}

        {showSocialProof && (
          <div className="flex items-center justify-center gap-2 text-gray-500 mt-8">
            <Users className="w-4 h-4" />
            <span className="text-sm">{socialProofText}</span>
          </div>
        )}
      </div>
    </section>
  );
}
