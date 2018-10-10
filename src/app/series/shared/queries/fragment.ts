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
      number
      releaseDate
      boughtDate
      rrp
      paid
      retailerId
    }
  }
  ${keyFields}
`;

export default {
  keyFields,
  viewFields
};
