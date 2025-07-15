"use client";

import React from "react";
import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { 
  Check, 
  X, 
  Star, 
  Crown, 
  Zap,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface PricingFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  currency?: string;
  originalPrice?: number;
  features: PricingFeature[];
  popular?: boolean;
  recommended?: boolean;
  badge?: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "ghost";
  onSelect?: () => void;
}

interface PricingSectionProps {
  variant?: "default" | "cards" | "table" | "toggle" | "minimal" | "restaurant";
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  showAnnual?: boolean;
  annualDiscount?: number;
  className?: string;
  currencySymbol?: string;
}

function PricingCard({ 
  plan, 
  variant = "default",
  currencySymbol = "€",
  isAnnual = false,
  annualDiscount = 0
}: { 
  plan: PricingPlan; 
  variant?: string;
  currencySymbol?: string;
  isAnnual?: boolean;
  annualDiscount?: number;
}) {
  const finalPrice = isAnnual && annualDiscount > 0 
    ? plan.price * (1 - annualDiscount / 100) 
    : plan.price;

  const savings = isAnnual && annualDiscount > 0 
    ? plan.price - finalPrice 
    : 0;

  if (variant === "minimal") {
    return (
      <div className={cn(
        "p-6 rounded-lg border",
        plan.popular && "border-blue-500 bg-blue-50/50"
      )}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          {plan.popular && <Badge>Populaire</Badge>}
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold">{currencySymbol}{finalPrice}</span>
          <span className="text-gray-600">/{plan.period}</span>
          {savings > 0 && (
            <Badge variant="secondary" className="ml-2">
              -{currencySymbol}{savings.toFixed(0)}
            </Badge>
          )}
        </div>
        <Button 
          className="w-full mb-4" 
          variant={plan.buttonVariant}
          onClick={plan.onSelect}
        >
          {plan.buttonText || "Choisir"}
        </Button>
        <div className="space-y-2">
          {plan.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className={cn(
      "relative transition-all duration-300 hover:shadow-lg",
      plan.popular && "border-blue-500 shadow-lg ring-2 ring-blue-500/20",
      plan.recommended && "border-green-500 shadow-lg ring-2 ring-green-500/20"
    )}>
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className={cn(
            plan.popular && "bg-blue-600",
            plan.recommended && "bg-green-600"
          )}>
            {plan.badge}
          </Badge>
        </div>
      )}
      
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <p className="text-gray-600 mb-4">{plan.description}</p>
          
          <div className="flex items-baseline justify-center gap-1">
            {plan.originalPrice && plan.originalPrice > finalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {currencySymbol}{plan.originalPrice}
              </span>
            )}
            <span className="text-4xl font-bold">
              {currencySymbol}{finalPrice}
            </span>
            <span className="text-gray-600">/{plan.period}</span>
          </div>
          
          {savings > 0 && (
            <Badge variant="secondary" className="mt-2">
              Économisez {currencySymbol}{savings.toFixed(0)}/an
            </Badge>
          )}
        </div>

        <Button 
          className="w-full mb-6" 
          variant={plan.buttonVariant || (plan.popular ? "default" : "outline")}
          size="lg"
          onClick={plan.onSelect}
        >
          {plan.buttonText || "Commencer"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className={cn(
              "flex items-start gap-3",
              feature.highlight && "bg-blue-50 -mx-2 px-2 py-1 rounded"
            )}>
              {feature.included ? (
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              )}
              <span className={cn(
                "text-sm",
                feature.included ? "text-gray-900" : "text-gray-400",
                feature.highlight && "font-medium"
              )}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PricingSection({
  variant = "cards",
  title,
  subtitle,
  plans,
  showAnnual = true,
  annualDiscount = 20,
  className,
  currencySymbol = "€"
}: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = React.useState(false);

  if (variant === "table") {
    const allFeatures = Array.from(
      new Set(plans.flatMap(plan => plan.features.map(f => f.name)))
    );

    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-6 text-left font-semibold">Fonctionnalités</th>
                  {plans.map(plan => (
                    <th key={plan.id} className="p-6 text-center">
                      <div className="mb-2">
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        <div className="text-2xl font-bold mt-2">
                          {currencySymbol}{plan.price}
                          <span className="text-sm font-normal text-gray-600">
                            /{plan.period}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant={plan.popular ? "default" : "outline"}
                        onClick={plan.onSelect}
                      >
                        {plan.buttonText || "Choisir"}
                      </Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((featureName, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-6 font-medium">{featureName}</td>
                    {plans.map(plan => {
                      const feature = plan.features.find(f => f.name === featureName);
                      return (
                        <td key={plan.id} className="p-6 text-center">
                          {feature?.included ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "toggle" && showAnnual) {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{subtitle}</p>
            )}
            
            <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
              <button
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  !isAnnual && "bg-white shadow-sm"
                )}
                onClick={() => setIsAnnual(false)}
              >
                Mensuel
              </button>
              <button
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                  isAnnual && "bg-white shadow-sm"
                )}
                onClick={() => setIsAnnual(true)}
              >
                Annuel
                <Badge variant="secondary" className="text-xs">
                  -{annualDiscount}%
                </Badge>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map(plan => (
              <PricingCard
                key={plan.id}
                plan={plan}
                currencySymbol={currencySymbol}
                isAnnual={isAnnual}
                annualDiscount={annualDiscount}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <PricingCard
                key={plan.id}
                plan={plan}
                variant="minimal"
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "restaurant") {
    return (
      <section className={cn("py-20 bg-gradient-to-b from-amber-50 to-orange-50", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-amber-900">{title}</h2>
            {subtitle && (
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map(plan => (
              <Card key={plan.id} className={cn(
                "relative transition-all duration-300 hover:shadow-lg border-2 border-amber-200 bg-white/80 backdrop-blur-sm",
                plan.popular && "border-amber-500 shadow-lg ring-2 ring-amber-500/20 bg-gradient-to-br from-amber-50 to-orange-50",
                plan.recommended && "border-orange-500 shadow-lg ring-2 ring-orange-500/20"
              )}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2 text-amber-900">{plan.name}</h3>
                    <p className="text-amber-700 mb-4">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center gap-1">
                      {plan.originalPrice && plan.originalPrice > plan.price && (
                        <span className="text-lg text-amber-500 line-through">
                          {currencySymbol}{plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-amber-900">
                        {currencySymbol}{plan.price}
                      </span>
                      <span className="text-amber-700">/{plan.period}</span>
                    </div>
                  </div>

                  <Button 
                    className={cn(
                      "w-full mb-6 transition-all duration-300",
                      plan.popular 
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg"
                        : "border-2 border-amber-300 text-amber-900 hover:bg-amber-50"
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    onClick={plan.onSelect}
                  >
                    {plan.buttonText || "Réserver"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className={cn(
                        "flex items-start gap-3",
                        feature.highlight && "bg-amber-100/50 -mx-2 px-2 py-1 rounded"
                      )}>
                        {feature.included ? (
                          <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={cn(
                          "text-sm",
                          feature.included ? "text-amber-900" : "text-gray-400",
                          feature.highlight && "font-medium"
                        )}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default cards variant
  return (
    <section className={cn("py-20", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map(plan => (
            <PricingCard
              key={plan.id}
              plan={plan}
              currencySymbol={currencySymbol}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
