import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from 'react-query'
import { AuthProvider } from './context/Auth-context';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

const queryClient = new QueryClient()
const pkg = require("../package.json");
axios.defaults.baseURL = process.env.PORT ? pkg.remote : pkg.localhost;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
