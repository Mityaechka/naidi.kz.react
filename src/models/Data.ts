export enum Gender {
    Male,
    Female
}

export namespace Gender {
    export const toString = (gender:Gender) => {
        switch (gender) {
            case Gender.Female:
                return "Жен."
            case Gender.Male:
                return "Муж."
        }
    }
}

export type Area =  {
    id: string,
    name: string
}

export type City = {
    id: number,
    name: string,
    areaId: string
}

export type Activity = {
    name: string,
    id: string
}

export type User = {

}