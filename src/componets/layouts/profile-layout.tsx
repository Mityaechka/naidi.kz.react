import {useStores} from "../../store/root-store";
import {MobileLayout} from "./mobile-layout";
import {MobileBar} from "../mobile-bar";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useMedia} from "../../hooks/mediaHook";
import styled from "styled-components";
import {AppInput} from "../app-input/app-input";
import {useRouteChange} from "../../hooks/useRouteChange";
import {ProfileListItem} from "../profile-list-item";
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
  padding: 30px 30px;
  width: 100%;
  height: 100%;
`

const MobileLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const MobileContentWrapper = styled.div`
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

const LogoImg = styled.img`
  :hover {
    cursor: pointer;
  }
`

const DesktopProfileLayout = observer(() => {
    const navigator = useNavigate()
    const {app} = useStores()

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
                                     bold={app.section == "my-profile"}/>

                    <ProfileListItem click={() => navigator("/user/resumes")} title="Мои резюме"
                                     bold={app.section == "my-resumes"}/>
                </ListWrapper>
                <ContentWrapper><Outlet/></ContentWrapper>
            </LayoutContentContainer>


        </LayoutContainer>
    </>
})

const MobileProfileLayout = observer(() => {
    const {app} = useStores()
    const navigator = useNavigate()
    const back = () => {
        navigator(-1)
    }

    return <MobileLayoutContainer>
        <MobileBar title={app.title} backClick={back} menuItems={app.pageMenuItems}/>
        <MobileContentWrapper>
            <Outlet/>
        </MobileContentWrapper>
    </MobileLayoutContainer>
})