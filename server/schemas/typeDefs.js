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
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type query {
    me: User    
}

type Auth {
    token: ID
    user: [User]
}

type Mutation {
    login:(email: String!, password: String!): Auth
    addUser:(email: String!, password: String!, username: String!): Auth
}
`;
module.exports = typeDefs;