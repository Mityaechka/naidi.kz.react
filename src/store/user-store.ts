import {action, computed, makeObservable, observable} from "mobx";
import {apiMethods} from "../api/api-methods";
import {User} from "../models/data";

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
        const token = apiMethods.getToken()
        if (token) {
            this.setJwt(token)
        }
    }

    get isAuth() {
        return this.user != undefined;
    }

    setJwt(jwt: string) {
        this.jwt = jwt;
        apiMethods.saveToken(jwt)
    }

    setUser(user?: User) {
        this.user = user
    }


}


