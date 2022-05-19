import { ApolloClient, HttpLink, from } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "https://apollo-usherpoint-backend.herokuapp.com/",
});

// if get error log on console.
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// If you provide a link chain to ApolloClient, you don't provide the `uri` option.
// Initialize Apollo Client
export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
