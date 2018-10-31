import Aggregate from './aggregate.model';

class DashboardAggregate {
  label: string;
  statistics: Aggregate[] = [];
}

class DashboardCounts {
  name: string;
  series: DashboardCountPoint[] = [];
}

class DashboardCountPoint {
  name: string;
  value: number;
}

export default class Dashboard {
  aggregates: DashboardAggregate;
  byMonthCounts: DashboardCounts[];
}
