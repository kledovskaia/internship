import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import FirebaseRedux from './connect/FirebaseRedux';
import { ThemeContextProvider } from './context/Theme';
import { store } from './redux/store';
import { Loader } from './components/Loader/Loader';
import { Toaster } from './components/Toaster/Toaster';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <BrowserRouter>
          <FirebaseRedux>
            <>
              <Loader />
              <Toaster />
              <App />
            </>
          </FirebaseRedux>
        </BrowserRouter>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
