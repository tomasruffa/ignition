import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation registerUser($name: String!, $email: String!, $password: String! ){
  signup(name: $name, email: $email, password: $password) {
    token
  }
}
`;

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!){
  login(email: $email, password: $password) {
    token
  }
}
`;

export const GET_FEED = gql`
query {
  feed(take: 10, skip: 1) {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
}
`;
