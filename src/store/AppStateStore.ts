import {action, makeObservable, observable} from "mobx";
import {createContext, useContext} from "react";
import {api} from "../api/api";
import {RootStore} from "./RootStore";

export type Breadcrumb = {
    title: string,
    path: string
}

export type Section = "" | "my-profile" | "my-resumes"

export class AppStateStore {

    title: string = "";
    section: Section = ""
    breadcrumbs: Breadcrumb[] = []

    loading: boolean = false

    phone?: string
    phoneCode?: string

    constructor() {
        makeObservable(this, {
            title: observable,
            section: observable,
            breadcrumbs: observable,
            loading: observable,
            phone: observable,
            setTitle: action,
            showLoading: action,
            hideLoading: action,
            setSection: action,
            setBreadcrumbs: action
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

