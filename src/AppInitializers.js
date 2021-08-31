import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import theme from './theme';
import { DataProvider } from './context/DataContext';

const queryClient = new QueryClient();

const AppInitializers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <DataProvider>{children}</DataProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

AppInitializers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppInitializers;
