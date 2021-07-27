const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        username: String
        email: String
        
    }
    
    type Auth {
        token: ID
        user: User
    }

    type Book {
        authors: [String]
        description: String
        bookId: ID
        image: String
        link: String
        title: String
    }

    
    type Query {
        me: User
    }
    type Mutation {
        createUser(
            username: String!
            email: String! 
            password: String!
            ): Auth
            login(email: String!, password: String!): Auth
            saveBook(bookId: String!, authors: [String]!, title: String!, image: String!, description: String!, link: String!):User
            removeBook(bookId: String!): User
    }

`;

module.exports = typeDefs;
