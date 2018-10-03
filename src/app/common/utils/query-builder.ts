export const createApolloServerPayload = (gqlQuery, variables) => {
  const query = gqlQuery.loc.source.body;
  const operationName = query
    .replace(/.*?(?= )/, '')
    .replace(/[({].*/, '')
    .trim();
  console.log('apollo query prep', query, variables);
  return {
    operationName,
    query,
    variables
  };
};
