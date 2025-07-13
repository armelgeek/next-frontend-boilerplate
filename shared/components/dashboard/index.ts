// Dashboard Builder Components
export { DashboardBuilder } from '../organisms/dashboard/dashboard-builder';
export { DashboardViewer } from '../organisms/dashboard/dashboard-viewer';

// Dashboard Grid Components  
export { DashboardGrid } from '../molecules/dashboard/dashboard-grid-simple';
export { WidgetRenderer } from '../molecules/dashboard/widget-renderer';

// Widget Components
export { StatsWidget } from '../molecules/dashboard/stats-widget';
export { ChartWidget } from '../molecules/dashboard/chart-widget';
export { ListWidget } from '../molecules/dashboard/list-widget';

// Types & Schemas
export type {
  DashboardLayout,
  WidgetConfig,
  WidgetType,
  ChartType,
  WidgetSize
} from '@/features/dashboard/dashboard.schema';

// Hooks
export {
  useDashboards,
  useDashboardActions,
  useWidgets,
  useWidgetActions
} from '@/features/dashboard/hooks/use-dashboard';

// Services
export { dashboardService } from '@/features/dashboard/dashboard.service';

// Mock Data for Testing
export {
  mockDashboards,
  mockWidgetData,
  mockLoadingStates,
  mockErrors
} from '@/features/dashboard/dashboard.mock';
