import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();// Context
    const location = useLocation(); //E.g contact

    {/** The state={{ from: location }} part is passing the current location as state to the "/login" page.
        so the "/login" page can potentially use this information 
        (e.g., to redirect the user back to where they were trying to access before login).
    */ }

    {/** The replace prop is set to true, indicating that this navigation should replace the current entry in the history.
    The replace prop ensures that if the user navigates back, they won't see the previous location 
    (e.g., if they tried to access a protected route before logging in).
    So it will replace contact with login
    */ }

    return (
        auth?.roles === 'admin'
            ? <Outlet />
            : auth?.username
                ? <Navigate to={"/unauthorized"} state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;