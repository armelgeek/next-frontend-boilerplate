"use client";

import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Users, 
  Trophy,
  Building,
  Calendar,
  Target,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Stat {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface AboutSectionProps {
  variant?: "default" | "split" | "centered" | "timeline" | "stats" | "team";
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  stats?: Stat[];
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  timeline?: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  team?: Array<{
    name: string;
    role: string;
    avatar?: string;
    bio: string;
  }>;
  className?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaAction?: () => void;
}

export function AboutSection({
  variant = "default",
  title,
  subtitle,
  description,
  image,
  stats = [],
  features = [],
  timeline = [],
  team = [],
  className,
  showCta = false,
  ctaText = "En savoir plus",
  ctaAction
}: AboutSectionProps) {
  if (variant === "timeline") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full hidden md:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={cn(
                  "relative grid md:grid-cols-2 gap-8 items-center",
                  index % 2 === 0 ? "md:text-right" : "md:text-left md:[&>*:first-child]:order-2"
                )}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden md:block z-10"></div>
                  
                  <div className={cn(
                    "p-6",
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  )}>
                    <Badge className="mb-2">{item.year}</Badge>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  
                  <div className={cn(
                    "flex justify-center",
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  )}>
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "stats") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
              {subtitle && (
                <p className="text-xl mb-4 text-gray-600">{subtitle}</p>
              )}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{description}</p>
              
              {features.length > 0 && (
                <div className="space-y-6 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showCta && (
                <Button size="lg" onClick={ctaAction}>
                  {ctaText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>

            <div>
              {stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <Card key={index} className="text-center">
                      <CardContent className="p-6">
                        {stat.icon && (
                          <div className="w-12 h-12 mx-auto mb-3 text-blue-600">
                            {stat.icon}
                          </div>
                        )}
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {image && (
                <img
                  src={image}
                  alt={title}
                  className="w-full rounded-xl shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "team") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{subtitle}</p>
            )}
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">{description}</p>
          </div>

          {team.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {team.map((member, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <Users className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  {stat.icon && (
                    <div className="w-12 h-12 mx-auto mb-3 text-blue-600">
                      {stat.icon}
                    </div>
                  )}
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full rounded-xl shadow-2xl"
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <Building className="w-24 h-24 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
              {subtitle && (
                <p className="text-xl mb-4 text-gray-600">{subtitle}</p>
              )}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{description}</p>
              
              {features.length > 0 && (
                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-blue-600 mt-1">{feature.icon}</div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showCta && (
                <Button size="lg" onClick={ctaAction}>
                  {ctaText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    {stat.icon && (
                      <div className="w-12 h-12 mx-auto mb-3 text-blue-600">
                        {stat.icon}
                      </div>
                    )}
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
          {subtitle && (
            <p className="text-xl mb-6 text-gray-600">{subtitle}</p>
          )}
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">{description}</p>
          
          {image && (
            <div className="mb-12">
              <img
                src={image}
                alt={title}
                className="w-full rounded-xl shadow-2xl max-w-3xl mx-auto"
              />
            </div>
          )}

          {features.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  {stat.icon && (
                    <div className="w-12 h-12 mx-auto mb-3 text-blue-600">
                      {stat.icon}
                    </div>
                  )}
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

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

  // Default variant
  return (
    <section className={cn("py-20", className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
          </div>
          
          <div>
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full rounded-xl shadow-lg"
              />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <Building className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {features.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {showCta && (
          <div className="text-center">
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
