# Source

1. https://www.youtube.com/watch?v=brcHK3P6ChQ (DONE)
2. https://www.youtube.com/watch?v=X3qyxo_UTR4 (DONE)
3. https://www.youtube.com/watch?v=oUZjO00NkhY (15min)
4. https://www.youtube.com/watch?v=nI8PYZNFtac

# Repo

https://github.com/gitdagray/react_protected_routes

# fontawesome

https://fontawesome.com/v5/docs/web/use-with/react


# Routers

1. Create `BrowserRoutes` pour utiliser les routes sur le navigateur
2. Create `Routes` c'est contenaire des route de notre application 
3. Create `Route` les path de notre application, contient le path="login" & l'element a afficher sur ce path =`{<Login />}`
4. Create `Layout` ave le mot clé `Outlet/Children`, c'est le composant parent qui continet dedans les `Route` children, les route child son afficher avec le mot `Outlet`.
5. To navigate to another link in JSX with a click <Link to="/contact" >Go to contact !</Link>
6. To navigate after a tratement we use <Navigate to="/login" />
7. `Navigate` VS `useNavigate`
    Use `Navigate` when you want to express navigation intentions directly in your JSX.
    Use `useNavigate` when you need to navigate programmatically within your component logic, such as inside event handlers or useEffect hooks.
8. `navigate(-1)` is a programmatic way to navigate to the previous entry in the navigation history
                  This is similar to the user clicking the browser's back button.


# Authentication

1. Create the `Context` pour sauvgarder les information(`accessToken`, `roles`...) de l'utilisateur lorsqu'il se connect/logged, on utilise `le context` pour que ces infos soit accessible/Globale sur l'ensemble de notre application. et que a chaque user request on utilise ces infos pour verifier avec le composant `RequireAuth`, et on utilise également le roles pour donné ou limiter l'acces a certain routes/path

2. Create un composant `RequireAuth` qui verfier c'est vous etes connecté/et avez les droits ou no, c'est oui il va t'afficher le `route/Outlet` sinon tu va etre redirger ver la page `Login` avec `<Navigate to="/login".... />`



# Context API

1. On cree le context avec `createContext`
2. On englobe notre application avec le context crée en utilisant le mot clé `Provider` et on passe les propos global dans ` value`
3. On acced a `la valeur` de notre context avec le hook `useContext(Nom_Context_Crée)` c'est le remplacement de `Consumer`