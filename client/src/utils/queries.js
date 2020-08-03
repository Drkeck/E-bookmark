import gql from 'graphql-tag';

export const ME = gql`
query {
    Me {
      email
      username
      bookCount
      savedBooks {
        bookId
        title
        description
        authors
        image
        bookId
        link
      }
    }
  } 
`;