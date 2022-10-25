import {Activity, Destination, Localized} from "./data";

export type ModerationResumeRequest = {
    id: string,
    createdAt: Date,
    resume: ModerationResume
}

export type ModerationResume = {
    activity: Activity,
    description: ModeratedField,
    destination: Destination
}

export type ModeratedField = {
    source: string,
    kz: string,
    ru: string,
    isFieldModerated: boolean
}

export enum RejectReason {
    InvalidDescription
}

export namespace RejectReason {
    export const ToLocalized = (reason: RejectReason): Localized => {
        switch (reason) {
            case RejectReason.InvalidDescription:
                return {ru: "Некорректное описание", kz: "Некорректное описание"}
        }
    }
}