export const createApolloServerPayload = (gqlQuery, variables) => {
  const query = gqlQuery.loc.source.body;
  const [withOpName] = query.split('(');
  const operationName = withOpName.split(' ').pop();

  return {
    operationName: operationName ? operationName.trim() : undefined,
    query,
    variables
  };
};
