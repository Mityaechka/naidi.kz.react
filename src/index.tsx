import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import "@fontsource/roboto";
import Modal from 'react-modal';
import {DefaultTheme, ThemeProvider} from 'styled-components';
import {useMedia} from "./hooks/mediaHook";
import {RootStore, StoreContext} from "./store/RootStore";
import moment from "moment";

const root = ReactDOM.createRoot(document.getElementById('root')!);
Modal.setAppElement('#root');


export const theme: DefaultTheme = {
    colors: {
        yellow: '#F9CF21',
        white: '#ffffff',
        black: '#000000',
        gray: "#f6f5f5"
    },
    m24: '',
    m8: '',
    m16: '',
};

moment.locale('ru');

root.render(
    <>
        <ThemeProvider theme={theme}>
            <StoreContext.Provider value={new RootStore()}>
                <RouterProvider router={routes}/>
            </StoreContext.Provider>
        </ThemeProvider>
    </>
);
