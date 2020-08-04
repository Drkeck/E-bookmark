import gql from 'graphql-tag';

export const Me = gql`
{
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