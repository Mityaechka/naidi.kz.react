import {useStores} from '../../../store/root-store'
import {useEffect, useState} from 'react'
import {City, Resume, ResumeState} from '../../../models/data'
import {ResumeComponent} from '../../../componets/resumes/resume'
import {HeaderBase} from '../../../componets/resumes/header/header-base'
import {inspect} from 'util'
import styled from 'styled-components'
import {AppButton} from '../../../componets/app-input/app-button'
import {useNavigate} from 'react-router-dom'
import {BodyOwner} from '../../../componets/resumes/body/body-owner'
import {device} from '../../../hooks/mediaHook'
import {Menu, MenuButton, MenuItem} from '@szhsin/react-menu'
import api from '../../../api'
import {usePermanentToggle} from '../../../hooks/useToggle'
import {PopupMenuItem} from '../../../componets/popup-menu/popup-menu'


const ResumesContainer = styled.div`

`

const ResumesWrapper = styled.div`
  @media ${device.desktop} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
`

export const ClientResumeView = () => {
    const navigation = useNavigate()
    const {cache, app, modal} = useStores()

    app.setTitle('Мои резюме')
    app.setSection('my-resumes')

    const [resumes, setResumes] = useState<Resume[] | undefined>(undefined)

    app.setMenuItems([
        {title: 'Создать резюме', onClick: () => navigation('/client/resumes/create')}
    ])

    useEffect(() => {
        updateAllResumes()
    }, [])

    const updateAllResumes = () => {
        api.resume.getClientResumes().then(resumesResult => {
            if (!resumesResult.isSuccess) {
                return
            }

            setResumes(resumesResult.result!)
        })
    }

    const sendResumeToModeration = (resume: Resume) => {
        app.withLoading(api.resume.sendToModeration(resume.id)).then(result => {
            updateAllResumes()

        })
    }

    const editResume = (resume: Resume) => {
        navigation(`/client/resumes/${resume.id}/edit`)
    }

    return <ResumesContainer>
        <ResumesWrapper>
            {resumes &&
                <>
                    {resumes.length == 0 ?
                        <>
                            <AppButton color="yellow" click={() => navigation('/client/resumes/create')}>Создать нове
                                резюме</AppButton>
                        </> :
                        <>
                            {resumes.map(resume => <>
                                    <ResumeComponent border="left"
                                                     header={<HeaderBase resume={resume}
                                                                         menuItems={[
                                                                             {
                                                                                 title: 'Редактировать',
                                                                                 onClick: () => editResume(resume)
                                                                             },
                                                                             resume.state == ResumeState.Editing ?
                                                                                 {
                                                                                     title: 'Отправить на модерацию',
                                                                                     onClick: () => sendResumeToModeration(resume)
                                                                                 } : undefined
                                                                         ]}
                                                     />
                                                     }
                                                     body={<BodyOwner resume={resume}/>}
                                    />
                                </>
                            )}
                        </>

                    }
                </>
            }

        </ResumesWrapper>


    </ResumesContainer>
}