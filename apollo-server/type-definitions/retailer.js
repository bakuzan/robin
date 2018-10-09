const gql = require('graphql-tag');

module.exports = gql`
  type Retailer {
    id: Int!
    name: String
  }
  input RetailerInput {
    id: Int
    name: String
  }
`;
