import gql from 'graphql-tag'

export const LOGIN_USER = gql`
mutation login ($email: String!, $password: String!){
  login(email: $email, password: $password) {
    token
    user {
      username
      _id
      savedBooks{
        bookId
        title
      }
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($email: String!, $username: String!, $password: String!){
  addUser(email: $email, username: $username, password: $password){
    token
    user {
      _id
      username
    }
  }
}
`
export const ADD_BOOK = gql`
mutation addBook($input: bookInput! ){
	addBook(input: $input) {
  	email
    username
    bookCount
    _id
  	savedBooks{
  		title
    	authors
    	bookId
      description
      link
      image
    }
  }
}
`;
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId){
    savedBooks {
      title
      bookId
      description
    }
    username
  }
}
`;

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};