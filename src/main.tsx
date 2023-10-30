import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/app.scss'
import './styles/player.scss'

// Redux
import store, {persistor} from "./stores";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
    </React.StrictMode>,
)
