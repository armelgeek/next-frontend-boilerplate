"use client";

import { Navbar } from "@/shared/components/organisms/navbar";
import { Footer } from "@/shared/components/organisms/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Separator } from "@/shared/components/atoms/ui/separator";
import { FoodIcon, FoodIconName } from "@/shared/components/atoms/icons/food-icons";
import { RestaurantText } from "@/shared/hooks/use-restaurant-fonts";
import { Clock, Star, Leaf } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  cookingTime?: string;
  rating?: number;
  icon?: FoodIconName;
}

const menuItems: MenuItem[] = [
  // Entrées
  {
    id: "1",
    name: "Foie gras mi-cuit",
    description: "Foie gras de canard mi-cuit, compotée de figues, pain de campagne toasté",
    price: 28,
    category: "Entrées",
    cookingTime: "15 min",
    rating: 4.8,
    icon: "FineFood"
  },
  {
    id: "2", 
    name: "Velouté de châtaignes",
    description: "Velouté onctueux aux châtaignes, crème de truffe, croutons dorés",
    price: 16,
    category: "Entrées",
    isVegetarian: true,
    cookingTime: "10 min",
    rating: 4.6,
    icon: "Apple"
  },
  {
    id: "3",
    name: "Tartare de saumon",
    description: "Saumon frais des îles Féroé, avocat, citron vert, ciboulette",
    price: 22,
    category: "Entrées",
    cookingTime: "12 min",
    rating: 4.7,
    icon: "Fish"
  },
  
  // Plats
  {
    id: "4",
    name: "Bœuf de Salers",
    description: "Côte de bœuf grillée, jus au thym, légumes de saison rôtis",
    price: 45,
    category: "Plats",
    cookingTime: "25 min",
    rating: 4.9,
    icon: "Beef"
  },
  {
    id: "5",
    name: "Sole meunière",
    description: "Sole fraîche du jour, beurre noisette, pommes de terre grenailles",
    price: 38,
    category: "Plats",
    cookingTime: "20 min",
    rating: 4.5,
    icon: "Fish"
  },
  {
    id: "6",
    name: "Risotto aux cèpes",
    description: "Risotto crémeux aux cèpes, parmesan 24 mois, huile de truffe",
    price: 26,
    category: "Plats",
    isVegetarian: true,
    cookingTime: "18 min",
    rating: 4.4,
    icon: "CookingPot"
  },
  
  // Desserts
  {
    id: "7",
    name: "Tarte Tatin",
    description: "Tarte aux pommes caramélisées, glace vanille bourbon, caramel beurre salé",
    price: 14,
    category: "Desserts",
    isVegetarian: true,
    cookingTime: "8 min",
    rating: 4.6,
    icon: "Cake"
  },
  {
    id: "8",
    name: "Soufflé au chocolat",
    description: "Soufflé chaud au chocolat noir 70%, cœur coulant, glace pistache",
    price: 16,
    category: "Desserts",
    isVegetarian: true,
    cookingTime: "20 min",
    rating: 4.8,
    icon: "Cake"
  },
  {
    id: "9",
    name: "Cheese-cake",
    description: "Cheese-cake maison aux fruits rouges, coulis de fraises",
    price: 12,
    category: "Desserts",
    isVegetarian: true,
    cookingTime: "5 min",
    rating: 4.3,
    icon: "IceCream"
  }
];

const categoryIcons: Record<string, FoodIconName> = {
  "Entrées": "FineFood",
  "Plats": "CookingPot", 
  "Desserts": "Cake"
};

const categories = ["Entrées", "Plats", "Desserts"];

export default function MenuPage() {
  return (
    <main className="bg-background min-h-screen restaurant-theme">
      <Navbar variant="restaurant" />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FoodIcon name="MenuCard" size={48} className="text-amber-600" />
          </div>
          <RestaurantText variant="decorative" className="text-5xl lg:text-6xl text-amber-900 mb-4">
            Notre Carte
          </RestaurantText>
          <RestaurantText variant="body" className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre sélection de plats authentiques, préparés avec des produits frais et de saison par notre chef étoilé.
          </RestaurantText>
        </div>

        {/* Menu par catégories */}
        {categories.map((category) => (
          <div key={category} className="mb-16">
            <div className="flex items-center mb-8">
              <FoodIcon name={categoryIcons[category]} size={24} className="mr-3 text-amber-600" />
              <RestaurantText variant="heading" className="text-3xl font-semibold text-amber-900">
                {category}
              </RestaurantText>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow border-amber-200 hover:border-amber-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          {item.icon && (
                            <FoodIcon 
                              name={item.icon} 
                              size={20} 
                              className="text-amber-600" 
                            />
                          )}
                          <RestaurantText variant="menu" className="text-xl text-amber-900">
                            {item.name}
                          </RestaurantText>
                        </div>
                        <div className="text-right">
                          <RestaurantText variant="accent" className="text-2xl font-bold text-amber-700">
                            {item.price}€
                          </RestaurantText>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <RestaurantText variant="body" className="text-base mb-4 text-amber-700 leading-relaxed">
                        {item.description}
                      </RestaurantText>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.isVegetarian && (
                          <Badge variant="secondary" className="text-green-600 bg-green-50 border-green-200">
                            <Leaf className="w-3 h-3 mr-1" />
                            Végétarien
                          </Badge>
                        )}
                        {item.cookingTime && (
                          <Badge variant="outline" className="border-amber-300 text-amber-700">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.cookingTime}
                          </Badge>
                        )}
                        {item.rating && (
                          <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {item.rating}
                          </Badge>
                        )}
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0">
                        Commander
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
            
            {category !== categories[categories.length - 1] && (
              <Separator className="mt-12" />
            )}
          </div>
        ))}

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-8 text-center mt-16">
          <FoodIcon name="Reservation" size={32} className="mx-auto mb-4 text-amber-600" />
          <RestaurantText variant="heading" className="text-2xl font-semibold mb-4 text-amber-900">
            Envie de réserver ?
          </RestaurantText>
          <RestaurantText variant="body" className="text-amber-700 mb-6 leading-relaxed">
            Réservez votre table dès maintenant et profitez d'une expérience culinaire exceptionnelle dans notre restaurant étoilé.
          </RestaurantText>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0 shadow-lg"
            >
              <FoodIcon name="TableService" size={16} className="mr-2" />
              Réserver une table
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <FoodIcon name="Delivery" size={16} className="mr-2" />
              Commander à emporter
            </Button>
          </div>
        </div>
      </div>

      <Footer variant="restaurant" />
    </main>
  );
}
