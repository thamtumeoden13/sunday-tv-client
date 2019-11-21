import gql from 'graphql-tag';

export const PARISHES = gql`
   query parishes{
        parishes{
            id
            name
            shortName
            published
            deanery{
                id 
                name
            }
        }
    }
`;

export const PARISH_BY_ID = gql`
   query parish($id: ID!){
        parish(id: $id){
            id
            name
            shortName
            published
            diocese{
                id
                name
            }
            deanery{
                id 
                name
            }
        }
    }
`;

export const CREATE_PARISH = gql`
   mutation createParish($name: String!, $shortName: String!, $published: Boolean, $dioceseId: ID!, $deaneryId: ID!) {
    createParish(name: $name, shortName: $shortName, published: $published, dioceseId: $dioceseId, deaneryId: $deaneryId) {
        id
        name
        shortName
        published
    }
  }
`;


export const UPDATE_PARISH_BY_ID = gql`
   mutation updateParish($id: ID!, $name: String!, $shortName: String!, $published: Boolean, $dioceseId: ID!, $deaneryId: ID!) {
    updateParish(id: $id, name: $name, shortName: $shortName, published: $published, dioceseId: $dioceseId, deaneryId: $deaneryId) {
        id
        name
        shortName
        published
    }
  }
`;

export const DELETE_PARISHES = gql`
   mutation deleteParishes($ids: [ID!]) {
    deleteParishes(ids: $ids) {
        count
    }
  }
`;

export const DIOCESES_CACHE = gql`
   query dioceses{
        dioceses{
            id
            name
        }
    } 
`;


export const DEANERIES_BY_DIOCESE = gql`
   query deaneriesByDiocese($dioceseId: ID!) {
        deaneriesByDiocese(dioceseId: $dioceseId){
            id
            name
            deaneries{
                id
                name
            }
        }
    }
`;