import {MobileBar} from "../componets/MobileBar";
import {ArrowRight} from "react-feather";
import styled from "styled-components";
import {Action} from "./Auth";
import {useNavigate} from "react-router-dom";
import {useStores} from "../store/RootStore";
import {useMedia} from "../hooks/mediaHook";
import {ProfileListItem} from "../componets/profile-list-item/ProfileListItem";

const ListContainer = styled.div`
  padding: 0 35px;

`




export const UserProfile = () => {
    const {appState} = useStores()
    const media = useMedia()
    const navigator = useNavigate()
    if(!media.isMobile){
        navigator("/user/profile")
        return <></>
    }

    appState.setTitle("Личный кабинет")

    return <>
        <ProfileList></ProfileList>
    </>
}

const ProfileList = () => {
    const navigator = useNavigate()
    return <>
        <ListContainer>
            <ProfileListItem click={() => navigator("/user/profile")} title="Мои данные"/>
            <ProfileListItem click={() => { }} title="Настройки"/>
            <ProfileListItem click={() => {}} title="Отклики"/>
            <ProfileListItem click={() => {}} title="Объявления"/>
            <ProfileListItem click={() => {}} title="Naidi"/>
            <ProfileListItem click={() => {}} title="Получить бух-е документы"/>


        </ListContainer>
    </>;
}



