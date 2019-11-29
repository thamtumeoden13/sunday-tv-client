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

export const CREATE_DEANERY = gql`
   mutation createDeanery($input: DeaneryInput) {
    createDeanery(input: $input) {
        id
        name
        shortName
        published
    }
  }
`;


export const UPDATE_DEANERY_BY_ID = gql`
   mutation updateDeanery($id: ID!, $input: DeaneryInput) {
    updateDeanery(id: $id, input: $input) {
        id
        name
        shortName
        published
    }
  }
`;

export const DELETE_DEANERIES = gql`
   mutation deleteDeaneries($ids: [ID!]!) {
    deleteDeaneries(ids: $ids) {
        count
    }
  }
`;
