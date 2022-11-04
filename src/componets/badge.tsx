import styled from 'styled-components'

import PlusIcon from '../assets/icons/plusicon.png'
import CheckmarkIcon from '../assets/icons/checkmark-icon.png'

import { Plus, Check } from 'react-feather'

const checkedColor = '#F9CF21'
const uncheckedColor = '#DCDCDC'

const BadgeContainer = styled.div<{checked: boolean}>`
  overflow: unset;
  display: inline-flex;
  height: 28px;
  align-content: center;
  background-color: ${({checked}) => checked ? checkedColor : uncheckedColor};
  border-radius: 16px;

  align-items: center;
  justify-content: center;
`


const BadgeTitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin-right: 10px;

  background-color: inherit;
`


export const Badge = ({title, checked, onClick}: { title: string, checked: boolean, onClick?: () => void }) => {
	return <BadgeContainer checked={checked} onClick={onClick}>
		<>
			{checked && <Check className="badge-icon"/>}
			{!checked && <Plus className="badge-icon"/>}

			<BadgeTitle>{title}</BadgeTitle>

		</>
	</BadgeContainer>


}