const gql = require('graphql-tag');

module.exports = gql`
  type Dashboard {
    aggregates: [DashboardAggregate]
  }
  type DashboardAggregate {
    label: String
    average: Float
    minimum: Float
    maximum: Float
  }
`;
