import BackIcon from "../../assets/icons/back-btn-icon.png"
import CloseIcon from "../../assets/icons/close-btn-icon.png"
import Logo from "../../assets/logo.png"
import {AppButton, AppButtonStroke, AppIconButton} from "../../componets/app-input/app-button";
import {Block, FlexContainer} from "../../componets/Block";
import React, {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {useMedia} from "../../hooks/mediaHook";
import {useNavigate} from "react-router-dom";
import {Typography} from "../../componets/Typography";
import VerificationInput from "react-verification-input";
import MaskedInput from 'react-text-mask'
import styled from "styled-components";
import {apiMethods} from "../../api/api-methods";
import {AppCheckbox, AppInput, CheckboxLabel} from "../../componets/app-input/app-input";
import {useForm} from "react-hook-form";
import {log} from "util";
import {isBooleanObject} from "util/types";
import {useStores} from "../../store/root-store";
import {access} from "fs";
import api from "../../api";
import {ArrowLeft, X} from "react-feather";

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
    const {app} = useStores();


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
                <div>
                    {back &&
                        <AppIconButton click={backClick} icon={<ArrowLeft/>}/>}
                </div>
                <div>
                    {close &&
                        <AppIconButton click={closeAuth} icon={<X/>}/>}
                </div>
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
            <AppButton click={loginClick}>Войти</AppButton>
            <div style={{marginTop: '15px'}}></div>
            <AppButtonStroke click={registerClick}>Зарегестрироваться</AppButtonStroke>
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
    const {app} = useStores();

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

        app.showLoading()
        api.account.sendVerificationSms(phone).then(result => {
            app.hideLoading()
            if (!result.isSuccess) {
                return;
            }

            app.setPhone(phone);

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
                <AppButton type="submit" disabled={!isValidPhone || !agreement1 || !agreement2}>Далее</AppButton>
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

    const {app} = useStores()

    const onCodeChange = (value: string) => {
        if (!value || value.length != 4) {
            return;
        }

        app.showLoading()
        api.account.checkVerificationSms({phone: app.phone!, sms: value}).then(result => {
            app.hideLoading()
            if (!result.isSuccess) {
                return;
            }
            app.setPhoneCode(value)

            if (next) {
                next()
                return;
            }
            navigate("/register/password")
        }).then(app.hideLoading)
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
    const {register, watch, handleSubmit,} = useForm();

    const navigate = useNavigate()
    const {app, user} = useStores()
    const [password, setPassword] = useState("")
    const isPasswordValid = useMemo(() => password.length >= 8, [password])

    const passwordWatch = watch("password")

    useEffect(() => {
        setPassword(passwordWatch ?? "")
    }, [passwordWatch])

    const clickNext = () => {
        if (!isPasswordValid) {
            return;
        }

        app.showLoading()
        api.account.register({phone: app.phone!, sms: app.phoneCode!, password: password}).then(result => {
            app.hideLoading();
            if (!result.isSuccess) {
                return
            }

            user.setJwt(result.result!)

            app.showLoading()

            api.account.getUser().then(userResult => {
                app.hideLoading();

                if (userResult.isSuccess) {
                    user.setUser(userResult.result)
                }

                if (next) {
                    next()
                }

                navigate("/");
            })

        })
    }

    return <AuthLayout close={true} back={true} closeClick={closeClick} backAction={backClick}>
        <form>
            <Block style={{marginTop: '30px'}}>
                <Typography.H2>Пароль</Typography.H2>
                <Typography.Text style={{marginTop: '12px'}}>
                    Введите пароль, минимум из 8 символов
                </Typography.Text>
            </Block>


            <Block centred style={{marginTop: '24px'}}>
                <AppInput placeholder="********" type={"password"} {...register("password",)} field="password"/>
            </Block>

            <Block>
                <AppButton click={clickNext} disabled={!isPasswordValid}>Готово</AppButton>
            </Block>
        </form>
    </AuthLayout>
}

export const LoginByPhone = ({
                                 closeClick = undefined,
                                 backClick = undefined,
                                 next = undefined
                             }: { closeClick?: Action, backClick?: Action, next?: Action }) => {
    const navigate = useNavigate()
    const {app} = useStores();

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

        app.setPhone(phone);

        if (next) {
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
            <AppButton click={clickNext} disabled={!isValidPhone}>Далее</AppButton>
        </Block>

    </AuthLayout>
}

export const LoginPasswordInput = ({
                                       closeClick = undefined,
                                       backClick = undefined,
                                       next = undefined
                                   }: { closeClick?: Action, backClick?: Action, next?: Action }) => {
    const {register, watch, handleSubmit} = useForm();

    const navigate = useNavigate()
    const {app, user} = useStores()
    const [password, setPassword] = useState("")
    const isPasswordValid = useMemo(() => password.length >= 8, [password])

    const passwordWatch = watch('password')

    useEffect(() => {
        setPassword(passwordWatch ?? "")
    }, [passwordWatch])

    const clickNext = () => {
        if (!isPasswordValid) {
            return;
        }

        app.showLoading()
        api.account.login({phone: app.phone!, password: password}).then(result => {
            app.hideLoading();
            if (!result.isSuccess) {
                return
            }

            user.setJwt(result.result!)

            app.showLoading()

            api.account.getUser().then(userResult => {
                app.hideLoading();

                if (userResult.isSuccess) {
                    user.setUser(userResult.result)
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
            <AppInput placeholder="********"
                      type="password"
                      {...register("password")}
                      field="password"/>
        </Block>

        <Block>
            <AppButton click={clickNext} disabled={!isPasswordValid}>Готово</AppButton>
        </Block>

    </AuthLayout>
}