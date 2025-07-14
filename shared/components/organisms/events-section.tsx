"use client";

import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { 
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  DollarSign,
  ArrowRight,
  Filter,
  Grid,
  List,
  Search
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
  };
  price?: number;
  currency?: string;
  category: string;
  organizer: {
    name: string;
    avatar?: string;
  };
  image?: string;
  attendees: number;
  maxAttendees?: number;
  rating?: number;
  featured?: boolean;
  tags: string[];
  status: "upcoming" | "ongoing" | "past";
}

interface EventsSectionProps {
  variant?: "grid" | "list" | "calendar" | "timeline" | "featured" | "map";
  title: string;
  subtitle?: string;
  events: Event[];
  showFilters?: boolean;
  showSearch?: boolean;
  showPrice?: boolean;
  showAttendees?: boolean;
  showOrganizer?: boolean;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  onEventClick?: (event: Event) => void;
  onRegister?: (event: Event) => void;
  categories?: string[];
}

function EventCard({ 
  event, 
  variant = "default",
  showPrice = true,
  showAttendees = true,
  showOrganizer = true,
  onEventClick,
  onRegister
}: {
  event: Event;
  variant?: string;
  showPrice?: boolean;
  showAttendees?: boolean;
  showOrganizer?: boolean;
  onEventClick?: (event: Event) => void;
  onRegister?: (event: Event) => void;
}) {
  const isUpcoming = event.status === "upcoming";
  const isPast = event.status === "past";
  
  if (variant === "timeline") {
    return (
      <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
           onClick={() => onEventClick?.(event)}>
        <div className="flex-shrink-0 w-16 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {new Date(event.date).getDate()}
          </div>
          <div className="text-sm text-gray-500 uppercase">
            {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={isUpcoming ? "default" : isPast ? "secondary" : "destructive"}>
              {event.category}
            </Badge>
            {event.featured && (
              <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
            )}
          </div>
          
          <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{event.location.city}</span>
            </div>
            {showPrice && event.price && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>{event.price}{event.currency || '€'}</span>
              </div>
            )}
          </div>
          
          {showAttendees && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{event.attendees} participants</span>
              {event.maxAttendees && (
                <span>/ {event.maxAttendees} max</span>
              )}
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          <Button 
            size="sm" 
            disabled={isPast}
            onClick={(e) => {
              e.stopPropagation();
              onRegister?.(event);
            }}
          >
            {isPast ? "Terminé" : "S'inscrire"}
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => onEventClick?.(event)}>
        <CardContent className="p-0">
          <div className="flex gap-6">
            {event.image && (
              <div className="w-48 h-32 flex-shrink-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
            )}
            
            <div className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={isUpcoming ? "default" : isPast ? "secondary" : "destructive"}>
                  {event.category}
                </Badge>
                {event.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
                )}
                {event.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{event.rating}</span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location.name}, {event.location.city}</span>
                  </div>
                </div>

                <div className="text-right">
                  {showPrice && event.price && (
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {event.price}{event.currency || '€'}
                    </div>
                  )}
                  {showAttendees && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} inscrits</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                {showOrganizer && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      {event.organizer.avatar ? (
                        <img
                          src={event.organizer.avatar}
                          alt={event.organizer.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-sm">{event.organizer.name[0]}</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{event.organizer.name}</span>
                  </div>
                )}

                <Button 
                  disabled={isPast}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegister?.(event);
                  }}
                >
                  {isPast ? "Terminé" : "S'inscrire"}
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
      event.featured && "border-yellow-400 ring-2 ring-yellow-400/20",
      isPast && "opacity-75"
    )} onClick={() => onEventClick?.(event)}>
      <CardContent className="p-0">
        {event.image && (
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {event.featured && (
              <Badge className="absolute top-3 left-3 bg-yellow-100 text-yellow-800">
                Vedette
              </Badge>
            )}
            <Badge 
              className={cn(
                "absolute top-3 right-3",
                isUpcoming && "bg-green-100 text-green-800",
                isPast && "bg-gray-100 text-gray-800"
              )}
            >
              {event.category}
            </Badge>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {!event.image && (
                <Badge variant={isUpcoming ? "default" : "secondary"}>
                  {event.category}
                </Badge>
              )}
              {event.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{event.rating}</span>
                </div>
              )}
            </div>
            
            {showPrice && event.price && (
              <div className="text-xl font-bold text-blue-600">
                {event.price}{event.currency || '€'}
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {event.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{event.location.name}, {event.location.city}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            {showOrganizer && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {event.organizer.avatar ? (
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm">{event.organizer.name[0]}</span>
                  )}
                </div>
                <span className="text-sm text-gray-600">{event.organizer.name}</span>
              </div>
            )}

            {showAttendees && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{event.attendees}</span>
                {event.maxAttendees && (
                  <span>/{event.maxAttendees}</span>
                )}
              </div>
            )}
          </div>

          <Button 
            className="w-full" 
            disabled={isPast}
            onClick={(e) => {
              e.stopPropagation();
              onRegister?.(event);
            }}
          >
            {isPast ? "Événement terminé" : "S'inscrire"}
            {!isPast && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function EventsSection({
  variant = "grid",
  title,
  subtitle,
  events,
  showFilters = false,
  showSearch = false,
  showPrice = true,
  showAttendees = true,
  showOrganizer = true,
  columns = 3,
  className,
  onEventClick,
  onRegister,
  categories = []
}: EventsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === null || event.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const eventCategories = categories.length > 0 ? categories : 
    Array.from(new Set(events.map(event => event.category)));

  if (variant === "featured") {
    const featuredEvent = events.find(e => e.featured) || events[0];
    const otherEvents = events.filter(e => e.id !== featuredEvent.id).slice(0, 6);

    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <EventCard
                event={featuredEvent}
                showPrice={showPrice}
                showAttendees={showAttendees}
                showOrganizer={showOrganizer}
                onEventClick={onEventClick}
                onRegister={onRegister}
              />
            </div>
            
            <div className="space-y-4">
              {otherEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="timeline"
                  showPrice={showPrice}
                  showAttendees={showAttendees}
                  showOrganizer={showOrganizer}
                  onEventClick={onEventClick}
                  onRegister={onRegister}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "timeline") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-4xl mx-auto px-4">
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
                    placeholder="Rechercher un événement..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {showFilters && (
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Tous les événements
                  </Button>
                  {eventCategories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    variant="timeline"
                    showPrice={showPrice}
                    showAttendees={showAttendees}
                    showOrganizer={showOrganizer}
                    onEventClick={onEventClick}
                    onRegister={onRegister}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
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

        {(showFilters || showSearch) && (
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              {showSearch && (
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher un événement..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Tous
                </Button>
                {eventCategories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {viewMode === "list" ? (
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                variant="list"
                showPrice={showPrice}
                showAttendees={showAttendees}
                showOrganizer={showOrganizer}
                onEventClick={onEventClick}
                onRegister={onRegister}
              />
            ))}
          </div>
        ) : (
          <div className={cn(
            "grid gap-6",
            columns === 1 && "grid-cols-1 max-w-3xl mx-auto",
            columns === 2 && "md:grid-cols-2",
            columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
          )}>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                showPrice={showPrice}
                showAttendees={showAttendees}
                showOrganizer={showOrganizer}
                onEventClick={onEventClick}
                onRegister={onRegister}
              />
            ))}
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun événement trouvé
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
