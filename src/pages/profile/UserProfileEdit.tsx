import {MobileLayout} from "../../componets/layouts/MobileLayout";
import {MobileBar} from "../../componets/MobileBar";
import {Block} from "../../componets/Block";
import {DatePicker, Input, Select, SelectOption} from "../../componets/Input";
import {Area, City, Gender, User} from "../../models/Data";
import React, {ForwardedRef, ReactNode, useEffect, useMemo, useState} from "react";
import {getAreas, getCities} from "../../api/dictionaryApi";
import {values} from "mobx";
import {FieldErrors, FieldValues, useForm, useFormContext} from "react-hook-form";
import styled from "styled-components";
import {AppCheckbox, AppInput, AppSelect} from "../../componets/app-input/AppInput";
import {Button} from "../../componets/Button";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {useStores} from "../../store/RootStore";
import {EditUserProfile, editUserProfile} from "../../api/user-api";
import {getUser} from "../../api/accountApi";
import {useNavigate} from "react-router-dom";


export const UserProfileEdit = () => {
    const {register, watch, handleSubmit, formState: {errors}, setValue, } = useForm();
    const navigate = useNavigate()

    const {appState} = useStores();

    const [user, setUser] = useState<User>({} as User)

    const [cities, setCities] = useState<City[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);

    appState.setTitle("Редактирование моих данных")
    appState.setSection("my-profile")

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
        const areasPromise = getAreas();
        const citiesPromise = getCities();
        const userPromise = getUser();

        appState.showLoading()
        Promise.all([areasPromise, citiesPromise, userPromise]).then(result => {
            appState.hideLoading()

            const [areasResult, citiesResult, userResult] = result

            if (!areasResult.isSuccess || !citiesResult.isSuccess || !userResult.isSuccess) {
                return
            }

            const newUser = userResult.result!

            setCities(citiesResult.result!)
            setAreas(areasResult.result!)
            setUser(userResult.result!)


        })
    }, [])

    const save = () => {

    }


    const onSubmit = (data: any) => {
        console.log(data)
        editUserProfile(data as EditUserProfile).then(result => {
            console.log(result)
            navigate("/user/profile/")
        })
        //appState.showLoading()
    };

    return <>
        <Block>
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