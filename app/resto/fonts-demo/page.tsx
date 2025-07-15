'use client';

import { RestaurantBackground } from '@/shared/components/atoms/ui/restaurant-background';
import { RestaurantText } from '@/shared/hooks/use-restaurant-fonts';
import { Button } from '@/shared/components/atoms/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Badge } from '@/shared/components/atoms/ui/badge';

export default function RestaurantFontsDemo() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <RestaurantBackground density="medium" maxIcons={20} />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <RestaurantText variant="decorative" className="text-6xl lg:text-8xl text-amber-900 mb-6">
            Restaurant Fonts
          </RestaurantText>
          <RestaurantText variant="body" className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez les polices spécialement sélectionnées pour créer l'ambiance parfaite de notre restaurant gastronomique.
          </RestaurantText>
        </div>

        {/* Demo des polices */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Police Body - Merriweather */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>
                <RestaurantText variant="body" className="text-2xl text-amber-900 font-bold">
                  Merriweather
                </RestaurantText>
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">Body Text</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RestaurantText variant="body" className="text-amber-700 mb-4">
                Cette police est utilisée pour tout le contenu principal. Elle offre une excellente lisibilité 
                tout en conservant un caractère élégant et raffiné parfait pour un restaurant gastronomique.
              </RestaurantText>
              <RestaurantText variant="body" className="text-sm text-amber-600 font-semibold">
                Weights: 300, 400, 700, 900
              </RestaurantText>
            </CardContent>
          </Card>

          {/* Police Heading - Playfair Display */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>
                <RestaurantText variant="heading" className="text-2xl text-amber-900 font-bold">
                  Playfair Display
                </RestaurantText>
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">Headings</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RestaurantText variant="body" className="text-amber-700 mb-4">
                Utilisée pour les titres principaux. Cette police serif élégante apporte une touche sophistiquée 
                et distinguée à tous nos en-têtes de section.
              </RestaurantText>
              <RestaurantText variant="body" className="text-sm text-amber-600 font-semibold">
                Weights: 400, 500, 600, 700, 800, 900
              </RestaurantText>
            </CardContent>
          </Card>

          {/* Police Decorative - Great Vibes */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>
                <RestaurantText variant="decorative" className="text-2xl text-amber-900">
                  Great Vibes
                </RestaurantText>
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">Decorative</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RestaurantText variant="body" className="text-amber-700 mb-4">
                Script élégant et artistique pour les éléments décoratifs spéciaux, 
                les citations importantes et les accents visuels marquants.
              </RestaurantText>
              <RestaurantText variant="body" className="text-sm text-amber-600 font-semibold">
                Weight: 400
              </RestaurantText>
            </CardContent>
          </Card>

          {/* Police Accent - Pacifico */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>
                <RestaurantText variant="accent" className="text-2xl text-amber-900">
                  Pacifico
                </RestaurantText>
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="bg-green-100 text-green-800">Accent</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RestaurantText variant="body" className="text-amber-700 mb-4">
                Police moderne et amicale pour les boutons, les appels à l'action et les éléments 
                d'interface qui nécessitent une approche plus décontractée.
              </RestaurantText>
              <RestaurantText variant="body" className="text-sm text-amber-600 font-semibold">
                Weight: 400
              </RestaurantText>
            </CardContent>
          </Card>

          {/* Police Handwriting - Satisfy */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>
                <RestaurantText variant="handwriting" className="text-2xl text-amber-900">
                  Satisfy
                </RestaurantText>
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Handwriting</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RestaurantText variant="body" className="text-amber-700 mb-4">
                Style manuscrit décontracté pour les citations, les témoignages et les éléments 
                personnalisés qui ajoutent une touche humaine.
              </RestaurantText>
              <RestaurantText variant="body" className="text-sm text-amber-600 font-semibold">
                Weight: 400
              </RestaurantText>
            </CardContent>
          </Card>

          {/* Police Menu - Dancing Script */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>
                <RestaurantText variant="menu" className="text-2xl text-amber-900">
                  Dancing Script
                </RestaurantText>
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="bg-rose-100 text-rose-800">Menu</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RestaurantText variant="body" className="text-amber-700 mb-4">
                Élégante et fluide pour les cartes de menu, les prix et les éléments qui nécessitent 
                une présentation raffinée et artistique.
              </RestaurantText>
              <RestaurantText variant="body" className="text-sm text-amber-600 font-semibold">
                Weights: 400, 500, 600, 700
              </RestaurantText>
            </CardContent>
          </Card>
        </div>

        {/* Exemple d'utilisation complète */}
        <Card className="bg-white/95 backdrop-blur-sm border-amber-200 shadow-2xl max-w-4xl mx-auto">
          <CardHeader className="text-center pb-8">
            <RestaurantText variant="decorative" className="text-5xl text-amber-900 mb-4">
              Menu du Chef
            </RestaurantText>
            <RestaurantText variant="body" className="text-lg text-amber-700">
              Exemple d'utilisation harmonieuse des polices restaurant
            </RestaurantText>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Plat principal */}
            <div className="border-b border-amber-200 pb-6">
              <div className="flex justify-between items-start mb-3">
                <RestaurantText variant="menu" className="text-2xl text-amber-800">
                  Filet de Bœuf Wellington
                </RestaurantText>
                <RestaurantText variant="accent" className="text-2xl text-amber-800 font-bold">
                  35€
                </RestaurantText>
              </div>
              <RestaurantText variant="body" className="text-amber-600 mb-3 leading-relaxed">
                Filet de bœuf enrobé de duxelles de champignons et de pâte feuilletée, 
                accompagné d'une sauce au porto et de légumes de saison rôtis.
              </RestaurantText>
              <RestaurantText variant="handwriting" className="text-lg text-amber-500 italic">
                "Une création signature de notre chef, inspirée de la tradition britannique"
              </RestaurantText>
            </div>

            {/* Dessert */}
            <div className="border-b border-amber-200 pb-6">
              <div className="flex justify-between items-start mb-3">
                <RestaurantText variant="menu" className="text-2xl text-amber-800">
                  Tarte Tatin Revisitée
                </RestaurantText>
                <RestaurantText variant="accent" className="text-2xl text-amber-800 font-bold">
                  12€
                </RestaurantText>
              </div>
              <RestaurantText variant="body" className="text-amber-600 mb-3 leading-relaxed">
                Pommes caramélisées sur pâte sablée maison, glace vanille de Madagascar 
                et crumble aux amandes.
              </RestaurantText>
              <RestaurantText variant="handwriting" className="text-lg text-amber-500 italic">
                "Un classique français sublimé par notre pâtissière"
              </RestaurantText>
            </div>

            {/* Call to action */}
            <div className="text-center pt-6">
              <RestaurantText variant="heading" className="text-2xl text-amber-900 mb-4">
                Réservez Votre Table
              </RestaurantText>
              <div className="flex gap-4 justify-center">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <RestaurantText variant="accent" className="font-semibold">
                    Réserver
                  </RestaurantText>
                </Button>
                <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                  <RestaurantText variant="body" className="font-semibold">
                    Voir le menu complet
                  </RestaurantText>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Note technique */}
        <div className="mt-16 text-center">
          <RestaurantText variant="body" className="text-amber-600 max-w-2xl mx-auto leading-relaxed">
            Toutes ces polices sont intégrées via Google Fonts et optimisées pour le web. 
            Elles s'adaptent automatiquement aux différentes tailles d'écran et offrent 
            une expérience de lecture optimale sur tous les appareils.
          </RestaurantText>
        </div>
      </div>
    </div>
  );
}
