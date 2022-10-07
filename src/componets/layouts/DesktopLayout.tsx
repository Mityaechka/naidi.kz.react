import {Outlet} from "react-router-dom";
import {useStores} from "../../store/AppStateStore";
import Modal from 'react-modal';
import {useRef} from "react";
import ReactModal from "react-modal";

const modalStyles = {
    content: {
        width: '440px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px'
    },
};

export const DesktopLayout = () => {
    const {appState} = useStores();

    const modal = useRef<ReactModal>();
    return <div>
        <Modal
            overlayRef={console.log}
            contentRef={console.log}
            style={modalStyles}
            isOpen={true}
            contentLabel="Example Modal"
        >
            <Outlet/>
        </Modal>
    </div>
}