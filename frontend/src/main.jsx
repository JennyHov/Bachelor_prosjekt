import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Redux/stores/store.js'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './js/keyboard_eventlistener.js'
import './index.css'

const Main = () => {
  useEffect(() => {
    // Event listener-skriptet kjøres automatisk når det importeres
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);