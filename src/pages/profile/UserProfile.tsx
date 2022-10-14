import {MobileBar} from "../../componets/MobileBar";
import {ArrowRight} from "react-feather";
import styled from "styled-components";
import {Action} from "../Auth";
import {useNavigate} from "react-router-dom";
import {useStores} from "../../store/RootStore";
import {useMedia} from "../../hooks/mediaHook";
import {ProfileListItem} from "../../componets/profile-list-item/ProfileListItem";

const ListContainer = styled.div`
  padding: 0 35px;

`




export const UserProfile = () => {
    const {appState} = useStores()
    const media = useMedia()
    const navigator = useNavigate()
    if(!media.isMobile){
        //navigator("/user/profile")
        return <></>
    }

    appState.setTitle("Профиль")
    appState.setSection("my-profile")

    return <>
        <ListContainer>
            <ProfileListItem click={() => navigator("/user/profile")} title="Мои данные"/>

            <ProfileListItem click={() => navigator("/user/resumes")} title="Мои резюме"/>


        </ListContainer>
    </>
}





