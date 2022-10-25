import {observer} from "mobx-react";
import {LoadingSpinner} from "../loading-spinner";
import {Outlet} from "react-router-dom";
import {useStores} from "../../store/root-store";
import ReactModal from "react-modal";
import {useEffect} from "react";
import api from "../../api";

export const AppLayout = observer(() => {
    const {app, user, modal} = useStores();

    useEffect(() =>{
        api.account.getUser().then(result => {
            if (result.isSuccess) {
                user.setUser(result.result)
            } else {
                user.setUser(undefined)
            }
        })
    }, [])

    return <>
        {app.loading && <LoadingSpinner/>}

        {modal.isOpen && <ReactModal
            isOpen={modal.isOpen}
            style={modal.style}>
            {modal.child}
        </ReactModal>
        }

        <Outlet/>
    </>
})