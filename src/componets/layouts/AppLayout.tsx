import {observer} from "mobx-react";
import {useStores} from "../../store/AppStateStore";
import {useMedia} from "../../hooks/mediaHook";
import {LoadingSpinner} from "../LoadingSpinner";
import {Outlet} from "react-router-dom";

export const AppLayout = observer(() => {
    const {appState} = useStores();


    return <>
        {appState.loading && <LoadingSpinner/>}
        <Outlet/>
    </>
})