import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { AUTH_TOKEN } from '../constant/config'
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
const SIGNIN = gql`
   mutation signIn($email: String!,$password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
          id
          email
      }
    }
  }
`;

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignInComponent = (props) => {
    const classes = useStyles();
    const [errors, setErrors] = useState({})

    const [stateInput, setStateInput] = useState({ email: "", password: "" })

    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN,
        {
            onCompleted(...params) {
                if (params && params[0] && params[0].signIn) {
                    localStorage.setItem(AUTH_TOKEN, params[0].signIn.token);
                    client.writeData({ data: { isLoggedIn: true } });
                    const { from } = props.location.state || { from: { pathname: '/' } }
                    props.history.push(from)
                    // < Redirect to = '/' />
                }
            },
            onError(error) {
                console.log('onError', error)
                alert(error)
            }
        }
    );

    const onSignIn = async () => {
        const { email, password } = stateInput
        if (email && password) {
            signIn({ variables: { email: email, password: password } });
        }
        else {
            let errors = {}
            if (!email)
                errors.email = "email error"
            if (!password)
                errors.password = "password error"

            setErrors(errors);
        }
    }

    const onChangeInput = (e) => {
        setStateInput({ ...stateInput, [e.target.id]: e.target.value })
        setErrors({ ...errors, [e.target.id]: "" })
    }

    if (loading) return <p>Loading....</p>;;
    // if (error) return <p>An error occurred</p>;

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            // required
                            fullWidth
                            id="email"
                            label={errors.email ? errors.email : "Email"}
                            name="email"
                            // autoComplete="email"
                            autoFocus
                            value={stateInput.email}
                            onChange={(e) => onChangeInput(e)}
                            error={!!errors.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            // required
                            fullWidth
                            name="password"
                            label={errors.password ? errors.password : "Password"}
                            type="password"
                            id="password"
                            // autoComplete="current-password"
                            value={stateInput.password}
                            onChange={(e) => onChangeInput(e)}
                            error={!!errors.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSignIn}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );

}
export default SignInComponent;