import React from 'react'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie'

export function saveToken (token) {
  Cookies.set('Authorization', token)
}

export function getToken () {
  const token = Cookies.get('Authorization')
  return token ?? '';
}

export function removeToken () {
  Cookies.remove('Authorization')
  return;
}

const httpLink = createHttpLink({
    uri: "http://api.vrmarketing.guru/",
  });

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export default client;