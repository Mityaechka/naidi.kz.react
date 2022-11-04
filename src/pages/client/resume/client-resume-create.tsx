import {useForm} from 'react-hook-form'
import {useStores} from '../../../store/root-store'
import React, {useEffect, useMemo, useState} from 'react'
import {Activity, Area, City, Gender, Client} from '../../../models/data'

import {EditClientProfile} from '../../../api/client-api'
import {Block} from '../../../componets/Block'
import {AppInput, AppSelect, AppTextArea, SelectOption} from '../../../componets/app-input/app-input'
import {AppButton} from '../../../componets/app-input/app-button'
import {CreateResumeData} from '../../../api/resume-api'
import api from '../../../api'
import {log} from 'util'
import {useNavigate} from 'react-router-dom'

export const ClientResumeCreate = () => {
	const {register, watch, handleSubmit, formState: {errors}, setValue,} = useForm()
	const navigation = useNavigate()

	const {app, cache} = useStores()

	app.setTitle('Создание резюме')
	app.setSection('my-resumes')
	app.clearMenuItems()

	const [client, setClient] = useState<Client>({} as Client)

	const [cities, setCities] = useState<City[]>([])
	const [areas, setAreas] = useState<Area[]>([])
	const [activities, setActivities] = useState<Activity[]>([])

	const selectedAreaId = watch('destination.areaId')

	const cityOptions = useMemo<SelectOption[]>(() => {
		return cities.filter(city => city.areaId === selectedAreaId).map(city => {
			return {value: city.id, title: city.name.ru}
		})
	}, [cities, selectedAreaId])

	const areaOptions = useMemo<SelectOption[]>(() => areas.map(area => {
		return {value: area.id, title: area.name.ru}
	}), [areas])

	const activitiesOptions = useMemo<SelectOption[]>(() => activities.map(activity => {
		return {value: activity.id, title: activity.name.ru}
	}), [activities])

	useEffect(() => {
		setValue('destination.areaId', client.destination?.area?.id)
		setValue('destination.cityId', client.destination?.city?.id)
	}, [client])

	useEffect(() => {
		const areasPromise = cache.getAllAreas()
		const citiesPromise = cache.getAllCities()
		const activitiesPromise = cache.getAllActivities()
		const clientPromise = api.account.getClient()

		app.showLoading()
		Promise.all([areasPromise, citiesPromise, activitiesPromise, clientPromise]).then(result => {
			app.hideLoading()

			const [areasResult, citiesResult, activitiesResult, clientResult] = result

			if (!areasResult || !citiesResult || !activitiesResult || !clientResult.isSuccess) {
				return
			}

			setCities(citiesResult)
			setAreas(areasResult)
			setClient(clientResult.result)
			setActivities(activitiesResult)

		})
	}, [])

	const onSubmit = (data: any) => {
		console.log(data)
		api.resume.createResume(data as CreateResumeData).then(result => {
			if (!result.isSuccess) {
				return
			}

			navigation('/client/resumes')
		})
	}

	console.log(activities)
	return <>
		<>
			{<>
				<form onSubmit={handleSubmit(onSubmit)}>

					<AppSelect label="Работа" field="activityId"
						options={activitiesOptions}
						errors={errors}
						emptyOption={true}
						{...register('activityId', {required: 'Выберите работу'})}/>

					<AppSelect label="Область" field="destination.areaId"
						options={areaOptions}
						errors={errors}
						emptyOption={true}
						{...register('destination.areaId')}/>

					<AppSelect label="Город" field="destination.cityId"
						value={watch('destination.cityId')}
						options={cityOptions}
						errors={errors}
						emptyOption={true}
						{...register('destination.cityId')}/>

					<AppTextArea label="О работе" field="description"
						errors={errors}
						{...register('description', {required: 'Напишите о Вашем опыте'})}/>

					<AppButton type="submit">Сохранить</AppButton>
				</form>
			</>}


		</>
	</>
}