import {UserStore} from "./UserStore";
import {createContext, useContext} from "react";
import {AppStateStore} from "./AppStateStore";
import {ModalStore} from "./ModalStore";
import {CacheStore} from "./CacheStore";

export class RootStore {
    public appState: AppStateStore;
    public userStore: UserStore;
    public modalStore: ModalStore;
    public cacheStore: CacheStore;

    constructor() {
        this.appState = new AppStateStore();
        this.userStore = new UserStore();
        this.modalStore = new ModalStore();
        this.cacheStore = new CacheStore();
    }
}

export const StoreContext = createContext<RootStore>(new RootStore())

export const useStores = () => {
    return useContext(StoreContext)
}

export const useCache = () => {
    const {cacheStore} = useStores()

    return cacheStore
}