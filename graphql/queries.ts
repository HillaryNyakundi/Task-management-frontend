import { gql } from '@apollo/client';

export const GET_TASKS_QUERY = gql`
  query getTasks {
    getTasks {
      id
      title
      description
      status
    }
  }
`;

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
    }
  }
`;
