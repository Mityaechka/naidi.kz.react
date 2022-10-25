import {MobileLayout} from "../../../componets/layouts/mobile-layout";
import {MobileBar} from "../../../componets/mobile-bar";
import {Block} from "../../../componets/Block";
import {Area, City, Gender, User} from "../../../models/data";
import React, {ForwardedRef, ReactNode, useEffect, useMemo, useState} from "react";
import {values} from "mobx";
import {FieldErrors, FieldValues, useForm, useFormContext} from "react-hook-form";
import styled from "styled-components";
import {AppCheckbox, AppInput, AppSelect, SelectOption} from "../../../componets/app-input/app-input";
import {AppButton} from "../../../componets/app-input/app-button";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {useStores} from "../../../store/root-store";
import {EditUserProfile} from "../../../api/user-api";
import {useNavigate} from "react-router-dom";
import api from "../../../api";


export const UserProfileEdit = () => {
    const {register, watch, handleSubmit, formState: {errors}, setValue, } = useForm();
    const navigate = useNavigate()

    const {app, cache} = useStores();

    const [user, setUser] = useState<User>({} as User)

    const [cities, setCities] = useState<City[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);

    app.setTitle("Редактирование моих данных")
    app.setSection("my-profile")
    app.clearMenuItems()
    const selectedAreaId = watch("areaId");

    const cityOptions = useMemo<SelectOption[]>(() => {
        return cities.filter(city => city.areaId === selectedAreaId).map(city => {
            return {value: city.id, title: city.name.ru}
        });
    }, [cities, selectedAreaId])

    const areaOptions = useMemo<SelectOption[]>(() => areas.map(area => {
        return {value: area.id, title: area.name.ru}
    }), [areas])

    useEffect(() => {
        setValue("firstName", user.firstName)
        setValue("secondName", user.secondName)
        setValue("lastName", user.lastName)
        setValue("gender", user.gender)
        setValue("areaId", user.destination?.area?.id)
        setValue("cityId", user.destination?.city?.id)
    }, [user])


    useEffect(() => {
        const areasPromise = cache.getAllAreas();
        const citiesPromise = cache.getAllCities();
        const userPromise = api.account.getUser();

        app.showLoading()
        Promise.all([areasPromise, citiesPromise, userPromise]).then(result => {
            app.hideLoading()

            const [areasResult, citiesResult, userResult] = result

            if (!areasResult || !citiesResult || !userResult.isSuccess) {
                return
            }

            const newUser = userResult.result!

            setCities(citiesResult)
            setAreas(areasResult)
            setUser(userResult.result!)


        })
    }, [])

    const save = () => {

    }


    const onSubmit = (data: any) => {
        console.log(data)
        api.user.editUserProfile(data as EditUserProfile).then(result => {
            console.log(result)
            navigate("/user/profile/")
        })
        //appState.showLoading()
    };

    return <>
        <>
            {<>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AppInput label="Фамилия"
                              field="firstName"
                              errors={errors}
                              {...register("firstName", {required: "Введите Вашу фамилию"})}/>

                    <AppInput label="Имя" field="secondName"
                              errors={errors}
                              {...register("secondName", {required: "Введите Ваше имя"})}/>

                    <AppInput label="Отчество" field="lastName"
                              errors={errors}
                              {...register("lastName")}/>

                    <AppSelect label="Пол" field="gender"
                               options={[{value: Gender.Male, title: "Муж."}, {value: Gender.Female, title: "Жен."}]}
                               errors={errors}
                               {...register("gender")}/>

                    <AppSelect label="Область" field="areaId"
                               options={areaOptions}
                               errors={errors}
                               emptyOption={true}
                               {...register("areaId")}/>

                    <AppSelect label="Город" field="cityId"
                               value={watch("cityId")}
                               options={cityOptions}
                               errors={errors}
                               emptyOption={true}
                               {...register("cityId")}/>




                    <AppButton type="submit">Сохранить</AppButton>
                </form>
            </>}


        </>
    </>
}