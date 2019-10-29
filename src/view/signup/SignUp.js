import React from 'react';
import SignUpComponent from '../../component/SignUp';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SIGNUP = gql`
   mutation signUp($email: String!,$password: String!) {
    signUp(email: $email, password: $password) {
      id
      email
    }
  }
`;

const SignUpScreen = (props) => {
    const [signUp, { data }] = useMutation(SIGNUP);

    const onSignUp = (email, password) => {
        console.log({ email, password })
        // signUp({ variables: { email: email, password: password } });
    }

    return (
        <SignUpComponent onSignUp={onSignUp} id="1" />
    );
}
export default SignUpScreen;