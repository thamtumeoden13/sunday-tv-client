import gql from 'graphql-tag';

export const DIOCESES = gql`
   query dioceses{
        dioceses{
            id
            name
            shortName
            published
        }
    }
`;

export const DELETE_DIOCESES = gql`
   mutation deleteDioceses($ids: [ID!]) {
    deleteDioceses(ids: $ids) {
        count
    }
  }
`;

export const DIOCESE_BY_ID = gql`
   query diocese($id: ID!){
        diocese(id: $id){
            id
            name
            shortName
            published
        }
    }
`;

export const CREATE_DIOCESE = gql`
   mutation createDiocese($name: String!,$shortName: String!, $published: Boolean) {
    createDiocese(name: $name, shortName: $shortName, published: $published) {
        id
        name
        shortName
        published
    }
  }
`;

export const UPDATE_DIOCESE_BY_ID = gql`
   mutation updateDiocese($id: ID! $name: String!,$shortName: String!, $published: Boolean) {
    updateDiocese(id: $id, name: $name, shortName: $shortName, published: $published) {
        id
        name
        shortName
        published
    }
  }
`;

export const DEANERIES = gql`
   query deaneries{
        deaneries{
            id
            name
            shortName
            published
            diocese{
                id 
                name
                shortName
            }
        }
    }
`;

export const DELETE_DEANERIES = gql`
   mutation deleteDeaneries($ids: [ID!]) {
    deleteDeaneries(ids: $ids) {
        count
    }
  }
`;

export const CREATE_DEANERY = gql`
   mutation createDeanery($name: String!,$shortName: String!, $published: Boolean, $dioceseId: ID!) {
    createDeanery(name: $name, shortName: $shortName, published: $published, dioceseId: $dioceseId) {
        id
        name
        shortName
        published
    }
  }
`;

export const DEANERY_BY_ID = gql`
   query deanery($id: ID!){
        deanery(id: $id){
            id
            name
            shortName
            published
            diocese{
                id
                name
            }
        }
    }
`;

export const UPDATE_DEANERY_BY_ID = gql`
   mutation updateDeanery($id: ID! $name: String!,$shortName: String!, $published: Boolean, $dioceseId: ID!) {
    updateDeanery(id: $id, name: $name, shortName: $shortName, published: $published, dioceseId: $dioceseId) {
        id
        name
        shortName
        published
    }
  }
`;
