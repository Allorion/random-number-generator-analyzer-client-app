import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import ListRoutes from './ListRoutes';

const store = setupStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ListRoutes />
    </Provider>
  </StrictMode>
);
