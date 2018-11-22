import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import './assets/styling.css';
import './bootstrap/dist/css/bootstrap.css';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['message']
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)


let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
     </PersistGate>
    </BrowserRouter>
  </Provider>,
	document.getElementById('root')
);
registerServiceWorker();
