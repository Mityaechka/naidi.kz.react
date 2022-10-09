import {observer} from "mobx-react";
import {LoadingSpinner} from "../LoadingSpinner";
import {Outlet} from "react-router-dom";
import {useStores} from "../../store/RootStore";
import {login, user} from "../../api/accountApi";
import ReactModal from "react-modal";
import {useEffect} from "react";

export const AppLayout = observer(() => {
    const {appState, userStore, modalStore} = useStores();

    useEffect(() =>{
        user().then(result => {
            if (result.isSuccess) {
                userStore.setUser(result.result)
            } else {
                userStore.setUser(undefined)
            }
        })
    }, [])

    return <>
        {appState.loading && <LoadingSpinner/>}

        {modalStore.isOpen && <ReactModal
            isOpen={modalStore.isOpen}
            style={modalStore.style}>
            {modalStore.child}
        </ReactModal>
        }

        <Outlet/>
    </>
})