import styled from "styled-components";
import {Action} from "../../pages/Auth";
import {ArrowRight} from "react-feather";


const ListItemWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 0 10px;
`

const Line = styled.div`
  border: 0.5px solid rgba(32, 32, 32, 0.5);
  flex: none;
  order: 1;
  flex-grow: 0;
`

const ListItemTitle = styled.span<{ bold: boolean }>`
  padding: 10px 0;
  font-weight: ${({bold}) => bold ? 700 : undefined};
`

const ListItemBadge = styled.span`
  background: #F9CF21;
  border-radius: 8px;
  padding: 5px;
  margin-left: 5px;
`

export const ProfileListItem = ({
                                    click,
                                    title,
                                    badge = undefined,
                                    bold = false
                                }: { click: Action, title: string, badge?: string, bold?: boolean }) => <>
    <div>
        <ListItemWrapper onClick={click}>
            <ListItemTitle bold={bold}>
                {title}
                {badge && <ListItemBadge>{badge}</ListItemBadge>}
            </ListItemTitle>
            <ArrowRight/>
        </ListItemWrapper>
        <Line/>
    </div>
</>
