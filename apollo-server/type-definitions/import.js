const gql = require('graphql-tag');

module.exports = gql`
  type ImportResponse {
    success: Boolean
    messages: [String]
  }
  input ImportInput {
    series: Series
    number: Int
    rrp: Int
    paid: Int
    boughtDate: String
    retailer: Retailer
  }
`;
