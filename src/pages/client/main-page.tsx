import {AppButton} from '../../componets/app-input/app-button'
import {observer} from 'mobx-react'
import {useEffect} from 'react'
import styled from 'styled-components'

import Logo from '../../assets/logo.png'
import {useNavigate} from 'react-router-dom'
import {Activity} from '../../models/data'
import {ActivitySelectInput} from '../../componets/app-input/activity-select-input'
import {JobCard, Size} from '../../componets/job-card'
import {AppInput} from '../../componets/app-input/app-input'
import {Mail} from 'react-feather'
import {device, useMedia} from '../../hooks/mediaHook'
import {useStores} from '../../store/root-store'
import {ModalAuthWizard} from '../../wizards/ModalAuthWizard'

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
`

const AppBarLogo = styled.img`
  height: 70px;
`

const TitleWrapper = styled.div`
  margin-top: 23px;
  margin-bottom: 16px;
`

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

`

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

`

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
`

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
  @media ${device.desktop} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    column-gap: 5vw;
  }
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    column-gap: 1vw;
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
  overflow: hidden;
`

const JobWrapper = styled.div`
  padding-top: 30px;
  overflow-x: auto;

`

const JobCardsContainer = styled.div`
  display: inline-flex;
  column-gap: 20px;
  overflow-x: auto;

  @media ${device.tabletOrDesktop} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 5vw;
    row-gap: 10px;
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
	const {app, client, modal} = useStores()
	const {isTabletOrDesktop, isMobile} = useMedia()
	const activities: Activity[] = [
		{
			name: {
				ru: 'Электромонтажник',
				kz: 'Электромонтажник'
			},
			id: '1'
		},
		{
			name: {
				ru: 'Водитель',
				kz: 'Водитель'
			},
			id: '2'
		},
		{
			name: {
				ru: 'Няня',
				kz: 'Няня'
			},
			id: '3'
		},
		{
			name: {
				ru: 'Продавец',
				kz: 'Продавец'
			},
			id: '4'
		},
		{
			name: {
				ru: 'Оператор',
				kz: 'Оператор'
			},
			id: '5'
		},
		// {name: "Продавец", id: "2"},
		// {name: "Няня", id: "3"},
		// {name: "Механик", id: "4"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},
		// {name: "Водитель", id: "5"},

	]


	const navigator = useNavigate()

	app.setTitle('Главаня страница')

	const openAuth = () => {
		if (isMobile) {
			navigator('/auth')
			return
		}

		const wizard = ModalAuthWizard({modalStore: modal})

		wizard()

	}

	const openProfile = () => navigator('/client')

	const findResumes = () => navigator("/search/resumes")


	return <PageWrapper>
		<AppBar>
			<AppBarLogo src={Logo}/>
			<div>
				{!client.isAuth && <AppButton color="black" fullWidth={false} click={openAuth}>Войти</AppButton>}

				{client.isAuth && <AppButton color="yellow" fullWidth={false} click={openProfile}>Профиль</AppButton>}

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
			<AppButton color="yellow" fullWidth={false}>Найди работу</AppButton>
			<AppButton color="yellow" fullWidth={false} click={findResumes}>Найди работника</AppButton>
		</ButtonsContainer>

		<SearchContainer>
			<AppInput field="activitySearch" placeholder="Поиск работы"/>
		</SearchContainer>

		<BadgeContainer>
			<BadgeTitle>Популярные запросы</BadgeTitle>
			<ActivitySelectInput activities={activities}></ActivitySelectInput>

		</BadgeContainer>

		{/*<ResumesContainer>*/}
		{/*    <ResumesTitle>*/}
		{/*        ГОРЯЧИЕ ВАКАНСИИ*/}
		{/*    </ResumesTitle>*/}
		{/*    <ResumesWrapper>*/}
		{/*        ВАКАНСИИИ*/}
		{/*    </ResumesWrapper>*/}
		{/*</ResumesContainer>*/}

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
					<AppButton color="yellow" fullWidth={false} click={() => navigator("/search/resumes")}>Найди работу</AppButton>
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
					<AppButton color="yellow" fullWidth={false} click={findResumes}>Найди работника</AppButton>
				</ListButtonContainer>
			</ListContainer>
		</ListAreaContainer>
		<MailContainer>
			<MailTitle>Оставьте свой email и получайте новые объявления</MailTitle>

			<AppInput field="mail" placeholder="ivanov@gmail.com" icon={<Mail className="input-icon"/>}/>
			<MailButtonWrapper><AppButton fullWidth={!isTabletOrDesktop}>Отправить</AppButton></MailButtonWrapper>

		</MailContainer>
	</PageWrapper>
})

const MailContainer = styled.div`
  padding-top: 32px;

  @media ${device.desktop} {
    margin: 0 20vw;
  }

  @media ${device.tablet} {
    margin: 0 10vw;
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

