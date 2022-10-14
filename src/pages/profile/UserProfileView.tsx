import {AppInput} from "../../componets/app-input/AppInput";
import {Block} from "../../componets/Block";
import {formatPhoneNumber} from "../../helpers/phoneHelpers";
import moment from "moment";
import {Gender, User} from "../../models/Data";
import styled from "styled-components";
import {Button} from "../../componets/Button";

import Avatar from "../../assets/avatar.png"
import {useNavigate} from "react-router-dom";
import {device} from "../../hooks/mediaHook";
import {getUser} from "../../api/accountApi";
import {useEffect, useState} from "react";
import {useStores} from "../../store/RootStore";

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
    const {appState} = useStores();

    appState.setTitle("Мои данные")
    appState.setSection("my-profile")

    const [user, setUser] = useState<User | undefined>(undefined)
    useEffect(() => {
        console.log("render")
        getUser().then(result => {
            if (!result.isSuccess) {
                return;
            }

            setUser(result.result)
        })
    }, [])

    console.log(user)
    return <Block>
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

                <Button color="yellow" click={() => navigator("/user/profile/edit")}>Редактировать</Button>
            </div>
            <AvatarContainer>
                <AvatarWrapper src={Avatar}/>
                <Button color="yellow">Добавить фото</Button>
            </AvatarContainer>
        </ProfileContainer>

    </Block>
}