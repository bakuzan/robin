export const createApolloServerPayload = (gqlQuery, variables) => {
  const query = gqlQuery.loc.source.body;
  const [withOpName] = query.includes('(')
    ? query.split('(')
    : query.split('{');

  const operationName = withOpName
    .trim()
    .split(' ')
    .pop();

  return {
    operationName: operationName ? operationName.trim() : undefined,
    query,
    variables
  };
};
