import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($title: String!, $description: String!, $status: String!) {
    createTask(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!, $title: String, $description: String, $status: String) {
    updateTask(id: $id, title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;
