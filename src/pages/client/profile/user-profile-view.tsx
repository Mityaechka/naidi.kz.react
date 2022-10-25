import {AppInput} from "../../../componets/app-input/app-input";
import {formatPhoneNumber} from "../../../helpers/phone-helpers";
import {Gender, User} from "../../../models/data";
import styled from "styled-components";
import {AppButton} from "../../../componets/app-input/app-button";

import Avatar from "../../../assets/avatar.png"
import {useNavigate} from "react-router-dom";
import {device} from "../../../hooks/mediaHook";
import {useEffect, useState} from "react";
import {useStores} from "../../../store/root-store";
import api from "../../../api";

const ProfileContainer = styled.div`
  display: flex;
  column-gap: 40px;

  @media ${device.mobileOrTablet} {
    flex-direction: column-reverse;
    row-gap: 14px;
  }
`

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`

const AvatarWrapper = styled.img`
  width: 96px;
  height: 96px;
`

export const UserProfileView = () => {

    const navigator = useNavigate()
    const {app} = useStores();

    app.setTitle("Мои данные")
    app.setSection("my-profile")
    app.clearMenuItems()

    const [user, setUser] = useState<User | undefined>(undefined)
    useEffect(() => {
        console.log("render")
        api.account.getUser().then(result => {
            if (!result.isSuccess) {
                return;
            }

            setUser(result.result)
        })
    }, [])

    console.log(user)
    return <>
        <ProfileContainer>
            <div>
                <AppInput field="fio" label="ФИО" disabled={true} value={User.fullName(user)}/>
                <AppInput field="phoneNumber" label="Мобильный телефон" disabled={true}
                          value={formatPhoneNumber(user?.phone)}/>
                {/*<AppInput field="birthData" label="Дата рождения" disabled={true}*/}
                {/*          value={user?.birthDate ? moment(user?.birthDate).format("DD.MM.yyyy") : ""}/>*/}

                <AppInput field="gender" label="Пол" disabled={true}
                          value={Gender.toNameString(user?.gender) ?? "Не указан"}/>

                <AppInput field="areaId" label="Область" disabled={true} value={user?.destination?.area?.name?.ru}/>

                <AppInput field="cityId" label="Город" disabled={true} value={user?.destination?.city?.name?.ru}/>

                <AppButton color="yellow" click={() => navigator("/user/profile/edit")}>Редактировать</AppButton>
            </div>
            <AvatarContainer>
                <AvatarWrapper src={Avatar}/>
                <AppButton color="yellow">Добавить фото</AppButton>
            </AvatarContainer>
        </ProfileContainer>

    </>
}