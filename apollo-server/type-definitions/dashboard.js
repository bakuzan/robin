const gql = require('graphql-tag');

module.exports = gql`
  type Dashboard {
    aggregates: [DashboardAggregate]
    byMonthCounts: [DashboardCounts]
  }
  type DashboardAggregate {
    label: String
    statistics: [Aggregate]
  }
  type Aggregate {
    label: String
    value: String
  }
  type DashboardCounts {
    name: String
    series: [DashboardCountPoint]
  }
  type DashboardCountPoint {
    name: String
    value: Int
  }
  input DashboardFilters {
    fromDate: String
    toDate: String
  }
`;
