import {ModalStore} from "../store/modal-store";
import {Styles} from "react-modal";
import {
    Auth,
    LoginByPhone,
    LoginPasswordInput,
    RegisterByPhone,
    RegisterPasswordInput,
    RegisterSMSInput
} from "../pages/client/auth";

export const ModalAuthWizard = ({modalStore}: { modalStore: ModalStore }) => {

    const close = () => {
        modalStore.hideModal()
    }

    const style: Styles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "500px",
            minHeight: "500px",
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingBottom: "40px",
            borderRadius: "8px"
        },
    };

    const auth = () => modalStore.showModal(<Auth closeClick={close} register={register} login={login}/>);

    const register = () => modalStore.showModal(<RegisterByPhone closeClick={close} backClick={auth} next={registerSmsInput}/>)
    const login = () => modalStore.showModal(<LoginByPhone closeClick={close} backClick={auth} next={loginPasswordInput}/>)

    const registerSmsInput = () => modalStore.showModal(<RegisterSMSInput closeClick={close} backClick={register} next={registerPasswordInput}/>)
    const registerPasswordInput = () => modalStore.showModal(<RegisterPasswordInput closeClick={close} backClick={registerSmsInput} next={closeModal}/>)

    const loginPasswordInput = () => modalStore.showModal(<LoginPasswordInput closeClick={close} backClick={auth} next={closeModal}/>)

    const closeModal = () => modalStore.hideModal()

    const start = () => {
        modalStore.setStyle(style)
        auth()
    }

    return start;
}