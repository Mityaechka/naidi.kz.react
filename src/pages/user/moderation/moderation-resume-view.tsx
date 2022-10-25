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
import {ModerationResumeRequest} from "../../../models/user-data";
import {ResumeRequestView} from "../../../componets/user/resume-request-view";


const ComponentContainer = styled.div`

`

const RequestsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`

export const ModerationResumeView = () => {
    const navigation = useNavigate()
    const {cache, app, modal} = useStores()


    app.setSection("moderation-resumes")

    const [requests, setResumeRequests] = useState<ModerationResumeRequest[]>([])


    useEffect(() => {
        updateAllResumeRequests();
    }, [])

    const updateAllResumeRequests = () => {
        api.moderator.getResumeRequests().then(resumesResult => {
            if (!resumesResult.isSuccess) {
                return
            }

            setResumeRequests(resumesResult.result!)
        })
    }


    return <ComponentContainer>
        <RequestsWrapper>
            {requests.map(x => <ResumeRequestView request={x}
                                                  onClick={() => navigation(`/admin/moderation/resumes/${x.id}`)}/>)}

        </RequestsWrapper>


    </ComponentContainer>
}