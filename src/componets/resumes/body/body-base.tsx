import Avatar from '../../../assets/avatar.png'
import moment from 'moment/moment'
import {ArrowDown, ArrowUp, DollarSign, MapPin, User} from 'react-feather'
import styled from 'styled-components'
import {Destination, Resume, ResumeState} from '../../../models/data'
import {localize} from '../../../helpers/localization'
import {AppButton, AppButtonStroke} from '../../app-input/app-button'
import {useState} from "react";
import {Divider} from "../resume";

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

const MoreButtonContainer = styled.div`
  display: flex;
`
const MoreButton = styled.span`

`
const MoreButtonWrapper = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
`
const MoreButtonIcon = styled(ArrowDown)`
  width: 16px;
  height: 16px;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
  margin-bottom: ;
  column-gap: 15px;
`


export const BodyBase = ({resume}: { resume: Resume }) => {

    const [isOpen, setOpen] = useState(false)

    const Description = <>
        <Divider/>
        <DescriptionText>esf shfjksdfnbsdjf sdjkf nsdfn sdfvsdfvnb sdkjfb vsdfv,j sdbf mdshf bmsdj fb
            hjm</DescriptionText>

        <ButtonsContainer>
            <AppButtonStroke>Откликнуться</AppButtonStroke>
            <AppButton click={() => setOpen(false)}>Закрыть</AppButton>
        </ButtonsContainer>
    </>

    const More = <>
        <MoreButtonContainer>
            <MoreButtonWrapper>
                <MoreButton onClick={() => setOpen(true)}>Подробнеее</MoreButton>
            </MoreButtonWrapper>
            <MoreButtonIcon/>
        </MoreButtonContainer>
    </>

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

        {isOpen && Description}

        {!isOpen && More}

    </>
}