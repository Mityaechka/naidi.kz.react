import {Button} from "../componets/Button";
import {observer} from "mobx-react";
import {useEffect} from "react";
import {ResumeCard} from "../componets/Resume";
import styled from "styled-components";

import LogoSmall from "../assets/logo-small.png"
import {useNavigate} from "react-router-dom";
import {user} from "../api/accountApi";
import {Activity} from "../models/Data";
import {ActivitySelectInput} from "../componets/app-input/ActivitySelecInput";
import {JobCard, Size} from "../componets/Job";
import {AppInput} from "../componets/app-input/AppInput";
import {Mail} from "react-feather"
import {device, useMedia} from "../hooks/mediaHook";
import {useStores} from "../store/RootStore";
import {ModalAuthWizard} from "../wizards/ModalAuthWizard";

const PageWrapper = styled.div`
  margin-top: 9px;
  justify-content: space-around;
  overflow-y: auto;
  height: 100%;
  padding-bottom: 100px;
  padding-left: 30px;
  padding-right: 30px;

  @media ${device.desktop} {
    padding: 0 170px;
    padding-bottom: 200px;
  }

  @media ${device.tablet} {
    padding: 0 76px;
    padding-bottom: 100px;
  }
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

  @media ${device.desktop} {
    font-weight: 700;
    font-size: 72px;
    line-height: 84px;
  }
  @media ${device.tablet} {
    font-weight: 700;
    font-size: 64px;
    line-height: 75px;
  }

`;

const TitleDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  margin: 0;
  padding: 0;

  @media ${device.desktop} {
    font-size: 36px;
    line-height: 42px;
  }
  @media ${device.tablet} {
    font-weight: 400;
    font-size: 36px;
    line-height: 42px;
  }

`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 32px;
  margin: 0 20px;
  justify-content: space-between;

  @media ${device.desktop} {
    margin: 0 200px;
  }
  @media ${device.tablet} {
    margin: 0 75px;
  }

`

const BadgeContainer = styled.div`
`;

const BadgeTitle = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  margin: 0;
  text-align: center;
  padding: 0 0 15px;

  @media ${device.desktop} {
    display: none;
  }
  @media ${device.tablet} {
    display: none;
  }

`

const ResumesContainer = styled.div`
  padding-top: 15px;
`

const ResumesWrapper = styled.div`
  @media ${device.tabletOrDesktop} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

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

  @media ${device.desktop} {
    margin-left: 100px;
    margin-right: 100px;
  }
`

const JobContainer = styled.div`
  padding-top: 15px;
  overflow: auto;
`

const JobWrapper = styled.div`
  padding-top: 30px;


`

const JobCardsContainer = styled.div`
  display: inline-flex;
  column-gap: 20px;
  overflow-x: auto;

  @media ${device.tabletOrDesktop} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 24px;
  }
`
const JobTitle = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  margin: 0;
  padding: 0;
  text-align: center;
`


