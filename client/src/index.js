import React from 'react';
import ReactDOM from 'react-dom/client';
import { SearchContextProvider } from './context/searchContext';
import App from './App';
import { RegisterContextProvider } from './context/RegisterContext';
import { AuthContextProvider } from './context/AuthContext.js';
import RegisterContext from './context/RegisterContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <RegisterContextProvider>
    <AuthContextProvider>
      <SearchContextProvider>
       <App />
      </SearchContextProvider>
    </AuthContextProvider>
    </RegisterContextProvider>
</React.StrictMode>
);