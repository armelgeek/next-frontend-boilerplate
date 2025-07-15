"use client";

import { Navbar } from "@/shared/components/organisms/navbar";
import { Footer } from "@/shared/components/organisms/footer";
import { HeroSection } from "@/shared/components/organisms/hero-section";
import { FeaturesSection } from "@/shared/components/organisms/features-section";
import { AboutSection } from "@/shared/components/organisms/about-section";
import { TeamSection } from "@/shared/components/organisms/team-section";
import { TestimonialsSection } from "@/shared/components/organisms/testimonials-section";
import { PricingSection } from "@/shared/components/organisms/pricing-section";
import { ContactSection } from "@/shared/components/organisms/contact-section";
import { CTASection } from "@/shared/components/organisms/cta-section";
import { FoodIcon } from "@/shared/components/atoms/icons/food-icons";
import { RestaurantBackground } from "@/shared/components/atoms/ui/restaurant-background";
import { RestaurantText } from "@/shared/hooks/use-restaurant-fonts";

export default function RestoHomePage() {
  return (
    <main className="min-h-screen flex flex-col relative restaurant-theme">
      <Navbar variant="restaurant" className="lg:px-40 xl:px-40" />
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 lg:px-40 xl:px-40 relative">
        {/* Background d'icônes de nourriture mega-dense pour le restaurant */}
        <RestaurantBackground 
          density="dense" 
          variant="hero"
          maxIcons={12}
          colors={{
            primary: "text-amber-600",
            secondary: "text-orange-700", 
            accent: "text-purple-600"
          }}
        />
        ==
        {/* Contenu principal avec z-index élevé */}
        <div className="relative z-10">
        
      <HeroSection
        title="Resto Gourmet"
        subtitle="Une expérience culinaire inoubliable à Paris"
        description="Découvrez notre carte raffinée, notre équipe passionnée et un cadre exceptionnel. Réservez votre table dès maintenant !"
        actions={[{ label: "Réserver", href: "/resto/reservation", variant: "default" }, { label: "Voir le menu", href: "/resto/menu", variant: "outline" }]}
        image="/api/placeholder/1200/600"
        variant="restaurant"
      />
      <FeaturesSection
        title="Nos Spécialités Gastronomiques"
        description="Des plats authentiques et créatifs préparés avec passion"
        features={[
          { 
            icon: <FoodIcon name="FineFood" size={24} className="text-amber-600" />, 
            title: "Cuisine gastronomique", 
            description: "Des recettes traditionnelles revisitées avec créativité par notre chef étoilé." 
          },
          { 
            icon: <FoodIcon name="FreshIngredients" size={24} className="text-green-600" />, 
            title: "Produits frais et locaux", 
            description: "Nous sélectionnons les meilleurs producteurs de la région pour garantir la fraîcheur." 
          },
          { 
            icon: <FoodIcon name="StarRestaurant" size={24} className="text-yellow-500" />, 
            title: "Expérience étoilée", 
            description: "Un service d'exception dans un cadre raffiné pour tous vos événements." 
          },
          { 
            icon: <FoodIcon name="Wine" size={24} className="text-purple-600" />, 
            title: "Cave à vins", 
            description: "Plus de 200 références soigneusement sélectionnées par notre sommelier." 
          },
          { 
            icon: <FoodIcon name="Cook" size={24} className="text-orange-600" />, 
            title: "Cuisine ouverte", 
            description: "Assistez au spectacle de la préparation de vos plats en cuisine ouverte." 
          },
          { 
            icon: <FoodIcon name="Reservation" size={24} className="text-blue-600" />, 
            title: "Service personnalisé", 
            description: "Réservation facile et service adapté à vos besoins spécifiques." 
          }
        ]}
        columns={3}
        variant="restaurant"
      />
      <AboutSection
        title="Notre Histoire Culinaire"
        description="Le Resto Gourmet, c'est une équipe passionnée, un chef étoilé et une histoire familiale depuis 1980. Notre mission : vous offrir le meilleur de la gastronomie parisienne dans un cadre d'exception."
        image="/api/placeholder/600/400"
        stats={[
          { value: "40 ans", label: "D'excellence" },
          { value: "5000+", label: "Clients satisfaits" },
          { value: "24/7", label: "Service" }
        ]}
        variant="restaurant"
      />
      <TeamSection
        title="Notre Équipe d'Exception"
        description="Des professionnels passionnés à votre service"
        members={[
          { id: "1", name: "Jean Martin", role: "Chef étoilé", description: "30 ans d'expérience en cuisine gastronomique.", avatar: "/api/placeholder/300/300", social: { linkedin: "#" } },
          { id: "2", name: "Sophie Dubois", role: "Responsable salle", description: "Accueil et organisation irréprochables.", avatar: "/api/placeholder/300/300", social: { linkedin: "#" } },
          { id: "3", name: "Pierre Leroy", role: "Sommelier", description: "Expert des vins français.", avatar: "/api/placeholder/300/300", social: { twitter: "#" } }
        ]}
        variant="restaurant"
      />
      <TestimonialsSection
        title="Témoignages de nos Clients"
        subtitle="Des avis authentiques de nos clients qui ont vécu l'expérience gastronomique"
        testimonials={[
          { id: "1", name: "Marie Dupont", role: "Cliente fidèle", rating: 5, content: "Une cuisine exceptionnelle et un service irréprochable. Une adresse incontournable à Paris !", avatar: "/api/placeholder/100/100", verified: true },
          { id: "2", name: "Jean Martin", role: "Critique gastronomique", rating: 5, content: "Le Chef excelle dans l'art de revisiter les classiques français. Bravo !", avatar: "/api/placeholder/100/100", verified: true },
          { id: "3", name: "Sophie Leroy", role: "Entrepreneuse", rating: 5, content: "Parfait pour les dîners d'affaires. Cadre élégant et cuisine raffinée.", avatar: "/api/placeholder/100/100", verified: true }
        ]}
        variant="restaurant"
      />
      <PricingSection
        title="Nos Menus Signature"
        subtitle="Des formules raffinées pour tous les moments"
        plans={[
          { id: "midi", name: "Formule Midi", price: 18, period: "", description: "Entrée + Plat + Dessert", features: [ { name: "Boisson incluse", included: true }, { name: "Café offert", included: true } ], buttonText: "Réserver", popular: true },
          { id: "soir", name: "Formule Soir", price: 32, period: "", description: "Menu complet avec spécialités du chef", features: [ { name: "Accord mets-vins", included: true }, { name: "Digestif offert", included: true } ], buttonText: "Réserver", popular: false },
          { id: "groupe", name: "Groupe", price: 25, period: "par personne", description: "Pour les groupes de 8 à 30 personnes", features: [ { name: "Menu personnalisé", included: true }, { name: "Salle privatisée", included: true } ], buttonText: "Demander un devis", popular: false }
        ]}
        variant="restaurant"
      />
      <ContactSection
        title="Réservation & Contact"
        description="Réservez votre table ou contactez-nous pour toute demande spéciale. Notre équipe est à votre disposition."
        contactInfo={{ email: "contact@restogourmet.fr", phone: "+33 1 23 45 67 89", address: "12 rue du Gourmet, 75001 Paris" }}
        showForm={true}
        variant="restaurant"
      />
      <CTASection
        title="Vivez une Expérience Gastronomique Unique"
        description="Réservez dès maintenant et profitez d'une soirée inoubliable au Resto Gourmet. Laissez-vous surprendre par notre cuisine d'exception."
        actions={[{ label: "Réserver une table", href: "/resto/reservation", variant: "default" }, { label: "Voir le menu complet", href: "/resto/menu", variant: "outline" }]}
        variant="restaurant"
        backgroundPattern={true}
      />
        </div> {/* Fermeture du div z-10 */}
      </div> {/* Fermeture du div principal avec background */}
      <Footer variant="restaurant"  className="lg:px-40 xl:px-40" />
    </main>
  );
}
