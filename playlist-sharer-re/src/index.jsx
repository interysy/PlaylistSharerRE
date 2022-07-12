import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';  
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'; 
import { PersistGate } from 'redux-persist/integration/react' 
import { store , persistor } from './redux/store/configureStore'
 

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}> 
      <PersistGate loading = {null} persistor = {persistor} >
        <App /> 
      </PersistGate>
    </Provider>,
  );
reportWebVitals();