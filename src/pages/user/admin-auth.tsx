import {AppInput} from '../../componets/app-input/app-input'
import {AppButton} from '../../componets/app-input/app-button'
import styled from 'styled-components'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {redirect, useNavigate} from 'react-router-dom'
import {isEmail} from '../../helpers/forms'
import {useStores} from '../../store/root-store'
import api from '../../api'
import {AuthModel} from '../../api/admin-api'

const AuthWrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`

const AuthContainer = styled.form`
  align-items: center;
  display: flex;
  justify-content: center;
`
export const AdminAuth = () => {
	const {app, user} = useStores()
	const navigate = useNavigate()
	const {register, handleSubmit, formState: {errors}} = useForm()

	const submit = (data: any) => {
		app.withLoading(api.admin.auth(data as AuthModel)).then(result => {
			debugger
			if (!result.isSuccess) {
				return
			}

			user.setJwt(result.result)
			navigate('/admin')
		})
	}

	return <AuthContainer onSubmit={handleSubmit(submit)}>
		<AuthWrapper>
			<h1>Авторизация</h1>
			<p>Чтобы продолжить работу необходимо авторизоваться</p>

			<AppInput field="email"
				label="Почта"
				errors={errors}
				{...register('email', {required: 'Введите вашу почту', ...isEmail('Введите вашу почту')})}/>
			<AppInput field="password"
				label="Пароль"
				type="password"
				errors={errors}
				{...register('password', {required: 'Введите пароль'})}       />

			<AppButton type="submit" color="yellow" fullWidth={false}>Продолжить</AppButton>
		</AuthWrapper>
	</AuthContainer>
}