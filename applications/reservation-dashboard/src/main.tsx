import "reflect-metadata";
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import "./styles.css"
import App from './app/app';
import { Provider } from './providers';
import { dependencyInjectionSetup } from './dependency-injection/setup';

dependencyInjectionSetup();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
);
