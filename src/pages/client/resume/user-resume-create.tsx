import {useForm} from "react-hook-form";
import {useStores} from "../../../store/root-store";
import React, {useEffect, useMemo, useState} from "react";
import {Activity, Area, City, Gender, User} from "../../../models/data";

import {EditUserProfile} from "../../../api/user-api";
import {Block} from "../../../componets/Block";
import {AppInput, AppSelect, AppTextArea, SelectOption} from "../../../componets/app-input/app-input";
import {AppButton} from "../../../componets/app-input/app-button";
import {CreateResumeData} from "../../../api/resume-api";
import api from "../../../api";
import {log} from "util";
import {useNavigate} from "react-router-dom";

export const UserResumeCreate = () => {
    const {register, watch, handleSubmit, formState: {errors}, setValue,} = useForm();
    const navigation = useNavigate()

    const {app, cache} = useStores();

    app.setTitle("Создание резюме")
    app.setSection("my-resumes")
    app.clearMenuItems()

    const [user, setUser] = useState<User>({} as User)

    const [cities, setCities] = useState<City[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);

    const selectedAreaId = watch("destination.areaId");

    const cityOptions = useMemo<SelectOption[]>(() => {
        return cities.filter(city => city.areaId === selectedAreaId).map(city => {
            return {value: city.id, title: city.name.ru}
        });
    }, [cities, selectedAreaId])

    const areaOptions = useMemo<SelectOption[]>(() => areas.map(area => {
        return {value: area.id, title: area.name.ru}
    }), [areas])

    const activitiesOptions = useMemo<SelectOption[]>(() => activities.map(activity => {
        return {value: activity.id, title: activity.name.ru}
    }), [activities])

    useEffect(() => {
        setValue("destination.areaId", user.destination?.area?.id)
        setValue("destination.cityId", user.destination?.city?.id)
    }, [user])

    useEffect(() => {
        const areasPromise = cache.getAllAreas();
        const citiesPromise = cache.getAllCities();
        const activitiesPromise = cache.getAllActivities();
        const userPromise = api.account.getUser();

        app.showLoading()
        Promise.all([areasPromise, citiesPromise, activitiesPromise, userPromise]).then(result => {
            app.hideLoading()

            const [areasResult, citiesResult, activitiesResult, userResult] = result

            if (!areasResult || !citiesResult || !activitiesResult || !userResult.isSuccess) {
                return
            }

            setCities(citiesResult)
            setAreas(areasResult)
            setUser(userResult.result)
            setActivities(activitiesResult)

        })
    }, [])

    const onSubmit = (data: any) => {
        console.log(data)
        api.resume.createResume(data as CreateResumeData).then(result => {
            if (!result.isSuccess) {
                return
            }

            navigation('/user/resumes')
        })
    };

    console.log(activities)
    return <>
        <>
            {<>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <AppSelect label="Работа" field="activityId"
                               options={activitiesOptions}
                               errors={errors}
                               emptyOption={true}
                               {...register("activityId", {required: 'Выберите работу'})}/>

                    <AppSelect label="Область" field="destination.areaId"
                               options={areaOptions}
                               errors={errors}
                               emptyOption={true}
                               {...register("destination.areaId")}/>

                    <AppSelect label="Город" field="destination.cityId"
                               value={watch("destination.cityId")}
                               options={cityOptions}
                               errors={errors}
                               emptyOption={true}
                               {...register("destination.cityId")}/>

                    <AppTextArea label="О работе" field="description"
                                 errors={errors}
                                 {...register("description", {required: 'Напишите о Вашем опыте'})}/>

                    <AppButton type="submit">Сохранить</AppButton>
                </form>
            </>}


        </>
    </>
}