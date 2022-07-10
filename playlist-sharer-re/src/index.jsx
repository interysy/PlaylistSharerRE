import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';  
import { Provider } from 'react-redux'
import { createStore } from 'redux' 
import combined_reducers from './redux/reducers/combine_reducers' 
import { createRoot } from 'react-dom/client';
 
 
const redux_store = createStore(combined_reducers , 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); 
 
const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={redux_store}>
      <App />
    </Provider>,
  );
reportWebVitals();