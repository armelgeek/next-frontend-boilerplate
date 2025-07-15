"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { 
  HelpCircle,
  Plus,
  Minus,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Book,
  Video,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Clock,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  featured?: boolean;
  helpful?: number;
  related?: string[];
  lastUpdated?: string;
  author?: {
    name: string;
    role: string;
  };
}

interface FAQSectionProps {
  variant?: "accordion" | "grid" | "search" | "categorized" | "minimal" | "detailed";
  title?: string;
  description?: string;
  faqs?: FAQItem[];
  showSearch?: boolean;
  showCategories?: boolean;
  showStats?: boolean;
  showSupport?: boolean;
  maxVisible?: number;
  className?: string;
  theme?: "light" | "dark";
  onContactSupport?: () => void;
}

const defaultFAQs: FAQItem[] = [
  {
    id: "1",
    question: "Comment puis-je créer un compte ?",
    answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut à droite de la page. Remplissez le formulaire avec vos informations personnelles et validez votre adresse email. Le processus ne prend que quelques minutes.",
    category: "Compte",
    featured: true,
    helpful: 45,
    related: ["2", "3"],
    lastUpdated: "2024-06-15",
    author: {
      name: "Support Team",
      role: "Customer Success"
    }
  },
  {
    id: "2",
    question: "Comment réinitialiser mon mot de passe ?",
    answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié' sur la page de connexion. Entrez votre adresse email et suivez les instructions envoyées par email pour créer un nouveau mot de passe sécurisé.",
    category: "Compte",
    helpful: 38,
    related: ["1", "3"],
    lastUpdated: "2024-06-12"
  },
  {
    id: "3",
    question: "Comment modifier mes informations personnelles ?",
    answer: "Connectez-vous à votre compte et accédez à la section 'Profil' dans les paramètres. Vous pouvez y modifier votre nom, email, adresse et autres informations personnelles. N'oubliez pas de sauvegarder vos modifications.",
    category: "Compte",
    helpful: 32,
    lastUpdated: "2024-06-10"
  },
  {
    id: "4",
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les cartes de crédit (Visa, MasterCard, American Express), PayPal, virements bancaires et les portefeuilles numériques comme Apple Pay et Google Pay. Tous les paiements sont sécurisés et cryptés.",
    category: "Paiement",
    featured: true,
    helpful: 52,
    related: ["5", "6"],
    lastUpdated: "2024-06-14"
  },
  {
    id: "5",
    question: "Puis-je obtenir un remboursement ?",
    answer: "Oui, nous offrons une garantie de remboursement de 30 jours. Si vous n'êtes pas satisfait de votre achat, contactez notre service client avec votre numéro de commande pour initier le processus de remboursement.",
    category: "Paiement",
    helpful: 41,
    related: ["4", "6"],
    lastUpdated: "2024-06-13"
  },
  {
    id: "6",
    question: "Comment suivre ma commande ?",
    answer: "Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi. Vous pouvez également vous connecter à votre compte et consulter la section 'Mes commandes' pour suivre l'état de livraison en temps réel.",
    category: "Livraison",
    helpful: 29,
    lastUpdated: "2024-06-11"
  },
  {
    id: "7",
    question: "Quels sont les délais de livraison ?",
    answer: "Les délais de livraison varient selon votre localisation : 24-48h en France métropolitaine, 3-5 jours en Europe, et 7-10 jours pour l'international. Nous proposons aussi une livraison express sous 24h pour les commandes urgentes.",
    category: "Livraison",
    featured: true,
    helpful: 67,
    related: ["6", "8"],
    lastUpdated: "2024-06-16"
  },
  {
    id: "8",
    question: "Que faire si mon colis est endommagé ?",
    answer: "Si votre colis arrive endommagé, prenez des photos et contactez immédiatement notre service client. Nous organiserons un retour gratuit et un remplacement ou remboursement selon votre préférence.",
    category: "Livraison",
    helpful: 23,
    lastUpdated: "2024-06-09"
  }
];

