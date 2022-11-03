import {action, makeObservable, observable} from "mobx";
import {createContext, ReactNode, useContext} from "react";
import {apiMethods} from "../api/api-methods";
import {RootStore} from "./root-store";
import {Observer} from "mobx-react";
import {PopupMenuItem} from "../componets/popup-menu/popup-menu";

export type Breadcrumb = {
    title: string,
    path: string
}

export type Section = "" | "my-profile" | "my-resumes" | "moderation-resumes" | "moderation-users"

export class AppStateStore {

    title: string = "";
    section: Section = ""
    breadcrumbs: Breadcrumb[] = []

    loading: boolean = false

    phone?: string
    phoneCode?: string
    pageMenuItems?: PopupMenuItem[]

    constructor() {
        makeObservable(this, {
            title: observable,
            pageMenuItems: observable,
            section: observable,
            breadcrumbs: observable,
            loading: observable,
            phone: observable,
            setTitle: action,
            showLoading: action,
            hideLoading: action,
            setSection: action,
            setBreadcrumbs: action,
            withLoading: action,
            setMenuItems: action,
            clearMenuItems: action
        });
    }

    setTitle(title: string) {
        this.title = title;
    }

    setSection(value: Section) {
        this.section = value
    }

    setBreadcrumbs(value: Breadcrumb[]) {
        this.breadcrumbs = value
    }

    setPhone(phone: string) {
        this.phone = phone;
    }

    setMenuItems(value: PopupMenuItem[]) {
        this.pageMenuItems = value
    }

    clearMenuItems() {
        this.pageMenuItems = undefined
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

    withLoading<T>(promise: Promise<T>) {
        this.showLoading()
        return new Promise<T>(resolve => {
            promise.then(result => {
                this.hideLoading();
                resolve(result)
            })
        })


    }
}

export const appLoading = (app: AppStateStore) => <T>(promise: Promise<T>) => {
    return app.withLoading(promise)
}