export const MainPage = observer(() => {
    const {appState, userStore, modalStore} = useStores()
    const {isTabletOrDesktop, isMobile} = useMedia()
    const activities: Activity[] = [
        {name: "Электромонтажник", id: "1"},
        {name: "Продавец", id: "2"},
        {name: "Няня", id: "3"},
        {name: "Механик", id: "4"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},
        {name: "Водитель", id: "5"},

    ]


    const navigator = useNavigate();

    appState.setTitle("Главаня страница");

    const openAuth = () => {
        if (isMobile) {
            navigator("/auth")
            return
        }

        const wizard = ModalAuthWizard({modalStore: modalStore});

        wizard()

    }

    const openProfile = () => navigator("/user")


    return <PageWrapper>
        <AppBar>
            <AppBarLogo src={LogoSmall}/>
            <div>
                {!userStore.isAuth && <Button color="black" fullWidth={false} click={openAuth}>Войти</Button>}

                {userStore.isAuth && <Button color="yellow" fullWidth={false} click={openProfile}>Профиль</Button>}

            </div>
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
            <AppInput field="activitySearch" placeholder="Поиск работы"/>
        </SearchContainer>

        <BadgeContainer>
            <BadgeTitle>Популярные запросы</BadgeTitle>
            <ActivitySelectInput activities={activities}></ActivitySelectInput>

        </BadgeContainer>

        <ResumesContainer>
            <ResumesTitle>
                ВАКАНСИИ
            </ResumesTitle>
            <ResumesWrapper>
                <ResumeCard.Big/>
                <ResumeCard.Big/>
                <ResumeCard.Big/>
            </ResumesWrapper>
        </ResumesContainer>

        <JobContainer>
            <JobTitle>Найди работу</JobTitle>
            <JobWrapper>
                <JobCardsContainer>
                    <JobCard size={Size.Full}/>
                    <JobCard size={Size.Full}/>
                    <JobCard size={Size.Full}/>
                    <JobCard size={Size.Full}/>
                    <JobCard size={Size.Full}/>
                    <JobCard size={Size.Full}/>
                </JobCardsContainer>
            </JobWrapper>


        </JobContainer>
        <ListAreaContainer>
            <ListContainer>
                <ListTitle>Для поиска работы</ListTitle>
                <ListWrapper>
                    <ListItem>
                        <ListCounter>1</ListCounter>
                        <ListText>Заполни анкету за 1 минуту</ListText>
                    </ListItem>

                    <ListItem>
                        <ListCounter>2</ListCounter>
                        <ListText>Откликайтесь на интересующие объявления</ListText>
                    </ListItem>

                    <ListItem>
                        <ListCounter>3</ListCounter>
                        <ListText>Отвечайте на звонки и сообщения в WhatsApp </ListText>
                    </ListItem>
                </ListWrapper>

                <ListButtonContainer>
                    <Button color="yellow" fullWidth={false}>Ищу работу</Button>
                </ListButtonContainer>
            </ListContainer>

            <ListContainer>
                <ListTitle>Для поиска работника</ListTitle>
                <ListWrapper>
                    <ListItem>
                        <ListCounter>1</ListCounter>
                        <ListText>Разместите бесплатное объявление</ListText>
                    </ListItem>

                    <ListItem>
                        <ListCounter>2</ListCounter>
                        <ListText>Изучите анкеты кандидатов</ListText>
                    </ListItem>

                    <ListItem>
                        <ListCounter>3</ListCounter>
                        <ListText>Свяжитесь с теми, кто вам приглянется</ListText>
                    </ListItem>
                </ListWrapper>
                <ListButtonContainer>
                    <Button color="yellow" fullWidth={false}>Ищу работника</Button>
                </ListButtonContainer>
            </ListContainer>
        </ListAreaContainer>
        <MailContainer>
            <MailTitle>Оставьте свой email и получайте новые объявления</MailTitle>

            <AppInput field="mail" placeholder="ivanov@gmail.com" icon={<Mail className="input-icon"/>}/>
            <MailButtonWrapper><Button fullWidth={!isTabletOrDesktop}>Отправить</Button></MailButtonWrapper>

        </MailContainer>
    </PageWrapper>
})

const MailContainer = styled.div`
  padding-top: 32px;

  @media ${device.desktop} {
    margin: 0 20vh;
  }

  @media ${device.tablet} {
    margin: 0 10vh;
  }
`

const MailButtonWrapper = styled.div`
  display: flex;
`

const MailTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 112%;

  text-align: center;
  text-transform: uppercase;
  margin: 0 auto;
  display: table;
`

const ListContainer = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 30px;
`

const ListTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 112%;
  text-align: center;
  text-transform: uppercase;
  margin: 0 auto;
  display: table;
`

const ListWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`
const ListButtonContainer = styled.div`
  display: none;

  @media ${device.desktop} {
    display: flex;
    margin-top: 24px;
  }

  @media ${device.tablet} {
    display: flex;
    margin-top: 24px;
  }
`

const ListItem = styled.div`
  display: inline-flex;

`

const ListCounter = styled.span`
  display: block;
  font-weight: 600;
  font-size: 24px;
  line-height: 112%;
  text-align: center;
  overflow: unset;

  margin: 5px 17px 5px 5px;
`

const ListText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ListAreaContainer = styled.div`
  @media ${device.desktop} {
    display: flex;
    margin-top: 60px;
    justify-content: center;
  }
`

