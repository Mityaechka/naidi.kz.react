import {useStores} from "../../store/root-store";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useRouteChange} from "../../hooks/useRouteChange";
import {ProfileListItem} from "../profile-list-item";
import Logo from "../../assets/logo.png"
import {observer} from "mobx-react";
import {Only} from "../roles/RoleContext";
import {UserRole} from "../../models/user-data";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "../loading-spinner";
import api from "../../api";

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
    const {app, user} = useStores()

    const [isAuth, setAuth] = useState<boolean | undefined>(undefined)

    const [location] = useRouteChange();

    useEffect(() => {
        api.admin.getAuthUser().then(result => {
            if (!result.isSuccess) {
                setAuth(false)
                return
            }

            setAuth(true)
            user.setUser(result.result)
        })
    }, [])


    if (isAuth == undefined) {
        return <LoadingSpinner/>
    }

    if (!isAuth) {
        return <Navigate to='/admin-auth'/>
    }


    return <>
        <LayoutContainer>
            <NavbarContainer>
                <LogoImg src={Logo} onClick={() => navigator("/")}/>
            </NavbarContainer>
            <LayoutContentContainer>
                <ListWrapper>
                    <Only to={UserRole.Moderator}>
                        <ProfileListItem click={() => navigator("/admin/moderation/resumes")} title="Модерация резюме"
                                         bold={app.section == "moderation-resumes"}/>
                    </Only>

                    <Only to={UserRole.Admin}>
                        <ProfileListItem click={() => navigator("/admin/users")}
                                         title="Пользователи"
                                         bold={app.section == "moderation-users"}/>
                    </Only>
                </ListWrapper>
                <ContentWrapper><Outlet/></ContentWrapper>
            </LayoutContentContainer>
        </LayoutContainer>
    </>
})
