import {createBrowserRouter, redirect} from "react-router-dom";
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
import {ClientProfileEdit} from "./pages/client/profile/client-profile-edit";
import {ClientProfile} from "./pages/client/profile/client-profile";
import {ClientProfileView} from "./pages/client/profile/client-profile-view";
import {ClientProfileLayout} from "./componets/layouts/client-profile-layout";
import {ClientResumeView} from "./pages/client/resume/client-resume-view";
import {ClientResumeCreate} from "./pages/client/resume/client-resume-create";
import {ClientResumeEdit} from "./pages/client/resume/client-resume-edit";
import {AdminLayout} from "./componets/layouts/admin-layout";
import {ModerationResumeView} from "./pages/user/moderation/moderation-resume-view";
import {useStores} from "./store/root-store";
import {UsersView} from "./pages/user/users/users-view";
import {UsersCreate} from "./pages/user/users/users-create";
import {UsersEdit} from "./pages/user/users/users-edit";
import {ResumeRequestModeration} from "./pages/user/moderation/resume-request-moderation";
import {AdminAuth} from "./pages/user/admin-auth";
import {ResumeSearch} from "./pages/client/resume/resume-search";

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

            {path: "resume/search", element: <ResumeSearch/>},

            {
                path: "client", element: <ClientProfileLayout/>, children: [
                    {path: "", element: <ClientProfile/>},
                    {path: "profile", element: <ClientProfileView/>},
                    {path: "profile/edit", element: <ClientProfileEdit/>},

                    {path: "resumes", element: <ClientResumeView/>},
                    {path: "resumes/create", element: <ClientResumeCreate/>},
                    {path: "resumes/:resumeId/edit", element: <ClientResumeEdit/>},

                ]
            },
            {path: "admin-auth", element: <AdminAuth/>},
            {
                path: "admin", element: <AdminLayout/>, children: [
                    {path: "", element: <></>},
                    {path: "moderation/resumes", element: <ModerationResumeView/>},
                    {path: "moderation/resumes/:resumeId", element: <ResumeRequestModeration/>},

                    {path: "users", element: <UsersView/>},
                    {path: "users/create", element: <UsersCreate/>},
                    {path: "users/:userId/edit", element: <UsersEdit/>},
                ]
            }

        ]

    },
]);