import gql from 'graphql-tag';

const keyFields = gql`
  fragment SeriesKeyFields on Series {
    id
    name
  }
`;

const volumeFields = gql`
  fragment VolumeFields on Volume {
    id
    number
    releaseDate
    boughtDate
    rrp
    paid
    usedDiscountCode
    retailerId
  }
`;

const viewFields = gql`
  fragment SeriesViewFields on Series {
    ...SeriesKeyFields
    type
    volumeCount
    volumes(sort: NUMBER_DESC) {
      ...VolumeFields
    }
  }
  ${keyFields}
  ${volumeFields}
`;

export default {
  keyFields,
  viewFields,
  volumeFields
};
