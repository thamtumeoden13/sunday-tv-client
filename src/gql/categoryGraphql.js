import gql from 'graphql-tag';

export const CATEGORIES = gql`
   query categories{
        categories{
            id
            name
            title
            content
            published
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
        }
    }
`;

export const CATEGORY_BY_ID = gql`
   query category($id: ID!){
        category(id: $id){
            id
            name
            title
            content
            published
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
        }
    }
`;

export const CREATE_CATEGORY = gql`
   mutation createCategory($name: String!, $title: String, $content: String, $published: Boolean, $dioceseId: ID!, $deaneryId: ID!, $parishId: ID!) {
    createCategory(name: $name, title: $title, content: $content, published: $published, dioceseId: $dioceseId, deaneryId: $deaneryId, parishId: $parishId) {
        id
        name
        title
        content
        published
    }
  }
`;

export const UPDATE_CATEGORY_BY_ID = gql`
   mutation updateCategory($id: ID!, $name: String!, $title: String, $content: String, $published: Boolean, $dioceseId: ID!, $deaneryId: ID! $parishId: ID!) {
    updateCategory(id: $id, name: $name, title: $title, content: $content, published: $published, dioceseId: $dioceseId, deaneryId: $deaneryId, parishId: $parishId) {
        id
        name
        title
        content
        published
    }
  }
`;

export const DELETE_CATEGORIES = gql`
   mutation deleteCategories($ids: [ID!]) {
    deleteCategories(ids: $ids) {
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

export const PARISHES_BY_DEANERY = gql`
   query parishesByDeanery($deaneryId: ID!) {
        parishesByDeanery(deaneryId: $deaneryId){
            id
            name
            parishes{
                id
                name
            }
        }
    }
`;