import BackBtnIcon from "../assets/icons/back-btn-icon.png";
import {useStores} from "../store/AppStateStore";

export const MobileBar = ({title}: { title: string }) => {

    return <div className="mobile-bar__wrapper">
        <div className="mobile-bar__button">
            <IconButton icon={BackBtnIcon}/>
        </div>

        <h1 className="mobile-bar__title">{title}</h1>

        <div className="mobile-bar__button">
            {/*<IconButton icon={BackBtnIcon}/>*/}
        </div>

    </div>
}


export const IconButton = ({
                               icon,
                               click = undefined,
                               size = undefined
                           }: { icon: any, click?: () => void, size?: number }) => {
    return <button className="icon-button"
                   style={{width: size, height: size}}
                   onClick={() => {
                       if (click) {
                           click();
                       }
                   }}>
        <img src={icon} style={{width: size}}/>
    </button>
}