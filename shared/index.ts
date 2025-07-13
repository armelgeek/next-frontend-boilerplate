// Hooks génériques pour les entités
export { useEntityQuery } from './hooks/use-entity-query';
export { useEntityActions } from './hooks/use-entity-actions';
export { useEntityStore } from './hooks/use-entity-store';
export { useEntityListParams } from './hooks/use-entity-list-params';
export { 
  useEntityList, 
  useEntityDetail, 
  useEntitySearch 
} from './hooks/use-entity-query';

// Composants génériques pour les entités
export { EntityCard } from './components/molecules/entity-card';
export { EntityList } from './components/molecules/entity-list';
export { EntitySearch } from './components/molecules/entity-search';
export { EntityPagination } from './components/molecules/entity-pagination';
export { EntityForm } from './components/molecules/entity-form';
export { EntityFilters } from './components/molecules/entity-filters';
export { SortableHeader } from './components/molecules/sortable-header';
export { EntityPage } from './components/organisms/entity-page';
export { EntityDetailPage } from './components/organisms/entity-detail-page';

// Types utiles
export type { FilterOption } from './components/molecules/entity-filters';
export type { EntityListParams } from './hooks/use-entity-list-params';
