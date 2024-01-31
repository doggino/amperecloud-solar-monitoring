import React, { Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import client from './client';
import Layout from './components/Layout';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import FacilitiesPage from './components/FacilitiesPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <main>
          <Suspense
            fallback={
              <Box
                component="div"
                sx={{
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Layout>
              <Routes>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/" element={<FacilitiesPage />} />
              </Routes>
            </Layout>
          </Suspense>
        </main>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
