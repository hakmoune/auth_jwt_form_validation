import { Outlet } from "react-router-dom";

const Layout = () => {
    //the Outlet is a component that is used to render the child routes within a parent route
    //The Layout is the parent compenet and inside this parent there is other children component
    //We can use the parent E.g The header and the footer of the app and the main pages are the children that will be changed everytime
    return (
        <div>
            <h1 className="app-title">My Application</h1>
            <Outlet />
        </div>
    );
}

export default Layout;