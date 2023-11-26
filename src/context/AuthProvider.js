import { createContext, useState } from "react";

/** React Context provides a way to pass data through the component tree 
 * without having to pass props down manually at every level. 
 * 
 * In this case, the AuthContext is used to manage and share the authentication state across different components 
 * without the need for prop drilling.
*/
const AuthContext = createContext({}); // Create the Context API

export const AuthPerovider = ({ children }) => {
    const [auth, setAuth] = useState({}); // State qui va etre partager dans l'ensemble de notre appli

    // Pour englober l'ensemble de notre application et rendre l'état accessible dans toute l'application
    // Chidren = C'est Notre Application nos composants
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;