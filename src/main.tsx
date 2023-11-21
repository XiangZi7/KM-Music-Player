/* react-app */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

/* react-router */
import { HashRouter } from 'react-router-dom'

/* react-redux */
import store, { persistor } from "@/stores/index.ts"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
)
