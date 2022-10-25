import {MobileBar} from "../../../componets/mobile-bar";
import {ArrowRight} from "react-feather";
import styled from "styled-components";
import {Action} from "../auth";
import {useNavigate} from "react-router-dom";
import {useStores} from "../../../store/root-store";
import {useMedia} from "../../../hooks/mediaHook";
import {ProfileListItem} from "../../../componets/profile-list-item";

const ListContainer = styled.div`
  padding: 0 35px;

`




export const UserProfile = () => {
    const {app} = useStores()
    const media = useMedia()
    const navigator = useNavigate()
    if(!media.isMobile){
        //navigator("/user/profile")
        return <></>
    }

    app.setTitle("Профиль")
    app.setSection("my-profile")
    app.clearMenuItems()

    return <>
        <ListContainer>
            <ProfileListItem click={() => navigator("/user/profile")} title="Мои данные"/>

            <ProfileListItem click={() => navigator("/user/resumes")} title="Мои резюме"/>


        </ListContainer>
    </>
}





