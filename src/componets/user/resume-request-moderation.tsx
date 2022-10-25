import {ModerationResumeRequest, RejectReason} from "../../models/user-data";
import {AppButton} from "../app-input/app-button";
import {AppInput, AppSelect, AppTextArea} from "../app-input/app-input";
import {localize} from "../../helpers/localization";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../api";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {ApproveData, RejectData} from "../../api/moderator-api";
import {useStores} from "../../store/root-store";

export enum ModerationState {
    None,
    Approve,
    Reject
}

export const ResumeRequestModeration = () => {
    const {resumeId} = useParams();

    const [request, setRequest] = useState<ModerationResumeRequest | undefined>(undefined)

    const [moderationState, setModerationState] = useState<ModerationState>(ModerationState.None);

    useEffect(() => {
        api.moderator.getResumeRequest(resumeId as string).then(result => {
            setRequest(result.result)
        })
    }, [])

    if (!request) {
        return <div></div>
    }

    return <div>
        <AppInput field="activity" label="Работа" value={localize(request.resume.activity.name)} disabled={true}/>
        <div>
            <AppInput field="areaId" label="Область" value={localize(request.resume.destination.area?.name)}
                      disabled={true}/>
            <AppInput field="cityId" label="Город" value={localize(request.resume.destination.city?.name)}
                      disabled={true}/>
        </div>


        <AppTextArea field="description" label="Описание" value={request.resume.description.source} disabled={true}/>

        <ButtonsContainer>
            <AppButton color="yellow" click={() => setModerationState(ModerationState.Approve)}>К публикацие</AppButton>
            <AppButton color="black" click={() => setModerationState(ModerationState.Reject)}>К отказу</AppButton>
        </ButtonsContainer>
        {moderationState == ModerationState.Approve && <ResumeApproveComponent request={request}/>}
        {moderationState == ModerationState.Reject && <ResumeRejectComponent request={request}/>}
    </div>
}

const ResumeApproveComponent = ({request}: { request: ModerationResumeRequest }) => {
    const {app} = useStores()
    const navigation = useNavigate()

    type FormData = {
        descriptionLang: "ru" | "kz",
        descriptionTranslate: string
    }

    const {register, watch, handleSubmit, formState: {errors}} = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data)
        const approveData: any = {

        }
        if(!request.resume.description.isFieldModerated) {
            approveData.description = {
                ru: data.descriptionLang == "ru" ? request.resume.description.source : data.descriptionTranslate,
                kz: data.descriptionLang == "kz" ? request.resume.description.source : data.descriptionTranslate,
            }
        }

        app.withLoading(api.moderator.approveRequest(request.id, approveData)).then(result => {
            if (!result.isSuccess) {
                return;
            }
            navigation('/admin/moderation/resumes')
        })
        console.log(approveData)
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Заполните эти поля перед публикацией резюме</h4>
        <h5>Описание</h5>
        {request.resume.description.isFieldModerated && <p>Так как описание не было изменено, перевод не требуется</p>}
        {!request.resume.description.isFieldModerated &&
            <>
                <AppSelect field="descriptionLang"
                           label="Языка оригинала"
                           options={[
                               {value: "ru", title: "Русский"},
                               {value: "kz", title: "Казахский"}
                           ]}
                           {...register("descriptionLang",)} disabled={request.resume.description.isFieldModerated}/>

                <AppTextArea field="descriptionTranslate"
                             errors={errors}
                             label="Перевод"
                             {...register("descriptionTranslate", {required: "Укажите перевод"})}/>
            </>
        }

        <AppButton type="submit" color="yellow">Опубликовать</AppButton>
    </form>
}

const ResumeRejectComponent = ({request}: { request: ModerationResumeRequest }) => {
    const {app} = useStores()
    const navigation = useNavigate()

    type FormData = {
        rejectReason: RejectReason
    }

    const {register, watch, handleSubmit, formState: {errors}} = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data)
        const rejectData: RejectData = {
            rejectItems: [
                {reason: data.rejectReason}
            ]
        }

        app.withLoading(api.moderator.rejectRequest(request.id, rejectData)).then(result => {
            if (!result.isSuccess) {
                return;
            }
            navigation('/admin/moderation/resumes')
        })
        console.log(rejectData)
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <AppSelect field="rejectReason" label="Причина отказа" options={[
            {
                value: RejectReason.InvalidDescription,
                title: localize(RejectReason.ToLocalized(RejectReason.InvalidDescription))
            },
        ]}
                   {...register("rejectReason",)}/>

        <AppButton type="submit" color="yellow">Вернуть на доработку</AppButton>
    </form>
}

const ButtonsContainer = styled.div`
  column-gap: 20px;
  display: flex;
`