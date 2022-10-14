import {useStores} from "../../store/RootStore";
import {useEffect, useState} from "react";
import {City, Resume} from "../../models/Data";
import {getUserResumes} from "../../api/resume-api";
import {ResumeCard} from "../../componets/Resume";
import {ResumeComponent} from "../../componets/resumes/resume";
import {HeaderWithUser} from "../../componets/resumes/headers";
import {inspect} from "util";
import styled from "styled-components";
import {Button} from "../../componets/Button";
import {useNavigate} from "react-router-dom";


const ResumesContainer = styled.div`
  display: flex;
  column-gap: 15px;
  padding: 0 10px;
`

export const UserResumesView = () => {
    const navigation = useNavigate()
    const {cacheStore, appState} = useStores()

    appState.setTitle("Мои резюме")
    appState.setSection("my-resumes")

    const [resumes, setResumes] = useState<Resume[]>([])
    const [cities, setCities] = useState<City[]>([])

    useEffect(() => {
        cacheStore.getAllCities().then(citiesResult => {
            if (!citiesResult) {
                alert("ERROR");
                return
            }

            setCities(citiesResult);
        })
    }, [])

    useEffect(() => {
        getUserResumes().then(resumesResult => {
            if (!resumesResult.isSuccess) {
                return
            }

            setResumes(resumesResult.result!)
        })
    }, [cities])


    return <ResumesContainer>
        {resumes.map(resume => <>
                <ResumeComponent border="left" header={<HeaderWithUser date={new Date()}
                                                                       surname={`${resume.user.firstName} ${resume.user.lastName}`}/>}/>
                <ResumeComponent border="left" header={<HeaderWithUser date={new Date()}
                                                                       surname={`${resume.user.firstName} ${resume.user.lastName}`}/>}/>


            </>
        )}

        <Button color="yellow" click={() => navigation("/user/resumes/create")}>Создать нове резюме</Button>
    </ResumesContainer>
}