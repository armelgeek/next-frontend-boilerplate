'use client';

import React, { useState } from 'react';
import { DashboardBuilder } from '@/shared/components/organisms/dashboard/dashboard-builder';
import { DashboardGrid } from '@/shared/components/molecules/dashboard/dashboard-grid-simple';
import { Button } from '@/shared/components/atoms/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Plus, Eye } from 'lucide-react';
import { mockDashboards, mockWidgetData, mockLoadingStates, mockErrors } from '@/features/dashboard/dashboard.mock';
import type { DashboardLayout } from '@/features/dashboard/dashboard.schema';

export default function DashboardTestPage() {
  const [dashboards, setDashboards] = useState<DashboardLayout[]>(mockDashboards);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardLayout | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const handleSaveDashboard = (layout: DashboardLayout) => {
    if (layout.id) {
      // Mettre à jour un dashboard existant
      setDashboards(prev => prev.map(d => d.id === layout.id ? layout : d));
    } else {
      // Créer un nouveau dashboard
      const newDashboard = {
        ...layout,
        id: `dashboard-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setDashboards(prev => [...prev, newDashboard]);
    }
    setIsBuilderOpen(false);
    setSelectedDashboard(null);
  };

  const handleEditDashboard = (dashboard: DashboardLayout) => {
    setSelectedDashboard(dashboard);
    setIsBuilderOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedDashboard(null);
    setIsBuilderOpen(true);
  };

  if (isBuilderOpen) {
    return (
      <DashboardBuilder
        initialLayout={selectedDashboard || undefined}
        onSave={handleSaveDashboard}
        onCancel={() => {
          setIsBuilderOpen(false);
          setSelectedDashboard(null);
        }}
      />
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Builder Demo</h1>
          <p className="text-muted-foreground">
            Créez et gérez vos dashboards personnalisés
          </p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Dashboard
        </Button>
      </div>

      {/* Liste des dashboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dashboards.map(dashboard => (
          <Card key={dashboard.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">{dashboard.name}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditDashboard(dashboard);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {dashboard.description}
              </p>
              
              {/* Aperçu miniature */}
              <div className="border rounded-lg p-2 bg-muted/20">
                <DashboardGrid
                  layout={dashboard}
                  widgets={dashboard.widgets}
                  widgetData={mockWidgetData}
                  isLoading={mockLoadingStates}
                  errors={mockErrors}
                  isEditMode={false}
                />
              </div>
              
              <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                <span>{dashboard.widgets.length} widget(s)</span>
                <span>{dashboard.columns} colonne(s)</span>
                {dashboard.isDefault && (
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
                    Par défaut
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Exemple en pleine page */}
      {dashboards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Exemple de dashboard en pleine page</CardTitle>
            <p className="text-sm text-muted-foreground">
              Aperçu du premier dashboard en taille réelle
            </p>
          </CardHeader>
          <CardContent>
            <DashboardGrid
              layout={dashboards[0]}
              widgets={dashboards[0].widgets}
              widgetData={mockWidgetData}
              isLoading={mockLoadingStates}
              errors={mockErrors}
              isEditMode={false}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
