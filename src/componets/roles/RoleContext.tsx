import {UserRole} from '../../models/user-data'
import {createContext, ReactNode, useContext} from 'react'

type RoleContextType = {
    isAllowedTo: (role: UserRole) => boolean;
}

// Default behaviour for the Permission Provider Context
// i.e. if for whatever reason the consumer is used outside of a provider.
// The permission will not be granted unless a provider says otherwise
const defaultBehaviour: RoleContextType = {
	isAllowedTo: () => false
}

// Create the context
export const RoleContext = createContext<RoleContextType>(defaultBehaviour)

export const RoleProvider = ({role, children}: { role: UserRole, children: ReactNode }) => {

	// Creates a method that returns whether the requested permission is available in the list of permissions
	// passed as parameter
	const isAllowedTo = (r: UserRole) => r==role

	// This component will render its children wrapped around a PermissionContext's provider whose
	// value is set to the method defined above
	return <RoleContext.Provider value={
		{
			isAllowedTo
		}
	}>
		{
			children
		}
	</RoleContext.Provider>
}

export const Only = ({to, children}: { to: UserRole, children: ReactNode }) => {

	// We "connect" to the provider thanks to the PermissionContext
	const {isAllowedTo} = useContext(RoleContext)

	// If the user has that permission, render the children
	if (isAllowedTo(to)) {
		return <>{children}</>
	}

	// Otherwise, do not render anything
	return null
}