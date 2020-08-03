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

input bookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

type Query {
    Me: User    
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, username: String!): Auth
    addBook(input: bookInput): User
    removeBook(bookId: String!): User
}

type Auth {
    token: ID
    user: User
}
`;
module.exports = typeDefs;