"use client";

import { Navbar } from "@/shared/components/organisms/navbar";
import { Footer } from "@/shared/components/organisms/footer";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Separator } from "@/shared/components/atoms/ui/separator";
import { RestaurantText } from "@/shared/hooks/use-restaurant-fonts";
import { Star, MapPin, Clock, Users, Award, Camera } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/api/placeholder/800/600",
    alt: "Salle principale du restaurant",
    category: "Ambiance",
    caption: "Notre salle principale avec vue sur les cuisines ouvertes"
  },
  {
    id: "2", 
    src: "/api/placeholder/800/600",
    alt: "Plat signature du chef",
    category: "Plats",
    caption: "Bœuf de Salers grillé, notre spécialité"
  },
  {
    id: "3",
    src: "/api/placeholder/800/600", 
    alt: "Équipe en cuisine",
    category: "Équipe",
    caption: "Notre chef et son équipe au travail"
  },
  {
    id: "4",
    src: "/api/placeholder/800/600",
    alt: "Terrasse extérieure",
    category: "Ambiance",
    caption: "Notre terrasse pour les beaux jours"
  },
  {
    id: "5",
    src: "/api/placeholder/800/600",
    alt: "Dessert maison",
    category: "Plats", 
    caption: "Soufflé au chocolat, préparé minute"
  },
  {
    id: "6",
    src: "/api/placeholder/800/600",
    alt: "Cave à vins",
    category: "Ambiance",
    caption: "Notre cave avec plus de 300 références"
  },
  {
    id: "7",
    src: "/api/placeholder/800/600",
    alt: "Service en salle",
    category: "Équipe",
    caption: "Service attentionné et professionnel"
  },
  {
    id: "8",
    src: "/api/placeholder/800/600",
    alt: "Entrée foie gras",
    category: "Plats",
    caption: "Foie gras mi-cuit aux figues confites"
  }
];

const categories = ["Tous", "Ambiance", "Plats", "Équipe"];

const awards = [
  { name: "Guide Michelin", description: "1 étoile depuis 2019", icon: <Star className="w-5 h-5" /> },
  { name: "Gault & Millau", description: "16/20 - Très bonne table", icon: <Award className="w-5 h-5" /> },
  { name: "TripAdvisor", description: "Certificat d'Excellence 2024", icon: <Star className="w-5 h-5" /> }
];

export default function GalleryPage() {
  return (
    <main className="bg-background min-h-screen restaurant-theme">
      <Navbar variant="restaurant" />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <RestaurantText variant="decorative" className="text-5xl lg:text-6xl mb-4 text-amber-900">
            Galerie
          </RestaurantText>
          <RestaurantText variant="body" className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Découvrez en images l'ambiance unique du Resto Gourmet, nos plats d'exception et notre équipe passionnée.
          </RestaurantText>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">40+</div>
              <p className="text-sm text-muted-foreground">Années d'expérience</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">5000+</div>
              <p className="text-sm text-muted-foreground">Clients satisfaits</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">50</div>
              <p className="text-sm text-muted-foreground">Plats à la carte</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">300+</div>
              <p className="text-sm text-muted-foreground">Références de vins</p>
            </CardContent>
          </Card>
        </div>

        {/* Récompenses */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Nos récompenses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-3 text-primary">
                    {award.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{award.name}</h3>
                  <p className="text-sm text-muted-foreground">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Galerie photos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <Camera className="w-6 h-6 mr-2" />
              Galerie Photos
            </h2>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille d'images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">{image.category}</Badge>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              {image.caption && (
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">{image.caption}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Informations pratiques */}
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Adresse</h3>
                <p className="text-sm text-muted-foreground">
                  12 rue du Gourmet<br />
                  75001 Paris, France
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Horaires</h3>
                <p className="text-sm text-muted-foreground">
                  Déjeuner: 12h-14h30<br />
                  Dîner: 19h-22h30<br />
                  Fermé dimanche
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Capacité</h3>
                <p className="text-sm text-muted-foreground">
                  60 places en salle<br />
                  30 places en terrasse<br />
                  Salon privatisable
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">Envie de nous rendre visite ?</h3>
          <p className="text-muted-foreground mb-6">
            Réservez votre table dès maintenant et découvrez par vous-même notre ambiance unique.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg">
              Réserver une table
            </Button>
            <Button variant="outline" size="lg">
              Voir le menu
            </Button>
          </div>
        </div>
      </div>

      <Footer variant="restaurant" />
    </main>
  );
}
