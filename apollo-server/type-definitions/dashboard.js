const gql = require('graphql-tag');

module.exports = gql`
  type Dashboard {
    aggregates: [DashboardAggregate]
    byMonthCounts: [DashboardMonthCounts]
    proportions: [DashboardProportion]
  }
  type DashboardAggregate {
    label: String
    statistics: [Aggregate]
  }
  type Aggregate {
    label: String
    value: String
  }
  type DashboardMonthCounts {
    label: String
    name: String
    series: [DashboardCountPoint]
  }
  type DashboardCounts {
    name: String
    series: [DashboardCountPoint]
  }
  type DashboardCountPoint {
    name: String
    value: Float
  }
  type DashboardProportion {
    label: String
    data: [DashboardCounts]
  }
  input DashboardFilters {
    fromDate: String
    toDate: String
  }
`;
