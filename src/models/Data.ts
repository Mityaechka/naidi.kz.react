export enum Gender {
    Male,
    Female
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