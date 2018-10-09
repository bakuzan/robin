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
  }
  ${keyFields}
`;

export default {
  keyFields,
  viewFields
};
