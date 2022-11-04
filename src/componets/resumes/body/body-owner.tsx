import Avatar from '../../../assets/avatar.png'
import moment from 'moment/moment'
import {DollarSign, MapPin, User} from 'react-feather'
import styled from 'styled-components'
import {Destination, Resume, ResumeState} from '../../../models/data'
import {localize} from '../../../helpers/localization'
import {AppButton} from '../../app-input/app-button'

const CardSectionWrapper = styled.div`
  margin: 0 24px;
`
const DescriptionRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0px;
  margin-left: 4px;
`

const DescriptionText = styled.span`

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`

const DescriptionTitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(32, 32, 32, 0.5);
`
export const BodyOwner = ({resume}: { resume: Resume }) => {
	return <>

		<DescriptionRow>
			<DescriptionTitle>Работа</DescriptionTitle>
			<DescriptionText>{`${localize(resume.activity.name)}`}</DescriptionText>
		</DescriptionRow>

		<DescriptionRow>
			<DescriptionTitle>Оплата</DescriptionTitle>
			<DescriptionText>---</DescriptionText>
		</DescriptionRow>

		<DescriptionRow>
			<DescriptionTitle>Область</DescriptionTitle>
			<DescriptionText>{Destination.fullDestination(resume.destination)}</DescriptionText>
		</DescriptionRow>

		<DescriptionRow>
			<DescriptionTitle>Статус</DescriptionTitle>
			<DescriptionText>{localize(ResumeState.toLocalized(resume.state))}</DescriptionText>
		</DescriptionRow>


	</>
}