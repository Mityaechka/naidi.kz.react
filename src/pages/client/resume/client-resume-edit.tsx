import {useForm, useWatch} from "react-hook-form";
import {useStores} from "../../../store/root-store";
import React, {useEffect, useMemo, useState} from "react";
import {Activity, Area, City, Gender, Resume, Client} from "../../../models/data";
import {Block} from "../../../componets/Block";
import {AppInput, AppSelect, AppTextArea, SelectOption} from "../../../componets/app-input/app-input";
import {AppButton} from "../../../componets/app-input/app-button";
import api from "../../../api";
import {CreateResumeData, resumeApi} from "../../../api/resume-api";
import {useNavigate, useParams} from "react-router-dom";

export const ClientResumeEdit = () => {
    const {register, watch, handleSubmit, formState: {errors}, setValue, control} = useForm({});
    const {resumeId} = useParams();
    const {app, cache} = useStores();
    const navigation = useNavigate()
    
    app.setTitle("Редактирование резюме")
    app.setSection("my-resumes")
    app.clearMenuItems()

    const [cities, setCities] = useState<City[]>([]);
    const [resume, setResume] = useState<Resume | undefined>(undefined);
    const [areas, setAreas] = useState<Area[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);

    const selectedAreaId = useWatch({control, name: "destination.areaId"});

    const areaOptions = useMemo<SelectOption[]>(() => areas.map(area => {
        return {value: area.id, title: area.name.ru}
    }), [areas])

    const cityOptions = useMemo<SelectOption[]>(() => {
        return cities.filter(x => x.areaId == selectedAreaId).map(area => {
            return {value: area.id, title: area.name.ru}
        });
    }, [cities, selectedAreaId])

    const activitiesOptions = useMemo<SelectOption[]>(() => activities.map(activity => {
        return {value: activity.id, title: activity.name.ru}
    }), [activities])

    useEffect(() => {
            if (!resume) {
                return
            }
            console.log("set form values", resume.destination.city)
            setValue("activityId", resume.activity.id)
            setValue("destination.areaId", resume.destination.area?.id)
            setValue("destination.cityId", resume.destination.city?.id)
            setValue("description", resume.description)
        },
        [resume])

    useEffect(() => {
        const areasPromise = cache.getAllAreas();
        const citiesPromise = cache.getAllCities();
        const activitiesPromise = cache.getAllActivities();
        const resumePromise = api.resume.getClientResume(resumeId!)

        app.showLoading()
        Promise.all([areasPromise, citiesPromise, activitiesPromise, resumePromise]).then(result => {
            app.hideLoading()

            const [areasResult, citiesResult, activitiesResult, resumeResult] = result

            if (!areasResult || !citiesResult || !activitiesResult || !resumeResult.isSuccess) {
                return
            }

            setCities(citiesResult)
            setAreas(areasResult)
            setActivities(activitiesResult)
            setResume(resumeResult.result)
        })
    }, [])


    const onSubmit = (data: any) => {
        console.log(data)
        api.resume.editResume(resumeId as string, data as CreateResumeData).then(result => {
            if (!result.isSuccess) {
                return
            }

            navigation('/client/resumes')
        })
        //appState.showLoading()
    };

    return <>
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
}