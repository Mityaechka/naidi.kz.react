import {useNavigate} from 'react-router-dom'
import {useStores} from '../../../store/root-store'
import {useForm} from 'react-hook-form'
import {AppInput, AppSelect} from '../../../componets/app-input/app-input'
import {UserRole} from '../../../models/user-data'
import {AppButton} from '../../../componets/app-input/app-button'
import {isEmail} from '../../../helpers/forms'
import {showAlert} from '../../../componets/modals/AlertModal'
import {CreateUserModel} from '../../../api/admin-api'
import api from '../../../api'

export const UsersCreate = ({}: {}) => {
	const navigation = useNavigate()
	const {cache, app, modal} = useStores()
	const {register, watch, handleSubmit, formState: {errors}} = useForm()

	app.setSection('moderation-users')

	const save = (data: any) =>
	{
		console.log(data)
		app.withLoading(api.admin.createUser(data as CreateUserModel)).then(result => {
			if(!result.isSuccess){
				return
			}

			navigation('/admin/users')
		})
	}

	return <form onSubmit={handleSubmit(save)}>
		<AppInput field="email"
			label="Почта"
			errors={errors}
			{...register('email', {
				required: 'Укажите почту', ...isEmail('Введие почту в корректном формате')
			})} />

		<AppInput field="fio"
			label="ФИО"
			errors={errors}
			{...register('fio', {required: 'Укажите ФИО пользователя'})} />

		<AppInput field="password"
			label="Пароль"
			errors={errors}
			{...register('password', {
				required: 'Введите пароль',
				minLength: {value: 8, message: 'Минимальная длинна 8 символов'}
			})} />

		<AppSelect field="role"
			label="Роль"
			errors={errors}
			options={UserRole.options()}
			{...register('role', {required: 'Укажите роль пользователя'})}
		/>
		<AppButton type="submit" color="yellow">Сохранить</AppButton>
	</form>
}