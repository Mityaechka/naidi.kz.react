export enum Gender {
    Male,
    Female
}

export namespace Gender {
    export const toNameString = (gender?: Gender) => {
        if(gender == undefined){
            return  "";
        }

        switch (gender) {
            case Gender.Female:
                return "Жен."
            case Gender.Male:
                return "Муж."
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

export type User = {
    id: string,
    firstName?: string,
    secondName?: string,
    lastName?: string,
    phone: string,
    birthDate?: Date,
    gender?: Gender,
    destination?: Destination
}

export namespace User {
    export const fullName = (user?: User) =>{
        if(!user){
            return undefined
        }

        return `${user.firstName ?? ''} ${user.secondName ?? ''} ${user.lastName ?? ''}`.trim()
    }
}

export type Destination = {
    area?: {id: string, name: Localized},
    city?: {id: string, areaId: string, name: Localized},
}

export type Resume = {
    id: string,
    user: User,
    activity: Activity,
    destination: Destination,
    description: string,

}

export type Localized = {
    ru: string,
    kz: string
}