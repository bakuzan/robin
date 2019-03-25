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

export default class Dashboard {
  aggregates: IDashboardAggregate;
  byMonthCounts: IDashboardMonthCounts[] = [];
  proportions: IDashboardProportions[] = [];
}
