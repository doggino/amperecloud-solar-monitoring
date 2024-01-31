export const serviceURL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const graphqlURL = `${serviceURL}/graphql`;
export const uploadURL = `${serviceURL}/upload`;
