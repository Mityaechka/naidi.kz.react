import {MobileBar} from "../../../componets/mobile-bar";
import {useStores} from "../../../store/root-store";
import {useApiCall} from "../../../hooks/usePromises";
import api from "../../../api";
import {appLoading} from "../../../store/app-state-store";
import {ResumeComponent} from "../../../componets/resumes/resume";
import {HeaderBase} from "../../../componets/resumes/header/header-base";
import {BodyOwner} from "../../../componets/resumes/body/body-owner";
import {BodyBase} from "../../../componets/resumes/body/body-base";

export const ResumeSearch = () => {
    const {app} = useStores()
    const [resumes] = useApiCall([], api.resume.findResumes(), appLoading(app))
    return <div>
        <MobileBar title="Посик резюме"/>
        {resumes.map(resume => <>
            <ResumeComponent border="left"
                             header={<HeaderBase resume={resume}/>}
                             body={<BodyBase resume={resume}/>}
            />
        </>)}
    </div>
}