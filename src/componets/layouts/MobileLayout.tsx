import {ReactNode} from "react";
import {MobileBar} from "../MobileBar";
import {LoadingSpinner} from "../LoadingSpinner";
import {useStores} from "../../store/RootStore";

export const MobileLayout = ({children, top}:{children: ReactNode, top: ReactNode}) => {
    const {appState} = useStores()

    return <div className="mobile-layout__container">
        <div>{top}</div>
        {children}

        {/*<div className="mobile-layout__center-child">{center}</div>*/}
    </div>
}

export const MobileStretchContainer = ({body, bottom}:{body: ReactNode, bottom?: ReactNode}) => {
    return <>
        <div className="mobile-layout__center-child">{body}</div>
        <div className="mobile-flex-container__bottom">{bottom}</div>
    </>
}