"use client";

import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Star,
  Trophy,
  Target,
  Lightbulb,
  Shield,
  Zap
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}

interface FeaturesSectionProps {
  variant?: "grid" | "alternating" | "centered" | "cards" | "list" | "icons-only" | "restaurant";
  title: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  className?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaAction?: () => void;
  columns?: 2 | 3 | 4;
}

export function FeaturesSection({
  variant = "grid",
  title,
  subtitle,
  description,
  features,
  className,
  showCta = false,
  ctaText = "En savoir plus",
  ctaAction,
  columns = 3
}: FeaturesSectionProps) {
  if (variant === "alternating") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "grid lg:grid-cols-2 gap-12 items-center",
                  index % 2 === 1 && "lg:grid-flow-col-dense"
                )}
              >
                <div className={cn(index % 2 === 1 && "lg:col-start-2")}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      feature.color || "bg-blue-100 text-blue-600"
                    )}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  {showCta && (
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={ctaAction}
                    >
                      {ctaText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
                <div className={cn(
                  "aspect-video bg-gradient-to-br rounded-xl flex items-center justify-center",
                  index % 2 === 0 ? "from-blue-100 to-purple-100" : "from-green-100 to-teal-100",
                  index % 2 === 1 && "lg:col-start-1"
                )}>
                  <div className="text-8xl opacity-20">
                    {feature.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "centered") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 mb-6">{subtitle}</p>
          )}
          {description && (
            <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">{description}</p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={cn(
                  "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center",
                  feature.color || "bg-blue-100 text-blue-600"
                )}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {showCta && (
            <Button size="lg" onClick={ctaAction}>
              {ctaText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </section>
    );
  }

  if (variant === "cards") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className={cn(
            "grid gap-6",
            columns === 2 && "md:grid-cols-2",
            columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
          )}>
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className={cn(
                    "w-12 h-12 mb-4 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform",
                    feature.color || "bg-blue-100 text-blue-600"
                  )}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {showCta && (
            <div className="text-center mt-12">
              <Button size="lg" onClick={ctaAction}>
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "list") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-6 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className={cn(
                  "p-3 rounded-lg flex-shrink-0",
                  feature.color || "bg-blue-100 text-blue-600"
                )}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {showCta && (
            <div className="text-center mt-12">
              <Button size="lg" onClick={ctaAction}>
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "icons-only") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className={cn(
                  "w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300",
                  feature.color || "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                )}>
                  {feature.icon}
                </div>
                <h3 className="font-medium text-sm group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>

          {showCta && (
            <div className="text-center mt-12">
              <Button size="lg" onClick={ctaAction}>
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Restaurant variant
  if (variant === "restaurant") {
    return (
      <section className={cn("py-20 bg-gradient-to-br from-amber-50 to-orange-50", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-amber-900">{title}</h2>
            {subtitle && <p className="text-xl text-amber-800 mb-6">{subtitle}</p>}
            {description && <p className="text-lg text-amber-700 max-w-3xl mx-auto">{description}</p>}
          </div>

          <div className={cn(
            "grid gap-8",
            columns === 2 && "md:grid-cols-2",
            columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
          )}>
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-amber-900">{feature.title}</h3>
                  <p className="text-amber-700 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {showCta && (
            <div className="text-center mt-16">
              <Button 
                size="lg" 
                onClick={ctaAction}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Default grid variant
  return (
    <section className={cn("py-20", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className={cn(
          "grid gap-8",
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
        )}>
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={cn(
                "w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center",
                feature.color || "bg-blue-100 text-blue-600"
              )}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {showCta && (
          <div className="text-center mt-16">
            <Button size="lg" onClick={ctaAction}>
              {ctaText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}