function FAQCard({ 
  faq, 
  variant = "accordion",
  isOpen = false,
  onToggle,
  theme = "light"
}: { 
  faq: FAQItem;
  variant?: FAQSectionProps['variant'];
  isOpen?: boolean;
  onToggle?: () => void;
  theme?: "light" | "dark";
}) {
  if (variant === "grid") {
    return (
      <Card className={cn(
        "h-full transition-all duration-300 hover:shadow-lg",
        theme === "dark" && "bg-gray-800 border-gray-700",
        faq.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg leading-tight">{faq.question}</CardTitle>
            {faq.featured && (
              <Badge variant="default" className="ml-2 flex-shrink-0">
                Popular
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className={cn(
            "text-sm leading-relaxed mb-4",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {faq.answer}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              {faq.category && (
                <Badge variant="outline" className="text-xs">
                  {faq.category}
                </Badge>
              )}
              {faq.helpful && (
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  {faq.helpful} utile{faq.helpful > 1 ? 's' : ''}
                </span>
              )}
            </div>
            {faq.lastUpdated && (
              <span>
                Mis à jour le {new Date(faq.lastUpdated).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "detailed") {
    return (
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg",
        theme === "dark" && "bg-gray-800 border-gray-700"
      )}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold leading-tight pr-4">{faq.question}</h3>
            {faq.featured && (
              <Badge variant="default" className="flex-shrink-0">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <div className={cn(
            "prose prose-sm max-w-none mb-4",
            theme === "dark" ? "prose-invert" : ""
          )}>
            <p className={cn(
              "leading-relaxed",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {faq.answer}
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                {faq.category && (
                  <Badge variant="outline">
                    {faq.category}
                  </Badge>
                )}
                {faq.helpful && (
                  <div className="flex items-center text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    {faq.helpful} personnes ont trouvé ceci utile
                  </div>
                )}
              </div>
              
              {faq.author && (
                <div className="text-xs text-gray-500">
                  Par {faq.author.name} • {faq.author.role}
                </div>
              )}
            </div>

            {faq.lastUpdated && (
              <div className="text-xs text-gray-500 mt-2">
                <Clock className="w-3 h-3 inline mr-1" />
                Dernière mise à jour : {new Date(faq.lastUpdated).toLocaleDateString('fr-FR')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default accordion variant
  return (
    <div className={cn(
      "border rounded-lg transition-all duration-300",
      theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white",
      isOpen && "shadow-md"
    )}>
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-medium">{faq.question}</span>
            {faq.featured && (
              <Badge variant="secondary" className="text-xs">
                Popular
              </Badge>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4">
          <div className={cn(
            "text-sm leading-relaxed mb-3",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {faq.answer}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              {faq.category && (
                <Badge variant="outline" className="text-xs">
                  {faq.category}
                </Badge>
              )}
              {faq.helpful && (
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  {faq.helpful} utiles
                </span>
              )}
            </div>
            {faq.lastUpdated && (
              <span>
                {new Date(faq.lastUpdated).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function FAQSection({
  variant = "accordion",
  title = "Questions Fréquentes",
  description = "Trouvez rapidement les réponses aux questions les plus courantes. Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter.",
  faqs = defaultFAQs,
  showSearch = true,
  showCategories = true,
  showStats = true,
  showSupport = true,
  maxVisible,
  className,
  theme = "light",
  onContactSupport
}: FAQSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());
  const [showAll, setShowAll] = React.useState(false);

  // Filter FAQs
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedFAQs = maxVisible && !showAll 
    ? filteredFAQs.slice(0, maxVisible)
    : filteredFAQs;

  const categories = Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)));
  const totalQuestions = faqs.length;
  const totalHelpful = faqs.reduce((acc, faq) => acc + (faq.helpful || 0), 0);
  const featuredQuestions = faqs.filter(faq => faq.featured).length;

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  if (variant === "search") {
    return (
      <section className={cn(
        "py-16",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
        className
      )}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className={cn(
              "text-lg leading-relaxed mb-8",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {description}
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "w-full pl-12 pr-4 py-4 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  theme === "dark" 
                    ? "bg-gray-800 border-gray-700 text-white" 
                    : "bg-white border-gray-300"
                )}
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {displayedFAQs.map((faq) => (
              <FAQCard
                key={faq.id}
                faq={faq}
                variant="accordion"
                isOpen={openItems.has(faq.id)}
                onToggle={() => toggleItem(faq.id)}
                theme={theme}
              />
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className={cn(
                "mb-6",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                Essayez avec d'autres mots-clés ou contactez notre support.
              </p>
              {showSupport && (
                <Button onClick={onContactSupport}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contacter le support
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "categorized") {
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
          {showStats && (
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{totalQuestions}</div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  Questions
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{featuredQuestions}</div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  Populaires
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{totalHelpful}</div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  Avis utiles
                </div>
              </div>
            </div>
          )}

          {/* Categories */}
          {categories.map((category) => {
            const categoryFAQs = faqs.filter(faq => faq.category === category);
            
            return (
              <div key={category} className="mb-12 last:mb-0">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  )}>
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  {category}
                  <Badge variant="outline" className="ml-2">
                    {categoryFAQs.length}
                  </Badge>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryFAQs.map((faq) => (
                    <FAQCard 
                      key={faq.id}
                      faq={faq} 
                      variant="grid"
                      theme={theme}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Support */}
          {showSupport && (
            <div className="text-center mt-12">
              <div className={cn(
                "inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-lg",
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              )}>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold mb-2">Besoin d'aide supplémentaire ?</h3>
                  <p className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  )}>
                    Notre équipe support est là pour répondre à toutes vos questions.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onContactSupport}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button onClick={onContactSupport}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
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
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className={cn(
            "text-lg leading-relaxed",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {description}
          </p>
        </div>

        {/* Search & Filters */}
        {(showSearch || showCategories) && (
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {showSearch && (
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-4 py-2 border rounded-lg",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                />
              </div>
            )}

            {showCategories && (
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "px-4 py-2 text-sm rounded-lg border transition-colors",
                    selectedCategory === "all"
                      ? "bg-blue-600 text-white border-blue-600"
                      : theme === "dark"
                      ? "border-gray-700 text-gray-300 hover:border-gray-600"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  )}
                >
                  Tous
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category || "")}
                    className={cn(
                      "px-4 py-2 text-sm rounded-lg border transition-colors",
                      selectedCategory === category
                        ? "bg-blue-600 text-white border-blue-600"
                        : theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:border-gray-600"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          {displayedFAQs.map((faq) => (
            <FAQCard
              key={faq.id}
              faq={faq}
              variant={variant}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
              theme={theme}
            />
          ))}
        </div>

        {/* Load More */}
        {maxVisible && filteredFAQs.length > maxVisible && !showAll && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(true)}
              className="group"
            >
              Voir toutes les questions ({filteredFAQs.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {/* Support */}
        {showSupport && (
          <div className="text-center mt-12">
            <div className={cn(
              "inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-lg",
              theme === "dark" ? "bg-gray-800" : "bg-gray-50"
            )}>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold mb-2">Vous ne trouvez pas votre réponse ?</h3>
                <p className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  Notre équipe support est disponible pour vous aider.
                </p>
              </div>
              <Button onClick={onContactSupport}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Contacter le support
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export type { FAQSectionProps, FAQItem };
