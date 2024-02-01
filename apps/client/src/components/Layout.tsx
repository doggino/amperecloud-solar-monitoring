import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
import { Maybe, User } from '../../../__generated__/graphql';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const signOut = () => {
    setAuth(null);
    localStorage.removeItem('token');
  };

  return (
    <AppBar component="header" position="fixed">
      <Toolbar>
        <Link to="/">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AmpereCloud
          </Typography>
        </Link>
        {auth ? (
          <>
            <Button onClick={signOut}>Sign Out</Button>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <Button color="inherit">Sign In</Button>
            </Link>
            <Link to="/sign-up">
              <Button color="inherit">Sign Up</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      name
      email
    }
  }
`;

export interface GetProfileQueryResponse {
  profile: Maybe<User>;
}

export interface IAuthContext {
  auth: Maybe<User>;
  setAuth: (auth: Maybe<User>) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  auth: null,
  setAuth: () => {},
});

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    data: { profile },
  } = useSuspenseQuery<GetProfileQueryResponse>(GET_PROFILE);
  const [auth, setAuth] = useState<Maybe<User>>(profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth && location.pathname === '/') {
      navigate('/sign-in');
    }
  }, [auth]);

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Header />
        <Container style={{ marginTop: '70px' }}>{children}</Container>
      </AuthContext.Provider>
    </React.Fragment>
  );
};

export default Layout;
