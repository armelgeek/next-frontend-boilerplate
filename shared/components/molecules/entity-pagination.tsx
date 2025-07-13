'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface EntityPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
}

export function EntityPagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  totalItems,
  itemsPerPage,
  className = '',
}: EntityPaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const pages = [];
    
    // Toujours afficher la première page
    pages.push(1);
    
    // Calculer la plage autour de la page actuelle
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);
    
    // Ajouter "..." si nécessaire avant la plage
    if (start > 2) {
      pages.push('...');
    }
    
    // Ajouter les pages de la plage
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }
    
    // Ajouter "..." si nécessaire après la plage
    if (end < totalPages - 1) {
      pages.push('...');
    }
    
    // Toujours afficher la dernière page (si différente de la première)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 ${className}`}>
      {showInfo && totalItems && itemsPerPage && (
        <div className="text-sm text-gray-600">
          Affichage de {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} à{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems} résultats
        </div>
      )}
      
      <div className="flex items-center space-x-1">
        {/* Bouton précédent */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Page précédente"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        {/* Pages */}
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </span>
            );
          }
          
          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;
          
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        
        {/* Bouton suivant */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Page suivante"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
