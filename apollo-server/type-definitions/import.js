const gql = require('graphql-tag');

module.exports = gql`
  type ImportResponse {
    success: Boolean
    messages: [String]
  }
  input ImportInput {
    series: SeriesInput
    number: Int
    rrp: Float
    paid: Float
    boughtDate: String
    retailer: RetailerInput
  }
`;
