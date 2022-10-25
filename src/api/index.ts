import {
    accountApi
} from "./account-api";
import {resumeApi} from "./resume-api";
import {userApi} from "./user-api";
import {dictionaryApi} from "./dictionary-api";
import {moderatorApi} from "./moderator-api";

const api = {
    account: accountApi,
    dictionary: dictionaryApi,
    resume: resumeApi,
    user: userApi,
    moderator: moderatorApi
}

export default api