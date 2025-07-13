import BaseService from '@/shared/lib/services/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';
import type { DashboardLayout, WidgetConfig, DashboardWidgetTemplate } from './dashboard.schema';

export const dashboardService = new BaseService(API_ENDPOINTS.dashboard.base);
export const widgetService = new BaseService(API_ENDPOINTS.widgets.base);
export const widgetTemplateService = new BaseService(API_ENDPOINTS.widgetTemplates.base);
