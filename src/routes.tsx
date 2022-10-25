import {createBrowserRouter} from "react-router-dom";
import {MainPage} from "./pages/client/main-page";
import {
    Auth,
    LoginByPhone,
    LoginPasswordInput,
    RegisterByPhone,
    RegisterPasswordInput,
    RegisterSMSInput
} from "./pages/client/auth";
import {AppLayout} from "./componets/layouts/app-layout";
import {UserProfileEdit} from "./pages/client/profile/user-profile-edit";
import {UserProfile} from "./pages/client/profile/user-profile";
import {UserProfileView} from "./pages/client/profile/user-profile-view";
import {ProfileLayout} from "./componets/layouts/profile-layout";
import {UserResumeView} from "./pages/client/resume/user-resume-view";
import {UserResumeCreate} from "./pages/client/resume/user-resume-create";
import {UserResumeEdit} from "./pages/client/resume/user-resume-edit";
import {AdminLayout} from "./componets/layouts/admin-layout";
import {ModerationResumeView} from "./pages/user/moderation/moderation-resume-view";
import {useStores} from "./store/root-store";
import {ResumeRequestModeration} from "./componets/user/resume-request-moderation";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {path: "", element: <MainPage/>},

            {path: "auth", element: <Auth/>},

            {path: "register", element: <RegisterByPhone/>},
            {path: "register/sms", element: <RegisterSMSInput/>},
            {path: "register/password", element: <RegisterPasswordInput/>},

            {path: "login", element: <LoginByPhone/>},
            {path: "login/password", element: <LoginPasswordInput/>},

            {
                path: "user", element: <ProfileLayout/>, children: [
                    {path: "", element: <UserProfile/>},
                    {path: "profile", element: <UserProfileView/>},
                    {path: "profile/edit", element: <UserProfileEdit/>},

                    {path: "resumes", element: <UserResumeView/>},
                    {path: "resumes/create", element: <UserResumeCreate/>},
                    {path: "resumes/:resumeId/edit", element: <UserResumeEdit/>},

                ]
            },
            {
                path:"admin", element:<AdminLayout/>, children: [
                    {path:"", element:<></>},
                    {path:"moderation/resumes", element:<ModerationResumeView/>},
                    {path:"moderation/resumes/:resumeId", element:<ResumeRequestModeration/>},
                ]
            }

        ]

    },
]);