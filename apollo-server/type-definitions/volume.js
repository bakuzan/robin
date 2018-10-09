const gql = require('graphql-tag');

module.exports = gql`
  type Volume {
    id: Int!
    number: Int
    releaseDate: String
    boughtDate: String
    rrp: Float
    paid: Float
    retailerId: Int
    retailer: Retailer
  }
  input VolumeInput {
    id: Int
    number: Int
    releaseDate: String
    boughtDate: String
    rrp: Float
    paid: Float
    retailerId: Int
    retailer: RetailerInput
  }
`;
