import {useStores} from "../../store/RootStore";
import {MobileLayout} from "./MobileLayout";
import {MobileBar} from "../MobileBar";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useMedia} from "../../hooks/mediaHook";
import styled from "styled-components";
import {AppInput} from "../app-input/AppInput";
import {useRouteChange} from "../../hooks/useRouteChange";
import {ProfileListItem} from "../profile-list-item/ProfileListItem";

export const ProfileLayout = () => {
    const media = useMedia()

    if (media.isMobile) {
        return <MobileProfileLayout/>
    }

    return <DesktopProfileLayout/>
}

const LayoutContainer = styled.div`
  margin: 0 160px;
  height: 100%;
`

const LayoutContentContainer = styled.div`
  display: flex;
  column-gap: 20px;
`

const ListWrapper = styled.div`
  background: #FFFFFF;
  border: 0.5px solid rgba(32, 32, 32, 0.2);
  border-radius: 8px;
  padding: 24px 15px;
  min-width: 300px;
`

const ContentWrapper = styled.div`
  background: #FFFFFF;
  border: 0.5px solid rgba(32, 32, 32, 0.2);
  border-radius: 8px;
  padding: 24px 0;
  width: 100%;
  height: 100%;
`

const DesktopProfileLayout = () => {
    const navigator = useNavigate()
    const back = () => {
        navigator(-1)
    }
    const [location] = useRouteChange();
    console.log(location)
    return <>
        <LayoutContainer>
            <LayoutContentContainer>
                <ListWrapper>
                    <ProfileListItem click={() => navigator("/user/profile")} title="Мои данные" bold={location?.pathname == "/user/profile"}/>
                    <ProfileListItem click={() => { }} title="Настройки"/>
                    <ProfileListItem click={() => {}} title="Отклики"/>
                    <ProfileListItem click={() => {}} title="Объявления"/>
                    <ProfileListItem click={() => {}} title="Naidi"/>
                    <ProfileListItem click={() => {}} title="Получить бух-е документы"/>
                </ListWrapper>
                <ContentWrapper><Outlet/></ContentWrapper>
            </LayoutContentContainer>


        </LayoutContainer>
    </>
}

const MobileProfileLayout = () => {
    const {appState} = useStores()
    const navigator = useNavigate()
    const back = () => {
        navigator(-1)
    }

    return <>
            <MobileBar title={appState.title} backClick={back}/>
            <Outlet/>
    </>
}