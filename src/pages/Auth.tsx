import {IconButton} from "../componets/MobileBar";

import BackIcon from "../assets/icons/back-btn-icon.png"
import CloseIcon from "../assets/icons/close-btn-icon.png"
import Logo from "../assets/logo.png"
import {Button, ButtonStroke} from "../componets/Button";
import {Block, FlexContainer} from "../componets/Block";
import React, {ReactNode, useMemo, useRef, useState} from "react";
import {useMedia} from "../hooks/mediaHook";
import {useNavigate} from "react-router-dom";
import {Checkbox, Input} from "../componets/Input";
import {Typography} from "../componets/Typography";
import {MobileStretchContainer} from "../componets/layouts/MobileLayout";
import VerificationInput from "react-verification-input";
import MaskedInput from 'react-text-mask'
import styled from "styled-components";
import {checkPhone, checkVerificationSms, getUser, login, register, sendVerificationSms} from "../api/accountApi";
import {api} from "../api/api";
import {AppCheckbox, CheckboxLabel} from "../componets/app-input/AppInput";
import {useForm} from "react-hook-form";
import {log} from "util";
import {isBooleanObject} from "util/types";
import {useStores} from "../store/RootStore";
import {access} from "fs";

export type Action = () => void;

const AuthLayout = ({
                        close,
                        back = true,
                        children,
                        closeClick = undefined,
                        backAction = undefined
                    }: {
    close: boolean,
    back: boolean,
    children: ReactNode,
    closeClick?: Action,
    backAction?: Action
}) => {
    const {isMobile} = useMedia();
    const {appState} = useStores();


    const navigate = useNavigate()

    const closeAuth = () => {
        if (closeClick) {
            closeClick();
            return;
        }
        navigate("/")
    }

    const backClick = () => {
        if (backAction) {
            backAction();
            return;
        }
        navigate(-1);
    }

    return <div style={{marginTop: '15px'}}>

        <Block>
            <FlexContainer>
                <div>{back && <IconButton icon={BackIcon} click={backClick}/>}</div>
                <div>{close && <IconButton icon={CloseIcon} click={closeAuth}/>}</div>
            </FlexContainer>
        </Block>

        {children}

    </div>
}

const AgreementContainer = styled.div`
  padding-top: 40px;
`

const PhoneInputStyled = styled.input`
  box-sizing: border-box;
  background: #FFFFFF;
  border: 0.5px solid rgba(32, 32, 32, 0.5);
  border-radius: 8px;
  height: 48px;
  text-indent: 13px;
  width: 100%;
  margin-bottom: 12px;
`;


const PhoneInput = ({onChange}: { onChange: (value: string) => void }) => <MaskedInput
    mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
    placeholder="+7 (000)000-00-00"
    onChange={(value) => onChange(value!.target.value)}
    render={(r, props) => (
        <PhoneInputStyled ref={e => r(e!)} {...props} />
    )}/>

const parsePhone = (raw: string) => raw.substring(2)
    .replaceAll(' ', '')
    .replaceAll('_', '')
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll('-', '');

export const Auth = ({
                         closeClick = undefined,
                         login = undefined,
                         register = undefined
                     }: { closeClick?: Action, login?: Action, register?: Action }) => {
    const navigate = useNavigate();

    const registerClick = () => {
        if (register) {
            register()
            return
        }
        navigate('/register')
    }

    const loginClick = () => {
        if (login) {
            login()
            return
        }
        navigate('/login')
    }


    return <AuthLayout close={true} back={false} closeClick={closeClick}>
        <Block centred style={{marginTop: '30px'}}>
            <img src={Logo} style={{width: '146px'}}/>
        </Block>

        <Block style={{marginTop: '30px'}}>
            <Button click={loginClick}>Войти</Button>
            <div style={{marginTop: '15px'}}></div>
            <ButtonStroke click={registerClick}>Зарегестрироваться</ButtonStroke>
        </Block>
    </AuthLayout>
}

