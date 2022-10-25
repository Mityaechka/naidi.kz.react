import {ModerationResumeRequest} from "../../models/user-data";
import moment from "moment";
import {localize} from "../../helpers/localization";
import {AppButton} from "../app-input/app-button";
import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
`

export const ResumeRequestView = ({request, onClick}: { request: ModerationResumeRequest, onClick: () => void }) => {
    return <div>
        <span>{localize(request.resume.activity.name)}</span>|
        <span>Время создания: {moment(request.createdAt).format('DD.MM.yyyy HH:mm')}</span>
        <AppButton type="button" color="yellow" fullWidth={false} click={onClick}>Проверить</AppButton>
    </div>
}