import {MobileStretchContainer, MobileLayout} from "../componets/layouts/MobileLayout";
import {MobileBar} from "../componets/MobileBar";
import {Block} from "../componets/Block";
import {Button} from "../componets/Button";
import {observer} from "mobx-react";
import {StoreContext, useStores} from "../store/AppStateStore";
import {useContext, useEffect} from "react";
import {DatePicker, Input, Select, TextArea} from "../componets/Input";
import {ResumeCard} from "../componets/Resume";
import styled from "styled-components";

import LogoSmall from "../assets/logo-small.png"
import {theme} from "../index";
import {Badge} from "../componets/Badge";
import {useNavigate} from "react-router-dom";
import {checkPhone, user} from "../api/accountApi";

const PageWrapper = styled.div`
  margin-top: 9px;
  justify-content: space-around;
  overflow-y: auto;
`

const AppBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AppBarLogo = styled.img`
  height: 20px;
`;

const TitleWrapper = styled.div`
  margin-top: 23px;
  margin-bottom: 16px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 25px;
  line-height: 29px;
  text-align: center;
  margin: 0 0 8px 0;
  padding: 0;
`;

const TitleDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  margin: 0;
  padding: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 32px;
  margin: 0 20px;
  justify-content: space-between;
`

const BadgeContainer = styled.div`
`;

const BadgeTitle = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  margin: 0;
  padding: 0;
  text-align: center;
`

const ResumesContainer = styled.div`

`

const ResumesTitle = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  margin: 0;
  padding: 0;
  text-align: center;
`

const SearchContainer = styled.div`
  margin: 24px 0;
`


export const MainPage = observer(() => {
    checkPhone("dsdsf")
    const {appState} = useStores()

    const navigator = useNavigate();

    useEffect(() => {
        user().then(console.log)
    },[])

    appState.setTitle("Главаня страница");

    const openAuth = () => {
        navigator("/auth")
    }

    return <PageWrapper>
        <Block>

            <AppBar>
                <AppBarLogo src={LogoSmall}/>
                <div><Button color="black" fullWidth={false} click={openAuth}>Войти</Button></div>
            </AppBar>

            <TitleWrapper>
                <Title>
                    Найди работу легко!
                </Title>
                <TitleDescription>
                    Заполни анкету за 1 минуту
                </TitleDescription>
            </TitleWrapper>

            <ButtonsContainer>
                <Button color="yellow">Ищу работу</Button>
                <Button color="yellow">Ищу работника</Button>
            </ButtonsContainer>

            <SearchContainer>
                <Input placeholder="Поис работы"/>
            </SearchContainer>

            <BadgeContainer>
                <BadgeTitle>Популярные запросы</BadgeTitle>
            </BadgeContainer>

            <ResumesContainer>
                <ResumesTitle>
                    ВАКАНСИЯ
                </ResumesTitle>

                <ResumeCard.Big/>
                <ResumeCard.Big/>
                <ResumeCard.Big/>
            </ResumesContainer>

        </Block>
    </PageWrapper>
})