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
import {ModerationResumeRequest, User, UserRole} from "../../../models/user-data";
import DataTable, {TableColumn} from "react-data-table-component";
import {localize} from "../../../helpers/localization";
import {MoreVertical} from "react-feather";
import moment from "moment/moment";


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

    const columns: TableColumn<ModerationResumeRequest>[] = [
        {
            name: 'Работа',
            selector: row => localize(row.resume.activity.name),
        },
        {
            name: 'Время создания',
            selector: row => moment(row.createdAt).format('DD.MM.yyyy HH:mm'),
        },
        {
            name: '',
            selector: row => row.id,
            cell: row => <AppButton fullWidth={false} color="yellow" click={() => navigation(`/admin/moderation/resumes/${row.id}`)}>Проверить</AppButton>
        }
    ]


    return <ComponentContainer>
        <DataTable data={requests}
                   columns={columns}/>


    </ComponentContainer>
}