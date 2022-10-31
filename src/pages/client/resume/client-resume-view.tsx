import {useStores} from "../../../store/root-store";
import {useEffect, useState} from "react";
import {City, Resume, ResumeState} from "../../../models/data";
import {ResumeComponent} from "../../../componets/resumes/resume";
import {OwnerHeader} from "../../../componets/resumes/header/owner-header";
import {inspect} from "util";
import styled from "styled-components";
import {AppButton} from "../../../componets/app-input/app-button";
import {useNavigate} from "react-router-dom";
import {OwnerBody} from "../../../componets/resumes/body/owner-body";
import {device} from "../../../hooks/mediaHook";
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";
import api from "../../../api";
import {usePermanentToggle} from "../../../hooks/useToggle";


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

    app.setTitle("Мои резюме")
    app.setSection("my-resumes")

    const [resumes, setResumes] = useState<Resume[] | undefined>(undefined)

    const menuItems = <>
        <MenuItem onClick={() =>  navigation(`/client/resumes/create`)}>Создать резюме</MenuItem>
    </>

    app.setMenuItems(menuItems)

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
                            <AppButton color="yellow" click={() => navigation("/client/resumes/create")}>Создать нове
                                резюме</AppButton>
                        </> :
                        <>
                            {resumes.map(resume => <>
                                    <ResumeComponent border="left"
                                                     header={<OwnerHeader date={new Date()}
                                                                          surname={`${resume.client.firstName} ${resume.client.lastName}`}
                                                                          menuItems={<>
                                                                              <MenuItem
                                                                                  onClick={() => editResume(resume)}>Редактировать</MenuItem>
                                                                              {resume.state == ResumeState.Editing &&
                                                                                  <MenuItem
                                                                                      onClick={() => sendResumeToModeration(resume)}>Отправить
                                                                                      на модерацию</MenuItem>}
                                                                          </>
                                                                          }
                                                     />
                                                     }
                                                     body={<OwnerBody resume={resume}/>}
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