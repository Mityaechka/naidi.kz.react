import {ClientStore, UserStore} from "./client-store";
import {createContext, useContext} from "react";
import {AppStateStore} from "./app-state-store";
import {ModalStore} from "./modal-store";
import {CacheStore} from "./cache-store";

export class RootStore {
    public app: AppStateStore;
    public client: ClientStore;
    public modal: ModalStore;
    public cache: CacheStore;
    public user: UserStore

    constructor() {
        this.app = new AppStateStore();
        this.client = new ClientStore();
        this.modal = new ModalStore();
        this.cache = new CacheStore();
        this.user = new UserStore();
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