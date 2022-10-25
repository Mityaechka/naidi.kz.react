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


const LayoutContainer = styled.div`
  margin: 0 10px;
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
const LogoImg = styled.img`
  :hover {
    cursor: pointer;
  }
`

export const AdminLayout = observer(() => {
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
                    <ProfileListItem click={() => navigator("/admin/moderation/resumes")} title="Модерация резюме"
                                     bold={app.section == "moderation-resumes"}/>

                </ListWrapper>
                <ContentWrapper><Outlet/></ContentWrapper>
            </LayoutContentContainer>


        </LayoutContainer>
    </>
})
