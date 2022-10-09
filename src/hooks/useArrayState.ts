import {Dispatch, SetStateAction, useState} from "react";

export const useArrayState = <T>(defaultValue: T[]): [T[],
    (value: T) => void,
    (predicate: (value: T, index: number, array: T[]) => boolean) => void,
    Dispatch<SetStateAction<T[]>>
] => {
    const [arr, setArray] = useState<T[]>(defaultValue);

    const addElement = (value: T) => setArray(oldArray => [...oldArray, value]);
    const filterElement = (predicate: (value: T, index: number, array: T[]) => boolean) => setArray(oldArray => [...oldArray.filter(predicate)]);

    return [arr, addElement, filterElement, setArray];
};