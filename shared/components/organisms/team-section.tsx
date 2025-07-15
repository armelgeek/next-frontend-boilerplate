"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/atoms/ui/button";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { 
  Users,
  Star,
  Award,
  Target,
  Lightbulb,
  Heart,
  Globe,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
  Quote,
  Building,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  avatar?: string;
  skills?: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  experience?: string;
  location?: string;
  joinDate?: string;
  achievements?: string[];
}

interface TeamSectionProps {
  variant?: "grid" | "cards" | "minimal" | "detailed" | "carousel" | "masonry" | "restaurant";
  title?: string;
  description?: string;
  members?: TeamMember[];
  showSocial?: boolean;
  showSkills?: boolean;
  showStats?: boolean;
  maxMembers?: number;
  className?: string;
  theme?: "light" | "dark";
  onJoinTeam?: () => void;
  showCTA?: boolean;
}

const defaultMembers: TeamMember[] = [
  {
    id: "1",
    name: "Marie Dubois",
    role: "CEO & Fondatrice",
    description: "Passionnée par l'innovation technologique, Marie dirige l'équipe avec vision et détermination.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c04c?w=300&h=300&fit=crop&crop=face",
    skills: ["Leadership", "Stratégie", "Innovation"],
    social: {
      linkedin: "https://linkedin.com/in/marie-dubois",
      twitter: "https://twitter.com/marie_dubois",
      email: "marie@company.com"
    },
    experience: "10+ ans",
    location: "Paris, France",
    joinDate: "2020",
    achievements: ["MBA HEC", "Forbes 30 under 30"]
  },
  {
    id: "2",
    name: "Thomas Martin",
    role: "CTO",
    description: "Expert en architecture logicielle, Thomas supervise le développement technique de nos produits.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    skills: ["Architecture", "DevOps", "AI/ML"],
    social: {
      linkedin: "https://linkedin.com/in/thomas-martin",
      twitter: "https://twitter.com/thomas_dev"
    },
    experience: "12+ ans",
    location: "Lyon, France",
    joinDate: "2020",
    achievements: ["Google Developer Expert", "Speaker TEDx"]
  },
  {
    id: "3",
    name: "Sophie Chen",
    role: "Head of Design",
    description: "Designer UX/UI primée, Sophie crée des expériences utilisateur exceptionnelles.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    skills: ["UX Design", "Prototyping", "Design System"],
    social: {
      linkedin: "https://linkedin.com/in/sophie-chen",
      email: "sophie@company.com"
    },
    experience: "8+ ans",
    location: "Bordeaux, France",
    joinDate: "2021",
    achievements: ["Awwwards Winner", "Design Week Speaker"]
  },
  {
    id: "4",
    name: "Alex Johnson",
    role: "Head of Marketing",
    description: "Stratège marketing digital, Alex développe notre présence et notre croissance.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    skills: ["Growth Hacking", "Analytics", "Content"],
    social: {
      linkedin: "https://linkedin.com/in/alex-johnson",
      twitter: "https://twitter.com/alex_marketing"
    },
    experience: "6+ ans",
    location: "Marseille, France",
    joinDate: "2021",
    achievements: ["Google Analytics Certified", "Marketing Week Award"]
  },
  {
    id: "5",
    name: "Elena Rodriguez",
    role: "Lead Developer",
    description: "Développeuse full-stack experte, Elena guide notre équipe technique au quotidien.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    skills: ["React", "Node.js", "TypeScript"],
    social: {
      linkedin: "https://linkedin.com/in/elena-rodriguez",
      email: "elena@company.com"
    },
    experience: "7+ ans",
    location: "Madrid, Espagne",
    joinDate: "2022",
    achievements: ["Open Source Contributor", "React Conf Speaker"]
  },
  {
    id: "6",
    name: "David Kim",
    role: "Data Scientist",
    description: "Expert en intelligence artificielle, David transforme nos données en insights précieux.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    skills: ["Machine Learning", "Python", "Statistics"],
    social: {
      linkedin: "https://linkedin.com/in/david-kim",
      twitter: "https://twitter.com/david_data"
    },
    experience: "5+ ans",
    location: "Berlin, Allemagne",
    joinDate: "2022",
    achievements: ["PhD Stanford", "Kaggle Master"]
  }
];

