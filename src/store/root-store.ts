import {UserStore} from "./user-store";
import {createContext, useContext} from "react";
import {AppStateStore} from "./app-state-store";
import {ModalStore} from "./modal-store";
import {CacheStore} from "./cache-store";

export class RootStore {
    public app: AppStateStore;
    public user: UserStore;
    public modal: ModalStore;
    public cache: CacheStore;

    constructor() {
        this.app = new AppStateStore();
        this.user = new UserStore();
        this.modal = new ModalStore();
        this.cache = new CacheStore();
    }
}

export const StoreContext = createContext<RootStore>(new RootStore())

export const useStores = () => {
    return useContext(StoreContext)
}

export const useCache = () => {
    const {cache} = useStores()

    return cache
}