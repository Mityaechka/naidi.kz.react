import {Activity, Destination, Localized} from './data'
import {routes} from '../routes'
import {SelectOption} from '../componets/app-input/app-input'
import {localize} from '../helpers/localization'


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
    		return {ru: 'Некорректное описание', kz: 'Некорректное описание'}
    	}
    }
}

export enum UserRole {
    None,
    Admin,
    Moderator
}

export namespace UserRole {
    export const toLocalized = (role: UserRole): Localized => {
    	switch (role) {
    	case UserRole.Admin:
    		return {ru: 'Администратор', kz: 'Администратор'}
    	case UserRole.Moderator:
    		return {ru: 'Модератор', kz: 'Модератор'}
    	default:
    		return {ru: '', kz: ''}
    	}
    }

    export const options = (): SelectOption[] => [
    	{value: UserRole.Admin, title: localize(toLocalized(UserRole.Admin))},
    	{value: UserRole.Moderator, title: localize(toLocalized(UserRole.Moderator))},
    ]
}

export type User = {
    id: string,
    fio: string,
    email: string,
    role: UserRole
}