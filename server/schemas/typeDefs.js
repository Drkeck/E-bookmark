const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
}

type Book {
    authors: [String]
    # authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type Query {
    Me: User    
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, username: String!): Auth
    addBook(author: String!, title: String!, description: String!, bookId: String!, link: String!, image: String!): User
    removeBook(bookId: String!): User
}

type Auth {
    token: ID
    user: User
}
`;
module.exports = typeDefs;