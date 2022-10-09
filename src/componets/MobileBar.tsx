import BackBtnIcon from "../assets/icons/back-btn-icon.png";
import {Action} from "../pages/Auth";

export const MobileBar = ({title, backClick = undefined}: { title: string, backClick?: Action }) => {

    return <div className="mobile-bar__wrapper">
        <div className="mobile-bar__button">
            <IconButton icon={BackBtnIcon} click={backClick}/>
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