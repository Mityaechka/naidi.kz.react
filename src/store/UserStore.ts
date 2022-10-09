import {action, computed, makeObservable, observable} from "mobx";
import {api} from "../api/api";
import {User} from "../models/Data";

export class UserStore {
    jwt?: string;
    user?: User

    constructor() {
        makeObservable(this, {
            jwt: observable,
            user: observable,
            setUser: action,
            isAuth: computed
        });
        const token = api.getToken()
        if (token) {
            this.setJwt(token)
        }
    }

    get isAuth() {
        return this.user != undefined;
    }

    setJwt(jwt: string) {
        this.jwt = jwt;
        api.saveToken(jwt)
    }

    setUser(user?: User) {
        this.user = user
    }


}