function TeamMemberCard({ 
  member, 
  variant = "cards", 
  showSocial = true, 
  showSkills = true,
  theme = "light"
}: { 
  member: TeamMember; 
  variant?: TeamSectionProps['variant'];
  showSocial?: boolean;
  showSkills?: boolean;
  theme?: "light" | "dark";
}) {
  if (variant === "minimal") {
    return (
      <div className="text-center">
        <Avatar className="w-16 h-16 mx-auto mb-3">
          {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg">{member.name}</h3>
        <p className={cn(
          "text-sm",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {member.role}
        </p>
        {showSocial && member.social && (
          <div className="flex items-center justify-center space-x-2 mt-2">
            {member.social.linkedin && (
              <a 
                href={member.social.linkedin}
                className={cn(
                  "p-1 rounded-full transition-colors",
                  theme === "dark" 
                    ? "hover:bg-gray-800 text-gray-400 hover:text-blue-400"
                    : "hover:bg-gray-100 text-gray-500 hover:text-blue-600"
                )}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {member.social.twitter && (
              <a 
                href={member.social.twitter}
                className={cn(
                  "p-1 rounded-full transition-colors",
                  theme === "dark" 
                    ? "hover:bg-gray-800 text-gray-400 hover:text-blue-400"
                    : "hover:bg-gray-100 text-gray-500 hover:text-blue-600"
                )}
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <Card className={cn(
        "h-full transition-all duration-300 hover:shadow-lg",
        theme === "dark" && "bg-gray-800 border-gray-700"
      )}>
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
            <AvatarFallback className="text-lg">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{member.name}</CardTitle>
          <CardDescription className="text-blue-600 font-medium">
            {member.role}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {member.description && (
            <p className={cn(
              "text-sm leading-relaxed",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {member.description}
            </p>
          )}

          {member.experience && (
            <div className="flex items-center space-x-2 text-sm">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span>{member.experience} d'expérience</span>
            </div>
          )}

          {member.location && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-green-500" />
              <span>{member.location}</span>
            </div>
          )}

          {member.joinDate && (
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>Chez nous depuis {member.joinDate}</span>
            </div>
          )}

          {showSkills && member.skills && member.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Spécialités</h4>
              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {member.achievements && member.achievements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Achievements</h4>
              <div className="space-y-1">
                {member.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <Award className="w-3 h-3 text-yellow-500" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showSocial && member.social && (
            <div className="flex items-center justify-center space-x-3 pt-2 border-t">
              {member.social.linkedin && (
                <a 
                  href={member.social.linkedin}
                  className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                  aria-label={`LinkedIn de ${member.name}`}
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {member.social.twitter && (
                <a 
                  href={member.social.twitter}
                  className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                  aria-label={`Twitter de ${member.name}`}
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              {member.social.email && (
                <a 
                  href={`mailto:${member.social.email}`}
                  className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                  aria-label={`Email de ${member.name}`}
                >
                  <MailIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default cards variant
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
      theme === "dark" && "bg-gray-800 border-gray-700"
    )}>
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
          <AvatarFallback className="text-lg">
            {member.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg">{member.name}</CardTitle>
        <CardDescription className="text-blue-600 font-medium">
          {member.role}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-3">
        {member.description && (
          <p className={cn(
            "text-sm leading-relaxed",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {member.description}
          </p>
        )}

        {showSkills && member.skills && member.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {member.skills.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs"
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {showSocial && member.social && (
          <div className="flex items-center justify-center space-x-2">
            {member.social.linkedin && (
              <a 
                href={member.social.linkedin}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                    : "hover:bg-gray-100 text-gray-500 hover:text-blue-600"
                )}
                aria-label={`LinkedIn de ${member.name}`}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {member.social.twitter && (
              <a 
                href={member.social.twitter}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                    : "hover:bg-gray-100 text-gray-500 hover:text-blue-600"
                )}
                aria-label={`Twitter de ${member.name}`}
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
            {member.social.email && (
              <a 
                href={`mailto:${member.social.email}`}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                )}
                aria-label={`Email de ${member.name}`}
              >
                <MailIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TeamSection({
  variant = "cards",
  title = "Notre équipe",
  description = "Rencontrez les talents exceptionnels qui donnent vie à notre vision et créent des solutions innovantes chaque jour.",
  members = defaultMembers,
  showSocial = true,
  showSkills = true,
  showStats = true,
  maxMembers,
  className,
  theme = "light",
  onJoinTeam,
  showCTA
}: TeamSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3;
  const maxSlides = Math.ceil((maxMembers || members.length) / slidesToShow);

  const displayedMembers = maxMembers ? members.slice(0, maxMembers) : members;

  const getGridClasses = () => {
    switch (variant) {
      case "minimal":
        return "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6";
      case "detailed":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
      case "masonry":
        return "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
    }
  };

  const stats = [
    { icon: Users, value: `${members.length}+`, label: "Membres d'équipe" },
    { icon: Globe, value: "12+", label: "Nationalités" },
    { icon: Star, value: "50+", label: "Années d'expérience" },
    { icon: Award, value: "25+", label: "Certifications" }
  ];

  // Restaurant variant
  if (variant === "restaurant") {
    return (
      <section className={cn("py-20 bg-gradient-to-br from-amber-50 to-orange-50", className)}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-amber-900">{title}</h2>
            )}
            {description && (
              <p className="text-lg text-amber-700 max-w-3xl mx-auto">{description}</p>
            )}
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedMembers.map((member) => (
              <Card key={member.id} className="border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <Avatar className="w-24 h-24 mx-auto ring-4 ring-amber-200">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-amber-900">{member.name}</h3>
                  <p className="text-amber-700 font-medium mb-4">{member.role}</p>
                  
                  {member.description && (
                    <p className="text-amber-600 text-sm mb-6 leading-relaxed">{member.description}</p>
                  )}

                  {showSocial && member.social && (
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                          <LinkedinIcon className="w-4 h-4" />
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                          <TwitterIcon className="w-4 h-4" />
                        </Button>
                      )}
                      {member.social.email && (
                        <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                          <MailIcon className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          {showCTA && onJoinTeam && (
            <div className="text-center mt-16">
              <Button 
                size="lg" 
                onClick={onJoinTeam}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Rejoindre l'équipe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "carousel") {
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
          </div>        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{members.length}+</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Membres d'équipe
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">12+</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Années d'expérience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Projets réalisés
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Satisfaction client
              </div>
            </div>
          </div>
        )}

          {/* Carousel variant */}
          {variant === "carousel" && (
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayedMembers
                          .slice(slideIndex * slidesToShow, (slideIndex + 1) * slidesToShow)
                          .map((member) => (
                            <TeamMemberCard 
                              key={member.id} 
                              member={member} 
                              variant="cards"
                              theme={theme}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center space-x-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex space-x-2">
                  {Array.from({ length: maxSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSlide(Math.min(maxSlides - 1, currentSlide + 1))}
                  disabled={currentSlide === maxSlides - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Grid variants */}
          {variant !== "carousel" && (
            <div className={getGridClasses()}>
              {displayedMembers.map((member) => (
                <div key={member.id} className={variant === "masonry" ? "break-inside-avoid mb-6" : ""}>
                  <TeamMemberCard member={member} variant={variant} theme={theme} />
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          {showCTA && (
            <div className="text-center mt-12">
              <div className={cn(
                "inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-lg",
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              )}>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold mb-2">Rejoignez notre équipe</h3>
                  <p className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  )}>
                    Nous recrutons des talents passionnés pour renforcer notre équipe.
                  </p>
                </div>
                <Button onClick={onJoinTeam} className="flex-shrink-0">
                  Voir nos offres
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

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

        {/* Stats */}
        {showStats && variant !== "minimal" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={cn(
                  "inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3",
                  theme === "dark" ? "bg-blue-900/50" : "bg-blue-100"
                )}>
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Grid */}
        <div className={getGridClasses()}>
          {displayedMembers.map((member) => (
            <div key={member.id} className={variant === "masonry" ? "break-inside-avoid" : ""}>
              <TeamMemberCard 
                member={member} 
                variant={variant}
                showSocial={showSocial}
                showSkills={showSkills}
                theme={theme}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {members.length > displayedMembers.length && (
          <div className="text-center mt-12">
            <p className={cn(
              "mb-4",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Et {members.length - displayedMembers.length} autres talents exceptionnels...
            </p>
            <Button variant="outline" className="group">
              Voir toute l'équipe
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { TeamSectionProps, TeamMember };
