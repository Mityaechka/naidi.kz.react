import {action, computed, makeObservable, observable} from "mobx";
import {apiMethods} from "../api/api-methods";
import {Client} from "../models/data";
import {User} from "../models/user-data";

export class ClientStore {
    jwt?: string;
    client?: Client

    constructor() {
        makeObservable(this, {
            jwt: observable,
            client: observable,
            setClient: action,
            isAuth: computed
        });
        const token = apiMethods.getToken()
        if (token) {
            this.setJwt(token)
        }
    }

    get isAuth() {
        return this.client != undefined;
    }

    setJwt(jwt: string) {
        this.jwt = jwt;
        apiMethods.saveToken(jwt)
    }

    setClient(value?: Client) {
        this.client = value
    }
}

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

    setUser(value?: User) {
        this.user = value
    }
}


