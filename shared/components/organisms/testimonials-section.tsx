"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Users,
  PlayCircle,
  ExternalLink
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating: number;
  content: string;
  date?: string;
  featured?: boolean;
  video?: string;
  verified?: boolean;
}

interface TestimonialsSectionProps {
  variant?: "grid" | "carousel" | "masonry" | "video" | "minimal" | "featured" | "restaurant";
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  showRating?: boolean;
  showDate?: boolean;
  showCompany?: boolean;
  autoplay?: boolean;
  className?: string;
  columns?: 1 | 2 | 3;
}

function StarRating({ rating, maxRating = 5 }: { rating: number; maxRating?: number }) {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ 
  testimonial, 
  variant = "default",
  showRating = true,
  showDate = false,
  showCompany = true 
}: {
  testimonial: Testimonial;
  variant?: string;
  showRating?: boolean;
  showDate?: boolean;
  showCompany?: boolean;
}) {
  if (variant === "minimal") {
    return (
      <div className="text-center p-6">
        <Quote className="w-8 h-8 text-blue-600 mx-auto mb-4" />
        <p className="text-lg italic mb-4">"{testimonial.content}"</p>
        <div className="flex items-center justify-center gap-3">
          <Avatar className="w-10 h-10">
            {testimonial.avatar ? (
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            ) : (
              <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div className="text-left">
            <div className="font-semibold">{testimonial.name}</div>
            {testimonial.role && showCompany && (
              <div className="text-sm text-gray-500">
                {testimonial.role}
                {testimonial.company && ` chez ${testimonial.company}`}
              </div>
            )}
          </div>
        </div>
        {showRating && (
          <div className="flex justify-center mt-3">
            <StarRating rating={testimonial.rating} />
          </div>
        )}
      </div>
    );
  }

  if (variant === "video") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
            {testimonial.avatar && (
              <img
                src={testimonial.avatar}
                alt={`${testimonial.name} testimonial`}
                className="w-full h-full object-cover"
              />
            )}
            <Button
              variant="secondary"
              size="lg"
              className="absolute inset-0 w-full h-full bg-black/50 hover:bg-black/40 text-white"
            >
              <PlayCircle className="w-16 h-16" />
            </Button>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  {testimonial.role && (
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  )}
                </div>
              </div>
              {testimonial.verified && (
                <Badge variant="secondary">Vérifié</Badge>
              )}
            </div>
            <p className="text-gray-600 mb-3">"{testimonial.content}"</p>
            {showRating && <StarRating rating={testimonial.rating} />}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "h-full group hover:shadow-lg transition-all duration-300",
      testimonial.featured && "border-blue-500 ring-2 ring-blue-500/20"
    )}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          {showRating && <StarRating rating={testimonial.rating} />}
          {testimonial.verified && (
            <Badge variant="secondary">Vérifié</Badge>
          )}
        </div>
        
        <Quote className="w-6 h-6 text-blue-600 mb-3" />
        <p className="text-gray-700 leading-relaxed mb-6 flex-1">
          "{testimonial.content}"
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          <Avatar>
            {testimonial.avatar ? (
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            ) : (
              <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">{testimonial.name}</div>
            {testimonial.role && showCompany && (
              <div className="text-sm text-gray-500">
                {testimonial.role}
                {testimonial.company && ` chez ${testimonial.company}`}
              </div>
            )}
            {showDate && testimonial.date && (
              <div className="text-xs text-gray-400">{testimonial.date}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection({
  variant = "grid",
  title,
  subtitle,
  testimonials,
  showRating = true,
  showDate = false,
  showCompany = true,
  autoplay = false,
  className,
  columns = 3
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotation for carousel
  React.useEffect(() => {
    if (variant === "carousel" && autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [variant, autoplay, testimonials.length]);

  if (variant === "carousel") {
    const currentTestimonial = testimonials[currentIndex];
    
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="relative">
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-12 text-center">
                <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                <p className="text-xl italic mb-8 leading-relaxed">
                  "{currentTestimonial.content}"
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Avatar className="w-16 h-16">
                    {currentTestimonial.avatar ? (
                      <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                    ) : (
                      <AvatarFallback className="text-lg">{currentTestimonial.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold text-lg">{currentTestimonial.name}</div>
                    {currentTestimonial.role && (
                      <div className="text-gray-500">
                        {currentTestimonial.role}
                        {currentTestimonial.company && ` chez ${currentTestimonial.company}`}
                      </div>
                    )}
                  </div>
                </div>

                {showRating && (
                  <div className="flex justify-center mb-6">
                    <StarRating rating={currentTestimonial.rating} />
                  </div>
                )}

                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentIndex((prev) => 
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-2 h-2 rounded-full transition-colors",
                          index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                        )}
                        onClick={() => setCurrentIndex(index)}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentIndex((prev) => 
                      (prev + 1) % testimonials.length
                    )}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "featured") {
    const featuredTestimonial = testimonials.find(t => t.featured) || testimonials[0];
    const otherTestimonials = testimonials.filter(t => t.id !== featuredTestimonial.id);

    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-full border-blue-500 bg-blue-50/50">
                <CardContent className="p-8">
                  <Badge className="mb-4">Témoignage vedette</Badge>
                  <Quote className="w-8 h-8 text-blue-600 mb-4" />
                  <p className="text-lg italic mb-6 leading-relaxed">
                    "{featuredTestimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      {featuredTestimonial.avatar ? (
                        <AvatarImage src={featuredTestimonial.avatar} alt={featuredTestimonial.name} />
                      ) : (
                        <AvatarFallback>{featuredTestimonial.name[0]}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-semibold">{featuredTestimonial.name}</div>
                      {featuredTestimonial.role && (
                        <div className="text-gray-500">
                          {featuredTestimonial.role}
                          {featuredTestimonial.company && ` chez ${featuredTestimonial.company}`}
                        </div>
                      )}
                    </div>
                  </div>

                  {showRating && (
                    <div className="mt-4">
                      <StarRating rating={featuredTestimonial.rating} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {otherTestimonials.slice(0, 2).map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  showRating={showRating}
                  showDate={showDate}
                  showCompany={showCompany}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "masonry") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="break-inside-avoid">
                <TestimonialCard
                  testimonial={testimonial}
                  showRating={showRating}
                  showDate={showDate}
                  showCompany={showCompany}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className={cn("py-20 bg-gray-50", className)}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                variant="minimal"
                showRating={showRating}
                showDate={showDate}
                showCompany={showCompany}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full group hover:shadow-lg transition-all duration-300 border-2 border-amber-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    {showRating && (
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    )}
                    {testimonial.verified && (
                      <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">Vérifié</Badge>
                    )}
                  </div>
                  
                  <Quote className="w-6 h-6 text-amber-600 mb-3" />
                  <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    <Avatar className="border-2 border-amber-200">
                      {testimonial.avatar ? (
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900">
                          {testimonial.name[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-amber-900">{testimonial.name}</div>
                      {testimonial.role && showCompany && (
                        <div className="text-sm text-amber-700">
                          {testimonial.role}
                          {testimonial.company && ` chez ${testimonial.company}`}
                        </div>
                      )}
                      {showDate && testimonial.date && (
                        <div className="text-xs text-amber-600">{testimonial.date}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
          "grid gap-6",
          columns === 1 && "grid-cols-1 max-w-3xl mx-auto",
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-2 lg:grid-cols-3"
        )}>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              variant={variant}
              showRating={showRating}
              showDate={showDate}
              showCompany={showCompany}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