export const RegisterByPhone = ({
                                    closeClick = undefined,
                                    backClick = undefined,
                                    next = undefined
                                }: { closeClick?: Action, backClick?: Action, next?: Action }) => {

    const {register, watch, handleSubmit, formState: {errors, isValid}} = useForm();

    const agreement1 = watch("agreement1")
    const agreement2 = watch("agreement2")

    const navigate = useNavigate()
    const {appState} = useStores();

    const [phone, setPhone] = useState("");
    const isValidPhone = useMemo(() => phone.length == 10, [phone])


    const onPhoneInput = (rawPhone: string) => {
        let phone = parsePhone(rawPhone)

        setPhone(phone)
    }

    const clickNext = () => {
        if (!isValidPhone) {
            return
        }

        appState.showLoading()
        sendVerificationSms(phone).then(result => {
            appState.hideLoading()
            if (!result.isSuccess) {
                return;
            }

            appState.setPhone(phone);

            if (next) {
                next();
                return;
            }

            navigate('/register/sms')
        })
    }


    return <AuthLayout close={true} back={true} closeClick={closeClick} backAction={backClick}>
        <form onSubmit={handleSubmit(clickNext)}>
            <Block style={{marginTop: '30px'}}>
                <Typography.H2>Регистрация по смс</Typography.H2>
                <Typography.Text style={{marginTop: '12px'}}>
                    Укажите номер, на который придет смс с паролем подтверждения регистрации
                </Typography.Text>
            </Block>

            <Block style={{marginTop: '30px'}}>
                <PhoneInput onChange={onPhoneInput}/>
                <Button type="submit" disabled={!isValidPhone || !agreement1 || !agreement2}>Далее</Button>
            </Block>

            <Block>
                <AgreementContainer>
                    <AppCheckbox field="agreement1" {...register("agreement1", {required: true})} >
                        <CheckboxLabel htmlFor="agreement1">Согласен на обработку персональных данных</CheckboxLabel>
                    </AppCheckbox>
                    <AppCheckbox field="agreement2" {...register("agreement2", {required: true})} defaultValue={true}>
                        <CheckboxLabel htmlFor="agreement2">Согласен с условиями договора-оферты</CheckboxLabel>
                    </AppCheckbox>

                </AgreementContainer>
            </Block>
        </form>
    </AuthLayout>
}

export const RegisterSMSInput = ({
                                     closeClick = undefined,
                                     backClick = undefined,
                                     next = undefined
                                 }: { closeClick?: Action, backClick?: Action, next?: Action }) => {
    const navigate = useNavigate()

    const {appState} = useStores()

    const onCodeChange = (value: string) => {
        if (!value || value.length != 4) {
            return;
        }

        appState.showLoading()
        checkVerificationSms({phone: appState.phone!, sms: value}).then(result => {
            appState.hideLoading()
            if (!result.isSuccess) {
                return;
            }
            appState.setPhoneCode(value)

            if (next) {
                next()
                return;
            }
            navigate("/register/password")
        }).then(appState.hideLoading)
    }


    return <AuthLayout close={true} back={true} closeClick={closeClick} backAction={backClick}>
        <Block style={{marginTop: '30px'}}>
            <Typography.H2>Смс код</Typography.H2>
            <Typography.Text style={{marginTop: '12px'}}>
                Введите четырехзначный код, который мы отправили на номер +7(777)777-77-77
            </Typography.Text>
        </Block>

        <Block centred style={{marginTop: '24px'}}>
            <VerificationInput
                length={4}
                validChars={'0-9'}
                placeholder=""
                onChange={onCodeChange}
                classNames={{
                    container: "sms-input__container",
                    character: "sms-input__character",
                    characterInactive: "sms-input__character",
                    characterSelected: "sms-input__character",
                }
                }/>

        </Block>
        <Block centred style={{marginTop: '30px'}}>
            <Typography.Text bold style={{color: '#7B8794'}}>
                Не получили код?
            </Typography.Text>
        </Block>

        <Block centred>
            <Typography.Text bold style={{color: '#2F80ED'}}>
                Отправить еще раз
            </Typography.Text>
        </Block>

    </AuthLayout>
}
export const RegisterPasswordInput = ({
                                          closeClick = undefined,
                                          backClick = undefined,
                                          next = undefined
                                      }: { closeClick?: Action, backClick?: Action, next?: Action }) => {
    const navigate = useNavigate()
    const {appState, userStore} = useStores()
    const [password, setPassword] = useState("")
    const isPasswordValid = useMemo(() => password.length >= 8, [password])

    const clickNext = () => {
        if (!isPasswordValid) {
            return;
        }

        appState.showLoading()
        register({phone: appState.phone!, sms: appState.phoneCode!, password: password}).then(result => {
            appState.hideLoading();
            if (!result.isSuccess) {
                return
            }

            userStore.setJwt(result.result!)

            appState.showLoading()

            getUser().then(userResult => {
                appState.hideLoading();

                if(userResult.isSuccess){
                    userStore.setUser(userResult.result)
                }

                if (next) {
                    next()
                }

                navigate("/");
            })

        })
    }

    return <AuthLayout close={true} back={true} closeClick={closeClick} backAction={backClick}>
        <Block style={{marginTop: '30px'}}>
            <Typography.H2>Пароль</Typography.H2>
            <Typography.Text style={{marginTop: '12px'}}>
                Введите пароль, минимум из 8 символов
            </Typography.Text>
        </Block>


        <Block centred style={{marginTop: '24px'}}>
            <Input placeholder="********" type={"password"} onChange={setPassword}/>
        </Block>

        <Block>
            <Button click={clickNext} disabled={!isPasswordValid}>Готово</Button>
        </Block>

    </AuthLayout>
}

