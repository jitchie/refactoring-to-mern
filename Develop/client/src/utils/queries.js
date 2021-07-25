import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query allUsers {
    users {
    _id,
    username,
    password,
    email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($id: ID!) {
    user(id : $id) {
        _id,
        username,
        email
    }
  }
`;