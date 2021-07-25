const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        
    }

    type Book {
        authors: String!
        description: String!
        bookId: ID!
        link: String!
        title: String! 
    }

    type Query {
        books:[Book],
        users:[User],
        
    }

    type Mutation {
        createUser($username: String!, $email: String! $password: String!): User

    }

`;

module.exports = typeDefs;
