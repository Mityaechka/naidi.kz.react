import {MobileLayout} from "../componets/layouts/MobileLayout";
import {MobileBar} from "../componets/MobileBar";
import {Block} from "../componets/Block";
import {DatePicker, Input, Select, SelectOption} from "../componets/Input";
import {Area, City, Gender} from "../models/Data";
import {useStores} from "../store/AppStateStore";
import React, {ForwardedRef, ReactNode, useEffect, useMemo, useState} from "react";
import {getAreas, getCities} from "../api/dictionaryApi";
import {values} from "mobx";
import {FieldErrors, FieldValues, useForm, useFormContext} from "react-hook-form";
import styled from "styled-components";
import {AppCheckbox, AppInput, AppSelect} from "../componets/AppInput/AppInput";
import {Button} from "../componets/Button";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;


export const UserProfileEdit = () => {
    const {register, watch, handleSubmit, formState: {errors}} = useForm();

    const {appState} = useStores();

    const [cities, setCities] = useState<City[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);

    const selectedAreaId = watch("area");

    const cityOptions = useMemo<SelectOption[]>(() =>
        cities.filter(city => city.areaId === selectedAreaId).map(city => {
            return {value: city.id, title: city.name}
        }), [cities, selectedAreaId])

    const areaOptions = useMemo<SelectOption[]>(() => areas.map(area => {
        return {value: area.id, title: area.name}
    }), [cities, selectedAreaId])


    useEffect(() => {
        const areasPromise = getAreas();
        const citiesPromise = getCities();

        appState.showLoading()
        Promise.all([areasPromise, citiesPromise]).then(result => {
            appState.hideLoading()

            const [areasResult, citiesResult] = result

            if (!areasResult.isSuccess || !citiesResult.isSuccess) {
                return
            }

            setCities(citiesResult.result!)
            setAreas(areasResult.result!)
        })
    }, [])

    const save = () => {
    }


    const onSubmit = (data: any) => {
        appState.showLoading()
    };

    return <MobileLayout top={<MobileBar title="Мои данные"/>}>
        <Block>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AppInput label="Фамилия" field="firstName"
                          errors={errors}
                          {...register("firstName", {required: "Введите Вашу фамилию"})}/>

                <AppInput label="Имя" field="secondName"
                          errors={errors}
                          {...register("secondName", {required: "Введите Ваше имя"})}/>

                <AppInput label="Отчество" field="middleName"
                          errors={errors}
                          {...register("middleName")}/>

                <AppSelect label="Пол" field="gender"
                           options={[{value: Gender.Male, title: "Муж."}, {value: Gender.Female, title: "Жен."}]}
                           errors={errors}
                           {...register("gender")}/>

                <AppSelect label="Область" field="area"
                           options={areaOptions}
                           errors={errors}
                           emptyOption={true}
                           {...register("area")}/>

                <AppSelect label="Город" field="city"
                           options={cityOptions}
                           errors={errors}
                           emptyOption={true}
                           {...register("city")}/>

                <Button type="submit">Сохранить</Button>
            </form>


        </Block>
    </MobileLayout>
}