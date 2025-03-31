'use client';
import React, { ReactNode } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

export const Provider = ({ children }: { children: ReactNode }) => {
  const client = new ApolloClient({
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      credentials: 'include',
    }),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
