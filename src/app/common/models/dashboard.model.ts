import Aggregate from './aggregate.model';

class DashboardAggregate {
  label: string;
  statistics: Aggregate[] = [];
}

export default class Dashboard {
  aggregates: DashboardAggregate;
}
