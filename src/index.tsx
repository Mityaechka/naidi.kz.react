import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import {routes} from './routes'
import '@fontsource/roboto'
import Modal from 'react-modal'
import {DefaultTheme, ThemeProvider} from 'styled-components'
import {useMedia} from './hooks/mediaHook'
import {RootStore, StoreContext} from './store/root-store'
import moment from 'moment'
import '@szhsin/react-menu/dist/index.css'
import {observable} from 'mobx'
import {RoleProvider} from './componets/roles/RoleContext'
import {UserRole} from './models/user-data'

const root = ReactDOM.createRoot(document.getElementById('root')!)
Modal.setAppElement('#root')


export const theme: DefaultTheme = {
	colors: {
		yellow: '#F9CF21',
		white: '#ffffff',
		black: '#000000',
		gray: '#f6f5f5'
	},
	m24: '',
	m8: '',
	m16: '',
}

moment.locale('ru')

export const App = observable(() => {
	return <>
		<RouterProvider router={routes}/>
	</>
})

root.render(
	<>
		<ThemeProvider theme={theme}>
			<StoreContext.Provider value={new RootStore()}>
				<RouterProvider router={routes}/>
			</StoreContext.Provider>
		</ThemeProvider>
	</>
)


