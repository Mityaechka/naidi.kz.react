import {MobileBar, MobileBarExtension} from "../../../componets/mobile-bar";
import {useStores} from "../../../store/root-store";
import {useApiCall} from "../../../hooks/usePromises";
import api from "../../../api";
import {appLoading} from "../../../store/app-state-store";
import {ResumeComponent} from "../../../componets/resumes/resume";
import {HeaderBase} from "../../../componets/resumes/header/header-base";
import {BodyOwner} from "../../../componets/resumes/body/body-owner";
import {BodyBase} from "../../../componets/resumes/body/body-base";
import {Sliders, X} from "react-feather";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {Activity, Resume} from "../../../models/data";
import {ResumeFilterResult, ResumeFilters} from "../../../componets/filter/filter";
import {BaseText} from "../../../componets/styles";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  margin: 10px 20px;
`

export const ResumeSearch = () => {
    const {app} = useStores()
    const navigator = useNavigate()
    const [filters, setFilters] = useState<ResumeFilterResult | undefined>(undefined)
    const [resumes, setResumes] = useState<Resume[]>([])

    console.log(filters)
    useEffect(() => {
        loadResumes()

    }, [filters])
    useEffect(() => {
        loadResumes()
    }, [])

    const [showFilters, setShowFilters] = useState(false)


    const loadResumes = () => {
        console.log(filters)
        api.resume.findResumes(filters ?? {}).then(result => {
            if (!result.isSuccess) {
                return
            }

            setResumes(result.result)
        })
    }
    if (showFilters) {
        return <ResumeFilters onClose={() => setShowFilters(false)} onChange={setFilters} init={filters}/>
    }

    return <>
        <MobileBar title="Посик резюме" backClick={() => navigator('/')}/>
        <Container>
            <FilterButtonWrapper>
                <FilterButtonContainer onClick={() => setShowFilters(true)}>
                    <Sliders/>
                    <FilterButtonText>Фильтры</FilterButtonText>
                </FilterButtonContainer>
            </FilterButtonWrapper>
            {resumes.length == 0 &&
                <span>По Вашему запросу ничего не найдено</span>
            }

            {resumes.length != 0 && resumes.map(resume => <>
                <ResumeComponent border="left"
                                 header={<HeaderBase resume={resume}/>}
                                 body={<BodyBase resume={resume}/>}
                />
            </>)}
        </Container>

    </>
}
const FilterButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
const FilterButtonContainer = styled.div`
  float: right;
  margin-left: auto;
  margin-right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 5px;
`
const FilterButtonText = styled(BaseText)`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`