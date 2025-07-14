"use client";

import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { 
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Building,
  GraduationCap,
  Heart,
  Share2,
  ExternalLink,
  ArrowRight,
  Search,
  Filter
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

interface Job {
  id: string;
  title: string;
  description: string;
  company: {
    name: string;
    logo?: string;
    location: string;
  };
  location: {
    city: string;
    country: string;
    remote?: boolean;
    hybrid?: boolean;
  };
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
  level: "junior" | "mid" | "senior" | "lead" | "executive";
  category: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: "hour" | "month" | "year";
  };
  postedAt: string;
  deadline?: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  featured?: boolean;
  urgent?: boolean;
  applicants?: number;
  maxApplicants?: number;
}

interface JobsSectionProps {
  variant?: "grid" | "list" | "board" | "featured" | "minimal";
  title: string;
  subtitle?: string;
  jobs: Job[];
  showFilters?: boolean;
  showSearch?: boolean;
  showSalary?: boolean;
  showCompany?: boolean;
  showApplicants?: boolean;
  columns?: 1 | 2 | 3;
  className?: string;
  onJobClick?: (job: Job) => void;
  onApply?: (job: Job) => void;
  onSaveJob?: (job: Job) => void;
  categories?: string[];
  locations?: string[];
}

function JobCard({ 
  job, 
  variant = "default",
  showSalary = true,
  showCompany = true,
  showApplicants = true,
  onJobClick,
  onApply,
  onSaveJob
}: {
  job: Job;
  variant?: string;
  showSalary?: boolean;
  showCompany?: boolean;
  showApplicants?: boolean;
  onJobClick?: (job: Job) => void;
  onApply?: (job: Job) => void;
  onSaveJob?: (job: Job) => void;
}) {
  const isRecent = new Date(job.postedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  if (variant === "minimal") {
    return (
      <div className="group cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
           onClick={() => onJobClick?.(job)}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                {job.title}
              </h3>
              {job.featured && (
                <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
              )}
              {job.urgent && (
                <Badge className="bg-red-100 text-red-800">Urgent</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              {showCompany && (
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{job.company.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location.city}</span>
                {job.location.remote && <Badge variant="outline" className="text-xs">Remote</Badge>}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span className="capitalize">{job.type.replace('-', ' ')}</span>
              </div>
            </div>

            {showSalary && job.salary && (
              <div className="text-green-600 font-medium">
                {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                <span className="text-gray-500">/{job.salary.period === 'year' ? 'an' : job.salary.period === 'month' ? 'mois' : 'h'}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSaveJob?.(job);
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onApply?.(job);
              }}
            >
              Postuler
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "board") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500"
            onClick={() => onJobClick?.(job)}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant={job.urgent ? "destructive" : "secondary"}>
                {job.category}
              </Badge>
              {job.featured && (
                <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
              )}
              {isRecent && (
                <Badge className="bg-green-100 text-green-800">Nouveau</Badge>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSaveJob?.(job);
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {job.title}
          </h3>

          {showCompany && (
            <div className="flex items-center gap-2 mb-3">
              {job.company.logo && (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-8 h-8 rounded"
                />
              )}
              <div>
                <div className="font-medium">{job.company.name}</div>
                <div className="text-sm text-gray-500">{job.company.location}</div>
              </div>
            </div>
          )}

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location.city}, {job.location.country}</span>
              {job.location.remote && (
                <Badge variant="outline" className="text-xs">Remote</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span className="capitalize">{job.type.replace('-', ' ')}</span>
              <span>•</span>
              <span className="capitalize">{job.level}</span>
            </div>

            {showSalary && job.salary && (
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">
                  {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {job.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Publié {new Date(job.postedAt).toLocaleDateString('fr-FR')}
            </div>
            
            {showApplicants && job.applicants && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                <span>{job.applicants} candidats</span>
              </div>
            )}
          </div>

          <Button 
            className="w-full mt-4"
            onClick={(e) => {
              e.stopPropagation();
              onApply?.(job);
            }}
          >
            Postuler maintenant
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (variant === "list") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => onJobClick?.(job)}>
        <CardContent className="p-6">
          <div className="flex gap-6">
            {showCompany && job.company.logo && (
              <div className="flex-shrink-0">
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    {job.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
                    )}
                    {job.urgent && (
                      <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                    )}
                    {isRecent && (
                      <Badge className="bg-green-100 text-green-800">Nouveau</Badge>
                    )}
                  </div>
                  
                  {showCompany && (
                    <div className="text-lg text-gray-700 mb-2">{job.company.name}</div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveJob?.(job);
                    }}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Share functionality
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location.city}, {job.location.country}</span>
                    {job.location.remote && (
                      <Badge variant="outline" className="text-xs">Remote</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span className="capitalize">{job.type.replace('-', ' ')}</span>
                    <span>•</span>
                    <span className="capitalize">{job.level}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Publié {new Date(job.postedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {showSalary && job.salary && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">
                        {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                        <span className="text-gray-500 ml-1">
                          /{job.salary.period === 'year' ? 'an' : job.salary.period === 'month' ? 'mois' : 'h'}
                        </span>
                      </span>
                    </div>
                  )}

                  {showApplicants && job.applicants && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{job.applicants} candidats</span>
                      {job.maxApplicants && (
                        <span>/ {job.maxApplicants} max</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {job.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="secondary">{job.category}</Badge>
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply?.(job);
                  }}
                >
                  Postuler
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default card variant
  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-300 cursor-pointer",
      job.featured && "border-yellow-400 ring-2 ring-yellow-400/20",
      job.urgent && "border-red-400 ring-2 ring-red-400/20"
    )} onClick={() => onJobClick?.(job)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant={job.urgent ? "destructive" : "secondary"}>
              {job.category}
            </Badge>
            {job.featured && (
              <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
            )}
            {isRecent && (
              <Badge className="bg-green-100 text-green-800">Nouveau</Badge>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSaveJob?.(job);
            }}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
          {job.title}
        </h3>

        {showCompany && (
          <div className="flex items-center gap-3 mb-4">
            {job.company.logo && (
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="w-10 h-10 rounded object-cover"
              />
            )}
            <div>
              <div className="font-medium">{job.company.name}</div>
              <div className="text-sm text-gray-500">{job.company.location}</div>
            </div>
          </div>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{job.location.city}, {job.location.country}</span>
            {job.location.remote && (
              <Badge variant="outline" className="text-xs">Remote</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span className="capitalize">{job.type.replace('-', ' ')}</span>
            <span>•</span>
            <span className="capitalize">{job.level}</span>
          </div>

          {showSalary && job.salary && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">
                {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {job.tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-500">
            Publié {new Date(job.postedAt).toLocaleDateString('fr-FR')}
          </div>
          
          {showApplicants && job.applicants && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users className="w-3 h-3" />
              <span>{job.applicants} candidats</span>
            </div>
          )}
        </div>

        <Button 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onApply?.(job);
          }}
        >
          Postuler
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

export function JobsSection({
  variant = "grid",
  title,
  subtitle,
  jobs,
  showFilters = false,
  showSearch = false,
  showSalary = true,
  showCompany = true,
  showApplicants = true,
  columns = 3,
  className,
  onJobClick,
  onApply,
  onSaveJob,
  categories = [],
  locations = []
}: JobsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === null || job.category === selectedCategory;
    const matchesLocation = selectedLocation === null || 
      job.location.city === selectedLocation || 
      job.company.location === selectedLocation;
    const matchesType = selectedType === null || job.type === selectedType;
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesLocation && matchesType && matchesSearch;
  });

  const jobCategories = categories.length > 0 ? categories : 
    Array.from(new Set(jobs.map(job => job.category)));
  
  const jobLocations = locations.length > 0 ? locations : 
    Array.from(new Set(jobs.map(job => job.location.city)));

  const jobTypes = ["full-time", "part-time", "contract", "freelance", "internship"];

  if (variant === "featured") {
    const featuredJob = jobs.find(j => j.featured) || jobs[0];
    const otherJobs = jobs.filter(j => j.id !== featuredJob.id).slice(0, 8);

    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <JobCard
                job={featuredJob}
                variant="list"
                showSalary={showSalary}
                showCompany={showCompany}
                showApplicants={showApplicants}
                onJobClick={onJobClick}
                onApply={onApply}
                onSaveJob={onSaveJob}
              />
            </div>
            
            <div className="space-y-4">
              {otherJobs.slice(0, 3).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  variant="minimal"
                  showSalary={showSalary}
                  showCompany={showCompany}
                  showApplicants={showApplicants}
                  onJobClick={onJobClick}
                  onApply={onApply}
                  onSaveJob={onSaveJob}
                />
              ))}
            </div>
          </div>

          {otherJobs.length > 3 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherJobs.slice(3).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  variant="board"
                  showSalary={showSalary}
                  showCompany={showCompany}
                  showApplicants={showApplicants}
                  onJobClick={onJobClick}
                  onApply={onApply}
                  onSaveJob={onSaveJob}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "board") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          {(showFilters || showSearch) && (
            <div className="mb-8 space-y-4">
              {showSearch && (
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher un emploi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {showFilters && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Catégorie</label>
                    <select
                      value={selectedCategory || ""}
                      onChange={(e) => setSelectedCategory(e.target.value || null)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Toutes les catégories</option>
                      {jobCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Localisation</label>
                    <select
                      value={selectedLocation || ""}
                      onChange={(e) => setSelectedLocation(e.target.value || null)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Toutes les villes</option>
                      {jobLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                      value={selectedType || ""}
                      onChange={(e) => setSelectedType(e.target.value || null)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Tous les types</option>
                      {jobTypes.map(type => (
                        <option key={type} value={type}>
                          {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                variant="board"
                showSalary={showSalary}
                showCompany={showCompany}
                showApplicants={showApplicants}
                onJobClick={onJobClick}
                onApply={onApply}
                onSaveJob={onSaveJob}
              />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucun emploi trouvé
              </h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou vos filtres.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Default grid/list variant
  return (
    <section className={cn("py-20", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>

        {variant === "list" ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                variant="list"
                showSalary={showSalary}
                showCompany={showCompany}
                showApplicants={showApplicants}
                onJobClick={onJobClick}
                onApply={onApply}
                onSaveJob={onSaveJob}
              />
            ))}
          </div>
        ) : (
          <div className={cn(
            "grid gap-6",
            columns === 1 && "grid-cols-1 max-w-3xl mx-auto",
            columns === 2 && "md:grid-cols-2",
            columns === 3 && "md:grid-cols-2 lg:grid-cols-3"
          )}>
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                showSalary={showSalary}
                showCompany={showCompany}
                showApplicants={showApplicants}
                onJobClick={onJobClick}
                onApply={onApply}
                onSaveJob={onSaveJob}
              />
            ))}
          </div>
        )}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun emploi trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
