import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import FirebaseRedux from './connect/FirebaseRedux';
import { ThemeContextProvider } from './context/Theme';
import { store } from './redux/store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <BrowserRouter>
          <FirebaseRedux>
            <App />
          </FirebaseRedux>
        </BrowserRouter>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
