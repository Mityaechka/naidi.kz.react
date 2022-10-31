import {Styles} from "react-modal";
import {ModalStore} from "../../store/modal-store";
import {AppButton} from "../app-input/app-button";
import {AlertTriangle} from "react-feather";
import styled from "styled-components";
import {useStores} from "../../store/root-store";

const alertStyle: Styles = {
    content: {
        display: "flex",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "300px",
        minHeight: "300px",
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
        borderRadius: "8px"
    },
};

const AlertIconWrapper = styled.div`
  width: 55px;
  height: 55px;
  padding: 10px;
  background-color: #F9CF21;
  border-radius: 32px;
`

const AlertIcon = styled(AlertTriangle)`
  width: 100%;
  height: 100%;
`

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
`

const AlertTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  text-align: center;
  letter-spacing: 0.15px;
`

const AlertModal = ({title}: { title: string }) => {
    const {modal} = useStores()

    return <>
        <AlertContainer>
            <AlertIconWrapper><AlertIcon color="white"/></AlertIconWrapper>
            <AlertTitle>{title}</AlertTitle>
            <AppButton color="black" click={() => modal.hideModal()}>Ок</AppButton>
        </AlertContainer>
    </>
}

export const showAsk = (modal: ModalStore, title: string) => {
    modal.showModal(<AlertModal title={title}/>, alertStyle)
}