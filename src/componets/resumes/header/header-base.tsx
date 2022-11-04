import Avatar from '../../../assets/avatar.png'
import styled from 'styled-components'
import moment from 'moment'
import {DollarSign, MoreVertical} from 'react-feather'
import {Menu, MenuItem} from '@szhsin/react-menu'
import {ReactNode} from 'react'
import {PopupMenu, PopupMenuItem} from '../../popup-menu/popup-menu'
import {Resume} from "../../../models/data";

const ClientAvatar = styled.img`
  width: 30px;
  height: 30px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  justify-content: space-around;
`

const Surname = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`

const Date = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;

  color: rgba(32, 32, 32, 0.5);
`



export const HeaderBase = ({resume,
	menuItems
}: { resume:Resume, menuItems?: PopupMenuItem[] }) => {
	return <>
		<Container>
			<ClientAvatar src={Avatar}/>

			<DescriptionContainer>
				<Surname>{`${resume.client.firstName} ${resume.client.lastName}`}</Surname>
				<Date>{moment().format('DD MMMM HH:mm')}</Date>

			</DescriptionContainer>
			{menuItems &&
                <PopupMenu items={menuItems}/>
			}
		</Container>
	</>
}

