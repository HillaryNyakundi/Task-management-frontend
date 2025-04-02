'use client';
import React, { ReactNode } from 'react';
//const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

export const Provider = ({ children }: { children: ReactNode }) => {
  const client = new ApolloClient({
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_BACKEND_URL,
      credentials: 'include',
    }),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
