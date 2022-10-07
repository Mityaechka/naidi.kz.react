import {CSSProperties, ReactNode} from "react";

export type BlockProps = {
    children: ReactNode,
    centred?: boolean,
    style?: CSSProperties | undefined
}

export const Block = ({children, centred = false, style = undefined}: BlockProps) => {
    return <div className={`block ${!centred ? '' : 'block__centred'}`} style={style}>{children}</div>
}

export const FlexContainer = ({
                                  children,

                              }: { children: ReactNode, }) => {
    return <div className="flex-container__space">
        {children}
    </div>
}