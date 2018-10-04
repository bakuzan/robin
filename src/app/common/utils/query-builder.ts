export const createApolloServerPayload = (gqlQuery, variables) => {
  const query = gqlQuery.loc.source.body;
  const [_, withOpName] = query.split(' ');
  const [operationName] = withOpName.split('(');

  return {
    operationName: operationName ? operationName.trim() : undefined,
    query,
    variables
  };
};
