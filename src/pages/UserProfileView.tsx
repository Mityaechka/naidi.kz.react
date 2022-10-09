import {AppInput} from "../componets/app-input/AppInput";
import {Block} from "../componets/Block";
import {formatPhoneNumber} from "../helpers/phoneHelpers";
import moment from "moment";
import {Gender} from "../models/Data";
import styled from "styled-components";
import {Button} from "../componets/Button";

import Avatar from "../assets/avatar.png"
import {useNavigate} from "react-router-dom";
import {device} from "../hooks/mediaHook";

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

    return <Block>
        <ProfileContainer>
            <div>
                <AppInput field="fio" label="ФИО" disabled={true} value="Иванов Иван"/>
                <AppInput field="phoneNumber" label="Мобильный телефон" disabled={true}
                          value={formatPhoneNumber("7024829563")}/>
                <AppInput field="birthData" label="Дата рождения" disabled={true}
                          value={moment().format("DD.MM.yyyy")}/>
                <AppInput field="gender" label="Пол" disabled={true} value={Gender.toString(Gender.Male)}/>

                <Button color="yellow" click={() => navigator("/user/profile/edit")}>Редактировать</Button>
            </div>
            <AvatarContainer>
                <AvatarWrapper src={Avatar}/>
                <Button color="yellow">Добавить фото</Button>
            </AvatarContainer>
        </ProfileContainer>

    </Block>
}