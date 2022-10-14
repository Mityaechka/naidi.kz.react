import {useStores} from "../../store/RootStore";
import {MobileLayout} from "./MobileLayout";
import {MobileBar} from "../MobileBar";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useMedia} from "../../hooks/mediaHook";
import styled from "styled-components";
import {AppInput} from "../app-input/AppInput";
import {useRouteChange} from "../../hooks/useRouteChange";
import {ProfileListItem} from "../profile-list-item/ProfileListItem";
import Logo from "../../assets/logo.png"
import {observe} from "mobx";
import {observer} from "mobx-react";

export const ProfileLayout = observer(() => {
    const media = useMedia()

    if (media.isMobile) {
        return <MobileProfileLayout/>
    }

    return <DesktopProfileLayout/>
})

const LayoutContainer = styled.div`
  margin: 0 160px;
  height: 100%;

`

const NavbarContainer = styled.div`
  padding-bottom: 35px;
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
  max-height: 200px;
  min-height: 200px;
`

const ContentWrapper = styled.div`
  background: #FFFFFF;
  border: 0.5px solid rgba(32, 32, 32, 0.2);
  border-radius: 8px;
  padding: 24px 0;
  width: 100%;
  height: 100%;
`

const LogoImg = styled.img`
:hover{
  cursor: pointer;
}
`

const DesktopProfileLayout = observer(() => {
    const navigator = useNavigate()
    const {appState} = useStores()

    const back = () => {
        navigator(-1)
    }
    const [location] = useRouteChange();

    return <>
        <LayoutContainer>
            <NavbarContainer>
                <LogoImg src={Logo} onClick={() => navigator("/")}/>
            </NavbarContainer>
            <LayoutContentContainer>
                <ListWrapper>
                    <ProfileListItem click={() => navigator("/user/profile")} title="Мои данные"
                                     bold={appState.section == "my-profile"}/>

                    <ProfileListItem click={() => navigator("/user/resumes")} title="Мои резюме"
                                     bold={appState.section == "my-resumes"}/>
                </ListWrapper>
                <ContentWrapper><Outlet/></ContentWrapper>
            </LayoutContentContainer>


        </LayoutContainer>
    </>
})

const MobileProfileLayout = observer(() => {
    const {appState} = useStores()
    const navigator = useNavigate()
    const back = () => {
        navigator(-1)
    }

    return <>
        <MobileBar title={appState.title} backClick={back}/>
        <Outlet/>
    </>
})