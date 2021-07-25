import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String! $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
        username,
        email,
        password
    }
}
`;

// export const ADD_BOOK = gql`
//   mutation addSkill($profileId: ID!, $skill: String!) {
//     addSkill(profileId: $profileId, skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;
