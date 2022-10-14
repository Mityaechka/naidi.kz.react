import {useForm} from "react-hook-form";
import {useStores} from "../../store/RootStore";
import React, {useEffect, useMemo, useState} from "react";
import {Activity, Area, City, Gender, User} from "../../models/Data";
import {SelectOption} from "../../componets/Input";
import {getActivities, getAreas, getCities} from "../../api/dictionaryApi";
import {getUser} from "../../api/accountApi";
import {EditUserProfile, editUserProfile} from "../../api/user-api";
import {Block} from "../../componets/Block";
import {AppInput, AppSelect} from "../../componets/app-input/AppInput";
import {Button} from "../../componets/Button";

export const UserResumeCreate = () =>
{
    const {register, watch, handleSubmit, formState: {errors}, setValue, } = useForm();

    const {appState} = useStores();

    appState.setTitle("Создание резюме")
    appState.setSection("my-resumes")

    const [user, setUser] = useState<User>({} as User)

    const [cities, setCities] = useState<City[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);

    const selectedAreaId = watch("areaId");

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
        setValue("areaId", user.destination?.area?.id)
        setValue("cityId", user.destination?.city?.id)
    }, [user])

    useEffect(() => {
        const areasPromise = getAreas();
        const citiesPromise = getCities();
        const activitiesPromise = getActivities();
        const userPromise = getUser();

        appState.showLoading()
        Promise.all([areasPromise, citiesPromise,activitiesPromise, userPromise]).then(result => {
            appState.hideLoading()

            const [areasResult, citiesResult, activitiesResult, userResult] = result

            if (!areasResult.isSuccess || !citiesResult.isSuccess || !activitiesResult.isSuccess || !userResult.isSuccess) {
                return
            }

            setCities(citiesResult.result)
            setAreas(areasResult.result)
            setUser(userResult.result)
            setActivities(activitiesResult.result)

        })
    }, [])

    const onSubmit = (data: any) => {
        console.log(data)
        editUserProfile(data as EditUserProfile).then(console.log)
        //appState.showLoading()
    };

    console.log(activities)
    return <>
        <Block>
            {<>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <AppSelect label="Работа" field="activityId"
                               options={activitiesOptions}
                               errors={errors}
                               emptyOption={true}
                               {...register("activityId")}/>

                    <AppSelect label="Область" field="areaId"
                               options={areaOptions}
                               errors={errors}
                               emptyOption={true}
                               {...register("areaId")}/>

                    <AppSelect label="Город" field="cityId"
                               options={cityOptions}
                               errors={errors}
                               emptyOption={true}
                               {...register("cityId")}/>

                    <Button type="submit">Сохранить</Button>
                </form>
            </>}


        </Block>
    </>
}