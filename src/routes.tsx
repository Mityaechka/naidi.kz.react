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
import {UserProfileEdit} from "./pages/UserProfileEdit";
import {UserProfile} from "./pages/UserProfile";
import {UserProfileView} from "./pages/UserProfileView";
import {ProfileLayout} from "./componets/layouts/ProfileLayout";

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
                ]
            }

        ]

    },
]);