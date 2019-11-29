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
   mutation createDiocese($input: DioceseInput) {
    createDiocese(input: $input) {
        id
        name
        shortName
        published
    }
  }
`;

export const UPDATE_DIOCESE_BY_ID = gql`
   mutation updateDiocese($id: ID! $input: DioceseInput) {
    updateDiocese(id: $id, input: $input) {
        id
        name
        shortName
        published
    }
  }
`;

export const DELETE_DIOCESES = gql`
   mutation deleteDioceses($ids: [ID!]!) {
    deleteDioceses(ids: $ids) {
        count
    }
  }
`;
