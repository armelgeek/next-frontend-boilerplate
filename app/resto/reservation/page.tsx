"use client";

import { useState } from "react";
import { Navbar } from "@/shared/components/organisms/navbar";
import { Footer } from "@/shared/components/organisms/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { Input } from "@/shared/components/atoms/ui/input";
import { Label } from "@/shared/components/atoms/ui/label";
import { Textarea } from "@/shared/components/atoms/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/atoms/ui/select";
import { Calendar } from "@/shared/components/atoms/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/atoms/ui/popover";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Separator } from "@/shared/components/atoms/ui/separator";
import { RestaurantText } from "@/shared/hooks/use-restaurant-fonts";
import { CalendarIcon, Clock, Users, MapPin, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/shared/lib/utils";

interface ReservationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: Date | undefined;
  time: string;
  guests: string;
  occasion: string;
  specialRequests: string;
}

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
];

const occasions = [
  "Dîner romantique",
  "Repas d'affaires", 
  "Anniversaire",
  "Famille",
  "Autre"
];

export default function ReservationPage() {
  const [form, setForm] = useState<ReservationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: undefined,
    time: "",
    guests: "",
    occasion: "",
    specialRequests: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", form);
    // TODO: Implement reservation logic
  };

  const updateForm = (field: keyof ReservationForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="bg-background min-h-screen restaurant-theme">
      <Navbar variant="restaurant" />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <RestaurantText variant="decorative" className="text-5xl lg:text-6xl mb-4 text-amber-900">
            Réservation
          </RestaurantText>
          <RestaurantText variant="body" className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Réservez votre table au Resto Gourmet et préparez-vous à vivre une expérience culinaire inoubliable.
          </RestaurantText>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaire de réservation */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <RestaurantText variant="heading" className="text-xl text-amber-900">
                    Informations de réservation
                  </RestaurantText>
                </CardTitle>
                <CardDescription>
                  <RestaurantText variant="body" className="text-amber-700">
                    Remplissez ce formulaire pour réserver votre table
                  </RestaurantText>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations personnelles */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => updateForm("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => updateForm("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Détails de la réservation */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !form.date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.date ? (
                              format(form.date, "PPP", { locale: fr })
                            ) : (
                              <span>Choisir une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={form.date}
                            onSelect={(date) => updateForm("date", date)}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Heure *</Label>
                      <Select onValueChange={(value) => updateForm("time", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir l'heure" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Nombre de personnes *</Label>
                      <Select onValueChange={(value) => updateForm("guests", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Nb de convives" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "personne" : "personnes"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Occasion</Label>
                    <Select onValueChange={(value) => updateForm("occasion", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type d'événement (optionnel)" />
                      </SelectTrigger>
                      <SelectContent>
                        {occasions.map((occasion) => (
                          <SelectItem key={occasion} value={occasion}>
                            {occasion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Demandes spéciales</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Allergies, régime alimentaire, demandes particulières..."
                      value={form.specialRequests}
                      onChange={(e) => updateForm("specialRequests", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Confirmer la réservation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Informations du restaurant */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Informations pratiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">
                      12 rue du Gourmet<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-sm text-muted-foreground">
                      +33 1 23 45 67 89
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      contact@restogourmet.fr
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Horaires d'ouverture</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Déjeuner: 12h00 - 14h30</p>
                      <p>Dîner: 19h00 - 22h30</p>
                      <p>Fermé le dimanche</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Politique d'annulation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  • Annulation gratuite jusqu'à 24h avant la réservation
                </p>
                <p>
                  • Pour les groupes de plus de 8 personnes, annulation 48h avant
                </p>
                <p>
                  • En cas de retard, votre table sera maintenue 15 minutes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nos spécialités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Cuisine française</Badge>
                  <Badge variant="secondary">Produits locaux</Badge>
                  <Badge variant="secondary">Chef étoilé</Badge>
                  <Badge variant="secondary">Vins d'exception</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer variant="restaurant" />
    </main>
  );
}