export const LoginByPhone = ({
                                 closeClick = undefined,
                                 backClick = undefined,
                                 next = undefined
                             }: { closeClick?: Action, backClick?: Action, next?: Action }) => {
    const navigate = useNavigate()
    const {appState} = useStores();

    const [phone, setPhone] = useState("");
    const isValidPhone = useMemo(() => phone.length == 10, [phone])

    const onPhoneInput = (rawPhone: string) => {
        let phone = parsePhone(rawPhone)

        setPhone(phone)
    }

    const clickNext = () => {
        if (!isValidPhone) {
            return
        }

        appState.setPhone(phone);

        if(next){
            next()
            return;
        }

        navigate('/login/password')
    }


    return <AuthLayout close={true} back={true} closeClick={closeClick} backAction={backClick}>
        <Block style={{marginTop: '30px'}}>
            <Typography.H2>Вход по номеру </Typography.H2>
            <Typography.Text style={{marginTop: '12px'}}>
                Укажите номер, на который придет смс с паролем подтверждения входа
            </Typography.Text>
        </Block>

        <Block style={{marginTop: '30px'}}>
            <PhoneInput onChange={onPhoneInput}/>
            <Button click={clickNext} disabled={!isValidPhone}>Далее</Button>
        </Block>

    </AuthLayout>
}

export const LoginPasswordInput = ({
                                       closeClick = undefined,
                                       backClick = undefined,
                                       next = undefined
                                   }: { closeClick?: Action, backClick?: Action, next?: Action }) => {
    const navigate = useNavigate()
    const {appState, userStore} = useStores()
    const [password, setPassword] = useState("")
    const isPasswordValid = useMemo(() => password.length >= 8, [password])

    const clickNext = () => {
        if (!isPasswordValid) {
            return;
        }

        appState.showLoading()
        login({phone: appState.phone!, password: password}).then(result => {
            appState.hideLoading();
            if (!result.isSuccess) {
                return
            }

            userStore.setJwt(result.result!)

            appState.showLoading()

            getUser().then(userResult => {
                appState.hideLoading();

                if(userResult.isSuccess){
                    userStore.setUser(userResult.result)
                }

                if (next) {
                    next()
                }

                navigate("/");
            })


        })
    }


    return <AuthLayout close={true} back={true} closeClick={closeClick} backAction={backClick}>
        <Block style={{marginTop: '30px'}}>
            <Typography.H2>Добро пожаловать</Typography.H2>
            <Typography.Text style={{marginTop: '12px'}}>
                Введите пароль
            </Typography.Text>
        </Block>


        <Block centred style={{marginTop: '24px'}}>
            <Input placeholder="********" type={"password"} onChange={setPassword}/>
        </Block>

        <Block>
            <Button click={clickNext} disabled={!isPasswordValid}>Готово</Button>
        </Block>

    </AuthLayout>
}