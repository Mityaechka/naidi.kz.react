import {action, makeObservable, observable} from "mobx";
import {createContext, useContext} from "react";
import {api} from "../api/api";

class AppStateStore {

    title: string = "";

    loading: boolean = false

    phone?: string
    phoneCode?:string

    jwt?: string

    constructor() {
        makeObservable(this, {
            title: observable,
            loading: observable,
            phone: observable,
            setTitle: action,
            showLoading: action,
            hideLoading: action

        });
        const token = api.getToken()
        if(token) {
            this.setJwt(token)
        }
    }

    setJwt(jwt: string){
        this.jwt = jwt;
        api.saveToken(jwt)
    }

    setTitle(title: string) {
        this.title = title;
    }

    setPhone(phone: string) {
        this.phone = phone;
    }
    setPhoneCode(code: string) {
        this.phoneCode = code;
    }

    showLoading() {
        this.loading = true;
    }

    hideLoading() {
        this.loading = false;
    }
}

export class RootStore {
    public appState: AppStateStore;

    constructor() {
        this.appState = new AppStateStore();
    }
}

console.log("STORE")
export const StoreContext = createContext<RootStore>(new RootStore())

export const useStores = () => {
    return useContext(StoreContext)
}