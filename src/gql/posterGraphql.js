import gql from 'graphql-tag';

export const POSTERS = gql`
   query posters{
        posters{
            id
            name
            thumbnail
            image
            category{
                id
                name
            }
        }
    }
`;

export const POSTER_BY_ID = gql`
   query poster($id: ID!){
        poster(id: $id){
            id
            name
            thumbnail
            image
            diocese{
                id
                name
            }
            deanery{
                id 
                name
            }
            parish{
                id
                name
            }
            category{
                id
                name
            }
        }
    }
`;

export const CREATE_POSTER = gql`
   mutation createPoster($input: PosterInput) {
    createPoster(input: $input) {
        id
        name
    }
  }
`;

export const UPDATE_POSTER_BY_ID = gql`
   mutation updatePoster($id: ID!, $input: PosterInput) {
    updatePoster(id: $id, input: $input) {
        id
        name
    }
  }
`;

export const DELETE_POSTERS = gql`
   mutation deletePoster($ids: [ID!]!) {
    deletePoster(ids: $ids) {
        count
    }
  }
`;

export const CATEGORIES_CACHE = gql`
   query categories{
        categories{
            id
            name
        }
    } 
`;
