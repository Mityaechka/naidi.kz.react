import {Action} from "../pages/client/auth";
import {ArrowLeft, Icon, IconProps, MoreVertical} from "react-feather";
import {FC, ReactNode} from "react";
import {AppIconButton} from "./app-input/app-button";
import CloseIcon from "../assets/icons/close-btn-icon.png";
import {Menu} from "@szhsin/react-menu";
import styled from "styled-components";

const MobileBarContainer = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    height: 56px;

    background: #FFFFFF;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12);
    border-radius: 0px 0px 8px 8px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  width: 40px;
  height: 40px;
`
const MobileBarTitle = styled.h1`
  margin: 0;
  padding: 0;
  align-self: center;
  flex: 1;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
`



export const MobileBar = ({
                              title,
                              backClick = undefined,
                              menuItems = undefined
                          }: { title: string, backClick?: Action, menuItems?: ReactNode }) => {

    return <MobileBarContainer>
        <ButtonContainer>
            <AppIconButton click={backClick} icon={<ArrowLeft/>}/>
        </ButtonContainer>

        <MobileBarTitle>{title}</MobileBarTitle>


        <ButtonContainer>
            {menuItems &&
                <Menu menuButton={<MoreVertical/>} transition direction="left">
                    {menuItems}
                </Menu>
            }
        </ButtonContainer>

    </MobileBarContainer>
}


