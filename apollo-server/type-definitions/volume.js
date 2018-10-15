const gql = require('graphql-tag');

module.exports = gql`
  type Volume {
    id: Int!
    number: Int!
    releaseDate: String
    boughtDate: String
    rrp: Float
    paid: Float
    usedDiscountCode: Boolean
    retailerId: Int
    retailer: Retailer
    series: Series
  }
  input VolumeFilter {
    type: SeriesType
    fromDate: String
    toDate: String
  }
  input VolumeInput {
    id: Int
    number: Int
    releaseDate: String
    boughtDate: String
    rrp: Float
    paid: Float
    usedDiscountCode: Boolean
    retailerId: Int
    retailer: RetailerInput
    seriesId: Int
  }
`;
