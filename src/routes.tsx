import {createBrowserRouter} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {
    Auth,
    LoginByPhone,
    LoginPasswordInput,
    RegisterByPhone,
    RegisterPasswordInput,
    RegisterSMSInput
} from "./pages/Auth";
import {AppLayout} from "./componets/layouts/AppLayout";
import {UserProfileEdit} from "./pages/profile/UserProfileEdit";
import {UserProfile} from "./pages/profile/UserProfile";
import {UserProfileView} from "./pages/profile/UserProfileView";
import {ProfileLayout} from "./componets/layouts/ProfileLayout";
import {UserResumesView} from "./pages/resume/UserResumesView";
import {UserResumeCreate} from "./pages/resume/UserResumeCreate";

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

                    {path: "resumes", element: <UserResumesView/>},
                    {path: "resumes/create", element: <UserResumeCreate/>}

                ]
            },

        ]

    },
]);