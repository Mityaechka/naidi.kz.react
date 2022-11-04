import {useNavigate, useParams} from 'react-router-dom'
import {useStores} from '../../../store/root-store'
import {useForm} from 'react-hook-form'
import {AppInput, AppSelect} from '../../../componets/app-input/app-input'
import {User, UserRole} from '../../../models/user-data'
import {AppButton} from '../../../componets/app-input/app-button'
import {isEmail} from '../../../helpers/forms'
import {showAlert} from '../../../componets/modals/AlertModal'
import {CreateUserModel, EditUserModel} from '../../../api/admin-api'
import api from '../../../api'
import {useEffect, useState} from 'react'
import {useApiCall} from '../../../hooks/usePromises'
import {appLoading} from '../../../store/app-state-store'

export const UsersEdit = ({}: {}) => {
	const navigation = useNavigate()
	const {cache, app, modal} = useStores()
	const {register, watch, handleSubmit, formState: {errors}, setValue} = useForm()

	const {userId} = useParams()

	const [user, userFetch] = useApiCall(undefined, api.admin.getUser(userId as string), appLoading(app))


	useEffect(() => {
		if(!user){
			return
		}
		console.log(user)

		setValue('fio', user.fio)
		setValue('role', user.role)

	}, [user])
	app.setSection('moderation-users')

	const save = (data: any) => {
		console.log(data)
		app.withLoading(api.admin.editUser(userId as string,data as EditUserModel)).then(result => {
			if (!result.isSuccess) {
				return
			}

			navigation('/admin/users')
		})
	}


	return <form onSubmit={handleSubmit(save)}>
		<AppInput field="fio"
			label="ФИО"
			errors={errors}
			{...register('fio', {required: 'Укажите ФИО пользователя'})} />

		<AppSelect field="role"
			label="Роль"
			errors={errors}
			options={UserRole.options()}
			{...register('role', {required: 'Укажите роль пользователя'})}
		/>
		<AppButton type="submit" color="yellow">Сохранить</AppButton>
	</form>
}