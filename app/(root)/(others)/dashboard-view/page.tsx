'use client';

import React from 'react';
import { DashboardViewer } from '@/shared/components/dashboard';
import { mockDashboards } from '@/features/dashboard/dashboard.mock';

export default function DashboardViewPage() {
  return (
    <div className="container mx-auto p-6">
      <DashboardViewer
        dashboardId="dashboard-1" // ID du premier dashboard mock
        dashboards={mockDashboards}
        isEditable={true}
        onEdit={() => {
          console.log('Éditer le dashboard');
          // Ici vous pouvez rediriger vers le builder
        }}
      />
    </div>
  );
}
