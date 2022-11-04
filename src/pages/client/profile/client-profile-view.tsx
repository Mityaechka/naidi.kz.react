import {AppInput} from '../../../componets/app-input/app-input'
import {formatPhoneNumber} from '../../../helpers/phone-helpers'
import {Gender, Client} from '../../../models/data'
import styled from 'styled-components'
import {AppButton} from '../../../componets/app-input/app-button'

import Avatar from '../../../assets/avatar.png'
import {useNavigate} from 'react-router-dom'
import {device} from '../../../hooks/mediaHook'
import {useEffect, useState} from 'react'
import {useStores} from '../../../store/root-store'
import api from '../../../api'

const ProfileContainer = styled.div`
  display: flex;
  column-gap: 40px;

  @media ${device.mobileOrTablet} {
    flex-direction: column-reverse;
    row-gap: 14px;
  }
`

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`

const AvatarWrapper = styled.img`
  width: 96px;
  height: 96px;
`

export const ClientProfileView = () => {

	const navigator = useNavigate()
	const {app} = useStores()

	app.setTitle('Мои данные')
	app.setSection('my-profile')
	app.clearMenuItems()

	const [client, setClient] = useState<Client | undefined>(undefined)
	useEffect(() => {
		console.log('render')
		api.account.getClient().then(result => {
			if (!result.isSuccess) {
				return
			}

			setClient(result.result)
		})
	}, [])


	return <>
		<ProfileContainer>
			<div>
				<AppInput field="fio" label="ФИО" disabled={true} value={Client.fullName(client)}/>
				<AppInput field="phoneNumber" label="Мобильный телефон" disabled={true}
					value={formatPhoneNumber(client?.phone)}/>
				{/*<AppInput field="birthData" label="Дата рождения" disabled={true}*/}
				{/*          value={client?.birthDate ? moment(client?.birthDate).format("DD.MM.yyyy") : ""}/>*/}

				<AppInput field="gender" label="Пол" disabled={true}
					value={Gender.toNameString(client?.gender) ?? 'Не указан'}/>

				<AppInput field="areaId" label="Область" disabled={true} value={client?.destination?.area?.name?.ru}/>

				<AppInput field="cityId" label="Город" disabled={true} value={client?.destination?.city?.name?.ru}/>

				<AppButton color="yellow" click={() => navigator('/client/profile/edit')}>Редактировать</AppButton>
			</div>
			<AvatarContainer>
				<AvatarWrapper src={Avatar}/>
				<AppButton color="yellow">Добавить фото</AppButton>
			</AvatarContainer>
		</ProfileContainer>

	</>
}