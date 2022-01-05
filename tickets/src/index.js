import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { FirebaseRedux } from './connect/FirebaseRedux';
import { store } from './redux/store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <FirebaseRedux>
        <BrowserRouter>
          <App />
        </BrowserRouter>  
      </FirebaseRedux>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);