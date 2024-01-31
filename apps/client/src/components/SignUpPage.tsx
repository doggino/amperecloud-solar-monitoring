import React, { useEffect, useContext } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { UserWithToken } from 'apps/__generated__/graphql';
import { AuthContext } from './Layout';
import { useNavigate } from 'react-router-dom';

interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

const SIGN_UP_MUTATION = gql`
  mutation SignUpMutation($email: String!, $name: String!, $password: String!) {
    signUp(email: $email, name: $name, password: $password) {
      email
      id
      name
      token
    }
  }
`;

interface SignUpMutationResponse {
  signUp: UserWithToken;
}

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpInput>();
  const [signUp, { data }] = useMutation<SignUpMutationResponse, SignUpInput>(
    SIGN_UP_MUTATION
  );
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.signUp) {
      localStorage.setItem('token', data.signUp.token);
      setAuth({
        id: data.signUp.id,
        name: data.signUp.name,
        email: data.signUp.email,
      });
      navigate('/');
    }
  }, [data]);

  const onSubmit: SubmitHandler<SignUpInput> = async (formData) => {
    try {
      await signUp({
        variables: formData,
      });
    } catch (err) {
      setError('email', { message: 'Email is already taken' });
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
      <Typography variant="h2">Sign Up</Typography>
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              {...register('name', { required: true })}
              {...(errors.name && {
                error: true,
                helperText: errors.name.message || 'This field is required',
              })}
            />
          </Grid>
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
              SIGN UP
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpPage;
