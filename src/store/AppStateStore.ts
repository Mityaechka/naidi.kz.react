import {action, makeObservable, observable} from "mobx";
import {createContext, useContext} from "react";
import {api} from "../api/api";
import {RootStore} from "./RootStore";

export class AppStateStore {

    title: string = "";
    

    loading: boolean = false

    phone?: string
    phoneCode?:string

    constructor() {
        makeObservable(this, {
            title: observable,
            loading: observable,
            phone: observable,
            setTitle: action,
            showLoading: action,
            hideLoading: action

        });
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

