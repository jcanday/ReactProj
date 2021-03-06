import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './Theme/themes';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {Marvel,Dashboard} from './components';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth'
import { firebaseConfig } from './firebaseConfig';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <ThemeProvider theme={theme}> 
          <Router>
            <Routes>  
              <Route path='/' element={<Marvel title  ={'Marvel'} sub = {'Marvelous Out Here'}/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </FirebaseAppProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
