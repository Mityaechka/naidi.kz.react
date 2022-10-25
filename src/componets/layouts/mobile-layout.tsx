import {ReactNode} from "react";
import {MobileBar} from "../mobile-bar";
import {LoadingSpinner} from "../loading-spinner";
import {useStores} from "../../store/root-store";

export const MobileLayout = ({children, top}:{children: ReactNode, top: ReactNode}) => {
    const {app} = useStores()

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