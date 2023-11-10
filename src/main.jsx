import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@/styles/app.scss'
import '@/styles/player.scss'

// Redux
import store, {persistor} from "./stores/index.js";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {HashRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </HashRouter>
    </React.StrictMode>,
)
