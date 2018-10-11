import gql from 'graphql-tag';

const keyFields = gql`
  fragment SeriesKeyFields on Series {
    id
    name
  }
`;

const viewFields = gql`
  fragment SeriesViewFields on Series {
    ...SeriesKeyFields
    type
    volumeCount
    volumes(sort: NUMBER_DESC) {
      id
      number
      releaseDate
      boughtDate
      rrp
      paid
      usedDiscountCode
      retailerId
    }
  }
  ${keyFields}
`;

export default {
  keyFields,
  viewFields
};
