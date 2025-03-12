import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BookPage from "./pages/BookPage";
import ProtectedRoute from "./context/protected";
import ProfilePage from "./pages/ProfilePage";
import AboutProjectPage from "./pages/AboutProjectPage";
import NotFound from "./components/NotFound";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage /> 
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: "/book/:bookId",
                element: <BookPage />
            },
            {
                path: "/AboutProjectPage",
                element: <AboutProjectPage />
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                )
            },
            {
                path: "*",
                element: <NotFound />
            },
        ]
    }
])


export default router