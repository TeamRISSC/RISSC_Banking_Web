import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from 'react-query'
import { AuthProvider } from './context/Auth-context';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import axios from "axios";

const queryClient = new QueryClient()

const pkg = require("../package.json");

axios.get(pkg.localhost)
      .then((res) => {
          if(res.status === 200) {
            axios.defaults.baseURL = pkg.localhost;
            console.log('localhost exists')
          }
          else {
            axios.defaults.baseURL = pkg.remote;
            console.log('localhost does not exist')
          }})
      .catch((err) => {            
            axios.defaults.baseURL = pkg.remote;
            console.log('localhost does not exist')})

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
