const gql = require('graphql-tag');

module.exports = gql`
  type ExportResponse {
    success: Boolean
    messages: [String]
    data: String
  }
`;
