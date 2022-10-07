import styled from "styled-components";

import PlusIcon from "../assets/icons/plusicon.png"
import CheckmarkIcon from "../assets/icons/checkmark-icon.png"

const BadgeWrapper = styled.div`
  align-content: center;
  background: rgba(32, 32, 32, 0.1);
  border-radius: 16px;
  height: 28px;
`;


const BadgeTitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`
const BadgeContent = styled.div`
  margin: 10px;
  display: flex;
`

const BadgeIcon = styled.img`
  width: 10px;
  height: 10px;
`

export const Badge = ({title, checked}: { title: string, checked: boolean }) => {
    return <BadgeWrapper>
            <BadgeIcon src={checked ? PlusIcon : CheckmarkIcon}/>
            <BadgeTitle>{title}</BadgeTitle>
    </BadgeWrapper>
}