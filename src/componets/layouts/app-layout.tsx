import {observer} from 'mobx-react'
import {LoadingSpinner} from '../loading-spinner'
import {Outlet} from 'react-router-dom'
import {useStores} from '../../store/root-store'
import ReactModal from 'react-modal'
import {useEffect} from 'react'
import api from '../../api'
import {UserRole} from '../../models/user-data'
import {RoleProvider} from '../roles/RoleContext'

export const AppLayout = observer(() => {
	const {app, client, modal, user} = useStores()

	useEffect(() => {
		api.account.getClient().then(result => {
			if (result.isSuccess) {
				client.setClient(result.result)
			} else {
				client.setClient(undefined)
			}
		})
	}, [])

	return <>
		<RoleProvider role={user.user?.role ?? UserRole.None}>
			{app.loading && <LoadingSpinner/>}

			{modal.isOpen && <ReactModal
				isOpen={modal.isOpen}
				style={modal.style}>
				{modal.child}
			</ReactModal>
			}

			<Outlet/>
		</RoleProvider>
	</>
})