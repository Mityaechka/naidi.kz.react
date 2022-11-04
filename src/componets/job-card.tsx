import styled from 'styled-components'
import Logo from '../assets/magnum-test.png'

import {MapPin, DollarSign} from 'react-feather'

export enum Size {
    Small,
    Full
}

const JobContainer = styled.div<{ size: Size }>`
  background: #F9CF21;
  box-shadow: 0px 4px 15px rgba(249, 207, 33, 0.25);
  border-radius: 5px;
  width: ${({size}) => size == Size.Full ? undefined : '140px'};
`

const JobWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`

const Title = styled.span`
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;

`

const TitleIcon = styled.img`
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
`

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 7px;
`

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`

const DescriptionText = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  padding-left: 5px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
const CompanyContainer = styled.div`
  padding-top: 8px;
`
const CompanyName = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
`
export const JobCard = ({size = Size.Small}: { size?: Size }) => {
	return <>
		<JobContainer size={size}>
			<JobWrapper>
				<TitleContainer>
					<Title>Уборщик помещений на полный день</Title>
					<TitleIcon src={Logo}/>
				</TitleContainer>

				<DescriptionWrapper>
					<DescriptionContainer>
						<DollarSign className="w-14"/>
						<DescriptionText>130 000 тг/мес</DescriptionText>
					</DescriptionContainer>

					<DescriptionContainer>
						<MapPin className="w-14"/>
						<DescriptionText>Есильский р-н, г. Нур-Султан</DescriptionText>
					</DescriptionContainer>
				</DescriptionWrapper>

				<CompanyContainer>
					<CompanyName>
                        Микрофинансовая организация Lending and Financy technologies
					</CompanyName>
				</CompanyContainer>
			</JobWrapper>
		</JobContainer>
	</>
}
