import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

import 'antd/dist/antd.css';
import AppComponent from './App';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  
  uri: 'https://e-learning-backend-ygx1.onrender.com/graphql',
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <AppComponent />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'));