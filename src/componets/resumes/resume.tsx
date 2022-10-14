import styled, {css} from "styled-components";
import {theme} from "../../index";
import {Colors} from "../styles";
import {IconButton} from "../MobileBar";
import DetailsIcon from "../../assets/icons/details-icon.png";
import MoneyIcon from "../../assets/icons/icon-money.png";
import GenderIcon from "../../assets/icons/icon-gender.png";
import LocationIcon from "../../assets/icons/icon-location.png";
import {ReactNode} from "react";

const Divider = styled.div`
  border: 1px solid rgba(32, 32, 32, 0.1);
  margin: 8px 16px;
`

const CardTitle = styled.span`
  display: block;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`

const CardText = styled.span`
  display: block;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`
const CardStatText = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
`


const CardStat = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`


const CardContainer = styled.div<{ color?: string, border?: Border }>`
  border-style: solid;
  border-width: 0;
  border-radius: 5px;
  margin: 5px;
  padding: 5px 0;
  filter: drop-shadow(0px 1px 4px #A9A9A9);

  border-color: ${props => props.color};
  ${({border}) => borderVariant[border ?? 'none']}

  background: #ffffff;
`;

const CardSectionWrapper = styled.div`
  margin: 10px 24px;
`

export type Border = 'left' | 'top' | 'none'


const borderVariant: Record<NonNullable<Border>, ReturnType<typeof css>> = {
    left: css`
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-left-width: 9px;
    `,
    top: css`
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-top-width: 9px;
    `,
    none: css``
};

const DescriptionRow = styled.div`
  display: flex;
  margin: 8px 0px;
`

const DescriptionIcon = styled.img`

  width: 24px
`

const DescriptionTextWrapper = styled.div`
margin-left: 4px;
`

const DescriptionText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
`


export const ResumeComponent = ({border, header}: {color?: string, border: Border, header: ReactNode}) => {
    return <CardContainer color={theme.colors.yellow} border={border}>
        <CardSectionWrapper>
            {header}
        </CardSectionWrapper>

        <Divider/>

        <CardSectionWrapper>

            <DescriptionRow>
                <DescriptionIcon src={MoneyIcon}/>
                <DescriptionTextWrapper>
                    <DescriptionText>130 000 ₸/мес</DescriptionText>
                </DescriptionTextWrapper>
            </DescriptionRow>

            <DescriptionRow>
                <DescriptionIcon src={GenderIcon}/>
                <DescriptionTextWrapper>
                    <DescriptionText>Мужской</DescriptionText>
                </DescriptionTextWrapper>
            </DescriptionRow>

            <DescriptionRow>
                <DescriptionIcon src={LocationIcon}/>
                <DescriptionTextWrapper>
                    <DescriptionText>Есильский р-н, г. Нур-Султан</DescriptionText>
                </DescriptionTextWrapper>
            </DescriptionRow>

        </CardSectionWrapper>

    </CardContainer>
}

