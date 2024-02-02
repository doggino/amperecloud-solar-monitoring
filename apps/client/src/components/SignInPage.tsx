import React, { useEffect, useContext } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { UserWithToken } from '../../../__generated__/graphql';
import { AuthContext } from './Layout';
import { useNavigate } from 'react-router-dom';

interface SignInInput {
  email: string;
  password: string;
}

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      email
      id
      name
      token
    }
  }
`;

interface SignInMutationResponse {
  signIn: UserWithToken;
}

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInInput>();
  const [signIn, { data }] = useMutation<SignInMutationResponse, SignInInput>(
    SIGN_IN_MUTATION
  );
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);

  useEffect(() => {
    if (data && data.signIn) {
      localStorage.setItem('token', data.signIn.token);
      setAuth({
        id: data.signIn.id,
        name: data.signIn.name,
        email: data.signIn.email,
      });
      navigate('/');
    }
  }, [data]);

  const onSubmit: SubmitHandler<SignInInput> = async (formData) => {
    try {
      await signIn({
        variables: formData,
      });
    } catch (err) {
      setError('email', { message: 'Email or Password is not correct' });
      setError('password', { message: 'Email or Password is not correct' });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2">Sign In</Typography>
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              {...register('email', { required: true })}
              {...(errors.email && {
                error: true,
                helperText: errors.email.message || 'This field is required',
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              fullWidth
              {...register('password', { required: true })}
              {...(errors.password && {
                error: true,
                helperText: errors.password.message || 'This field is required',
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained">
              SIGN IN
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignInPage;
