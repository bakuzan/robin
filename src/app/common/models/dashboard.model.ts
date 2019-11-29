import Aggregate from './aggregate.model';

interface IDashboardAggregate {
  label: string;
  statistics: Aggregate[];
}

interface IDashboardCounts {
  name: string;
  series: IDashboardCountPoint[];
}

export interface IDashboardMonthCounts extends IDashboardCounts {
  label: string;
}

interface IDashboardCountPoint {
  name: string;
  value: number;
}

interface IDashboardProportions {
  label: string;
  data: IDashboardCounts[];
}

export interface IDashboard {
  aggregates: IDashboardAggregate;
  byMonthCounts: IDashboardMonthCounts[];
  proportions: IDashboardProportions[];
}

export default class Dashboard implements IDashboard {
  aggregates: IDashboardAggregate;
  byMonthCounts: IDashboardMonthCounts[] = [];
  proportions: IDashboardProportions[] = [];
}
