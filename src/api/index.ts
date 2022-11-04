import {
	accountApi
} from './account-api'
import {resumeApi} from './resume-api'
import {clientApi} from './client-api'
import {dictionaryApi} from './dictionary-api'
import {moderatorApi} from './moderator-api'
import {adminApi} from './admin-api'

const api = {
	account: accountApi,
	dictionary: dictionaryApi,
	resume: resumeApi,
	client: clientApi,
	moderator: moderatorApi,
	admin: adminApi
}

export default api