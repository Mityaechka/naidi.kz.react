import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import {RootStore, StoreContext} from "./store/AppStateStore";
import "@fontsource/roboto";
import Modal from 'react-modal';
import {DefaultTheme, ThemeProvider} from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root')!);
Modal.setAppElement('#root');



export const theme: DefaultTheme = {
    colors: {
        yellow: '#F9CF21',
        white: '#ffffff',
        black: '#000000',
        gray: "#f5f5f5"
    },
    m24: '',
    m8: '',
    m16: '',
};


root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <StoreContext.Provider value={new RootStore()}>
                <RouterProvider router={routes}/>
            </StoreContext.Provider>
        </ThemeProvider>
    </React.StrictMode>
);
