import {CSSProperties} from "react";

export const Yellow = "#F9CF21";
export const Gray = "rgba(32,32,32,0.50)";

export const Colors = {
    Yellow,
    Gray
};

export const margin = (value: string): CSSProperties => {
    return {
        margin: value
    };
}

export const flex = (): CSSProperties => {
    return {display: "flex"};
}