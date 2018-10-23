class DashboardAggregate {
  average: number;
  minimum: number;
  maximum: number;
}

export default class Dashboard {
  aggregates: DashboardAggregate[] = [];
}
