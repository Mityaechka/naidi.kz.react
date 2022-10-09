import {UserStore} from "./UserStore";
import {createContext, useContext} from "react";
import {AppStateStore} from "./AppStateStore";
import {ModalStore} from "./ModalStore";

export class RootStore {
    public appState: AppStateStore;
    public userStore: UserStore;
    public modalStore: ModalStore;

    constructor() {
        this.appState = new AppStateStore();
        this.userStore = new UserStore();
        this.modalStore = new ModalStore();
    }
}

export const StoreContext = createContext<RootStore>(new RootStore())

export const useStores = () => {
    return useContext(StoreContext)
}