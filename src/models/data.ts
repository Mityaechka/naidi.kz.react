import {localize} from '../helpers/localization'
import {toPrimitive} from "mobx/dist/utils/utils";

export enum Gender {
    Male,
    Female
}

export namespace Gender {
    export const toNameString = (gender?: Gender) => {
        if (gender == undefined) {
            return ''
        }

        switch (gender) {
            case Gender.Female:
                return 'Жен.'
            case Gender.Male:
                return 'Муж.'
        }
    }
}

export type Area = {
    id: string,
    name: Localized
}

export type City = {
    id: number,
    name: Localized,
    areaId: string
}

export type Activity = {
    name: Localized,
    id: string
}

export type Client = {
    id: string,
    firstName?: string,
    secondName?: string,
    lastName?: string,
    phone: string,
    birthDate?: Date,
    gender?: Gender,
    destination?: Destination
}

export namespace Client {
    export const fullName = (client?: Client) => {
        if (!client) {
            return undefined
        }

        return `${client.firstName ?? ''} ${client.secondName ?? ''} ${client.lastName ?? ''}`.trim()
    }
}

export type Destination = {
    area?: { id: string, name: Localized },
    city?: { id: string, areaId: string, name: Localized },
}

export namespace Destination {
    export const fullDestination = (destination?: Destination) => {
        if (!destination) {
            return ''
        }

        const value = []

        if (destination.area) {
            value.push(localize(destination?.area?.name))
        }

        if (destination.city) {
            value.push(localize(destination.city?.name))
        }

        return value.join(', ').trim()
    }
}

export type Resume = {
    id: string,
    client: Client,
    activity: Activity,
    destination: Destination,
    description: Localized,
    state: ResumeState
}

export type Localized = {
    ru: string,
    kz: string
}

export enum ResumeState {
    Editing,
    Moderation,
    Published,
    Rejected
}

export namespace ResumeState {
    export const toLocalized = (state: ResumeState): Localized => {
        if (state == ResumeState.Editing) {
            return {ru: 'Редактируется', kz: 'Редактируется'}
        }

        if (state == ResumeState.Moderation) {
            return {ru: 'На модерации', kz: 'На модерации'}
        }

        if (state == ResumeState.Rejected) {
            return {ru: 'Отклонено', kz: 'Отклонено'}
        }

        return {ru: 'Опубликовано', kz: 'Опубликовано'}


    }
}

export type AppRange<T> = {
    from?: T,
    to?: T
}

export namespace AppRange {
    export const create = <T>(from: T | undefined = undefined, to: T | undefined = undefined): AppRange<T> => {
        return {from: from, to: to}
    }
}