"use client";

import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { 
  Calendar,
  Clock,
  User,
  MapPin,
  Tag,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Heart,
  Share2,
  MessageCircle
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  image?: string;
  featured?: boolean;
  likes?: number;
  comments?: number;
}

interface BlogSectionProps {
  variant?: "grid" | "list" | "masonry" | "featured" | "minimal" | "magazine";
  title: string;
  subtitle?: string;
  posts: BlogPost[];
  showAuthor?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showMeta?: boolean;
  showExcerpt?: boolean;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  onPostClick?: (post: BlogPost) => void;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
}

function BlogCard({ 
  post, 
  variant = "default",
  showAuthor = true,
  showCategory = true,
  showTags = false,
  showMeta = true,
  showExcerpt = true,
  onPostClick
}: {
  post: BlogPost;
  variant?: string;
  showAuthor?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showMeta?: boolean;
  showExcerpt?: boolean;
  onPostClick?: (post: BlogPost) => void;
}) {
  if (variant === "minimal") {
    return (
      <div className="group cursor-pointer" onClick={() => onPostClick?.(post)}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
            {showMeta && (
              <>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min</span>
              </>
            )}
          </div>
          <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          {showExcerpt && (
            <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
          )}
          {showAuthor && (
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                {post.author.avatar ? (
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                ) : (
                  <AvatarFallback className="text-xs">{post.author.name[0]}</AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm text-gray-600">{post.author.name}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer" 
            onClick={() => onPostClick?.(post)}>
        <CardContent className="p-0">
          <div className="flex gap-6">
            {post.image && (
              <div className="w-48 h-32 flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
            )}
            <div className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-3">
                {showCategory && (
                  <Badge variant="secondary">{post.category}</Badge>
                )}
                {post.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              {showExcerpt && (
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {showAuthor && (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        {post.author.avatar ? (
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        ) : (
                          <AvatarFallback className="text-sm">{post.author.name[0]}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{post.author.name}</div>
                        {post.author.role && (
                          <div className="text-xs text-gray-500">{post.author.role}</div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {showMeta && (
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                  {post.likes && (
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                  )}
                  {post.comments && (
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 cursor-pointer",
      post.featured && "border-yellow-400 ring-2 ring-yellow-400/20"
    )} onClick={() => onPostClick?.(post)}>
      <CardContent className="p-0">
        {post.image && (
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {post.featured && (
              <Badge className="absolute top-3 left-3 bg-yellow-100 text-yellow-800">
                Vedette
              </Badge>
            )}
            {showCategory && (
              <Badge className="absolute top-3 right-3" variant="secondary">
                {post.category}
              </Badge>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {!post.image && showCategory && (
              <Badge variant="secondary">{post.category}</Badge>
            )}
            {!post.image && post.featured && (
              <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
            )}
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {showExcerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
          )}

          {showTags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            {showAuthor && (
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  {post.author.avatar ? (
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  ) : (
                    <AvatarFallback className="text-sm">{post.author.name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{post.author.name}</div>
                  {post.author.role && (
                    <div className="text-xs text-gray-500">{post.author.role}</div>
                  )}
                </div>
              </div>
            )}
            
            {showMeta && (
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {post.likes && (
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
              )}
              {post.comments && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
              )}
            </div>
            
            <Button variant="ghost" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Lire
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BlogSection({
  variant = "grid",
  title,
  subtitle,
  posts,
  showAuthor = true,
  showCategory = true,
  showTags = false,
  showMeta = true,
  showExcerpt = true,
  columns = 3,
  className,
  onPostClick,
  showLoadMore = false,
  onLoadMore
}: BlogSectionProps) {
  if (variant === "featured") {
    const featuredPost = posts.find(p => p.featured) || posts[0];
    const otherPosts = posts.filter(p => p.id !== featuredPost.id).slice(0, 4);

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
            <div className="lg:col-span-1">
              <BlogCard
                post={featuredPost}
                showAuthor={showAuthor}
                showCategory={showCategory}
                showTags={showTags}
                showMeta={showMeta}
                showExcerpt={showExcerpt}
                onPostClick={onPostClick}
              />
            </div>
            
            <div className="space-y-6">
              {otherPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  variant="minimal"
                  showAuthor={showAuthor}
                  showCategory={showCategory}
                  showMeta={showMeta}
                  showExcerpt={showExcerpt}
                  onPostClick={onPostClick}
                />
              ))}
            </div>
          </div>

          {showLoadMore && (
            <div className="text-center">
              <Button onClick={onLoadMore} size="lg">
                Voir plus d'articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "magazine") {
    const featuredPost = posts[0];
    const secondaryPosts = posts.slice(1, 3);
    const otherPosts = posts.slice(3);

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
              <BlogCard
                post={featuredPost}
                showAuthor={showAuthor}
                showCategory={showCategory}
                showTags={showTags}
                showMeta={showMeta}
                showExcerpt={showExcerpt}
                onPostClick={onPostClick}
              />
            </div>
            
            <div className="space-y-6">
              {secondaryPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  variant="list"
                  showAuthor={showAuthor}
                  showCategory={showCategory}
                  showMeta={showMeta}
                  showExcerpt={showExcerpt}
                  onPostClick={onPostClick}
                />
              ))}
            </div>
          </div>

          {otherPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  showAuthor={showAuthor}
                  showCategory={showCategory}
                  showTags={showTags}
                  showMeta={showMeta}
                  showExcerpt={showExcerpt}
                  onPostClick={onPostClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "list") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="space-y-8">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                variant="list"
                showAuthor={showAuthor}
                showCategory={showCategory}
                showTags={showTags}
                showMeta={showMeta}
                showExcerpt={showExcerpt}
                onPostClick={onPostClick}
              />
            ))}
          </div>

          {showLoadMore && (
            <div className="text-center mt-12">
              <Button onClick={onLoadMore} size="lg">
                Charger plus d'articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
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
            {posts.map((post) => (
              <div key={post.id} className="break-inside-avoid">
                <BlogCard
                  post={post}
                  showAuthor={showAuthor}
                  showCategory={showCategory}
                  showTags={showTags}
                  showMeta={showMeta}
                  showExcerpt={showExcerpt}
                  onPostClick={onPostClick}
                />
              </div>
            ))}
          </div>

          {showLoadMore && (
            <div className="text-center mt-12">
              <Button onClick={onLoadMore} size="lg">
                Voir plus d'articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
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
          columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
        )}>
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              showAuthor={showAuthor}
              showCategory={showCategory}
              showTags={showTags}
              showMeta={showMeta}
              showExcerpt={showExcerpt}
              onPostClick={onPostClick}
            />
          ))}
        </div>

        {showLoadMore && (
          <div className="text-center mt-12">
            <Button onClick={onLoadMore} size="lg">
              Voir plus d'articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
