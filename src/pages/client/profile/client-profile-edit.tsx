import {MobileLayout} from "../../../componets/layouts/mobile-layout";
import {MobileBar} from "../../../componets/mobile-bar";
import {Block} from "../../../componets/Block";
import {Area, City, Gender, Client} from "../../../models/data";
import React, {ForwardedRef, ReactNode, useEffect, useMemo, useState} from "react";
import {values} from "mobx";
import {FieldErrors, FieldValues, useForm, useFormContext} from "react-hook-form";
import styled from "styled-components";
import {AppCheckbox, AppInput, AppSelect, SelectOption} from "../../../componets/app-input/app-input";
import {AppButton} from "../../../componets/app-input/app-button";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {useStores} from "../../../store/root-store";
import {EditClientProfile} from "../../../api/client-api";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import {usePromises} from "../../../hooks/usePromises";


export const ClientProfileEdit = () => {
    const {register, watch, handleSubmit, formState: {errors}, setValue, } = useForm();
    const navigate = useNavigate()

    const {app, cache} = useStores();

    const [client, setClient] = useState<Client>({} as Client)

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
        setValue("firstName", client.firstName)
        setValue("secondName", client.secondName)
        setValue("lastName", client.lastName)
        setValue("gender", client.gender)
        setValue("areaId", client.destination?.area?.id)
        setValue("cityId", client.destination?.city?.id)
    }, [client])


    useEffect(() => {
        app.withLoading(Promise.all([cache.getAllAreas(), cache.getAllCities(), api.account.getClient()]))
            .then(result => {

            const [areasResult, citiesResult, clientResult] = result

            if (!areasResult || !citiesResult || !clientResult.isSuccess) {
                return
            }


            setCities(citiesResult)
            setAreas(areasResult)
            setClient(clientResult.result!)


        })
    }, [])

    const save = () => {

    }


    const onSubmit = (data: any) => {
        console.log(data)
        api.client.editClientProfile(data as EditClientProfile).then(result => {
            console.log(result)
            navigate("/client/profile/")
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