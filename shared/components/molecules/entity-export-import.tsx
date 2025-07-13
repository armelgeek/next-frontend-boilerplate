'use client';

import { useState } from 'react';
import { Download, Upload, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '../atoms/ui/button';

interface BaseEntity {
  id: string;
  [key: string]: any;
}

interface EntityExportImportProps<T extends BaseEntity> {
  entities: T[];
  onImport?: (data: T[]) => Promise<void>;
  entityName: string;
  filename?: string;
  className?: string;
}

export function EntityExportImport<T extends BaseEntity>({
  entities,
  onImport,
  entityName,
  filename,
  className = '',
}: EntityExportImportProps<T>) {
  const [isImporting, setIsImporting] = useState(false);

  // Export JSON
  const exportJSON = () => {
    const dataStr = JSON.stringify(entities, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `${entityName}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export CSV
  const exportCSV = () => {
    if (entities.length === 0) return;
    
    const headers = Object.keys(entities[0]);
    const csvContent = [
      headers.join(','),
      ...entities.map(entity => 
        headers.map(header => {
          const value = entity[header];
          // Échapper les guillemets et virgules
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename?.replace('.json', '.csv') || `${entityName}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import JSON/CSV
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onImport) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      let data: T[];

      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        data = JSON.parse(text);
      } else if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        // Simple CSV parser
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        data = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',');
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header.trim()] = values[index]?.trim() || '';
            });
            return obj;
          });
      } else {
        throw new Error('Format de fichier non supporté');
      }

      await onImport(data);
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      alert('Erreur lors de l\'import du fichier');
    } finally {
      setIsImporting(false);
      // Reset input
      event.target.value = '';
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Export buttons */}
      <Button
        variant="outline"
        size="sm"
        onClick={exportJSON}
        disabled={entities.length === 0}
      >
        <FileText className="h-4 w-4 mr-1" />
        JSON
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={exportCSV}
        disabled={entities.length === 0}
      >
        <FileSpreadsheet className="h-4 w-4 mr-1" />
        CSV
      </Button>

      {/* Import button */}
      {onImport && (
        <div className="relative">
          <input
            type="file"
            accept=".json,.csv"
            onChange={handleImport}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isImporting}
          />
          <Button
            variant="outline"
            size="sm"
            disabled={isImporting}
          >
            <Upload className="h-4 w-4 mr-1" />
            {isImporting ? 'Import...' : 'Importer'}
          </Button>
        </div>
      )}
    </div>
  );
}
