# Source

1. https://www.youtube.com/watch?v=brcHK3P6ChQ (DONE)
2. https://www.youtube.com/watch?v=X3qyxo_UTR4 (DONE)
3. https://www.youtube.com/watch?v=oUZjO00NkhY (DONE)
4. https://www.youtube.com/watch?v=nI8PYZNFtac

# Course

https://zerotomastery.io/courses/junior-to-senior-web-developer-roadmap/

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


 # Axios

  try {
    const response = await axios.post(REGISTER_URL,
        //Axios automatically serializes the JavaScript object into JSON format, 
        //And sets the Content-Type header to application/json
        { username: user, password: pwd }

        /*JSON.stringify({ username: user, password: pwd }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }*/
    );
    /** Avec Axiox pas besoin de verifier le status si c'est OK ou no, automatiquement axios declench une erreur si il y en a */
    if (response.status === 200) {
        console.log(response.data);
        setSuccess(true);
    }

} catch (err) {
    if (!err?.response) {
        setMsgErr('No Server Response...')
    }
    //else if selon les status code renvoyer par le back 409 = username taken 407.... etc
    else {
        setMsgErr('Registration Failed')
        console.error(`Failed to Connect. Status: ${err}`);
    }
    errRef.current.focus(); // Set the focus on the error for the screen reader
}




######


# JWT 
1. Access Token = Short Time (5 to 10 min)
    .The primary purpose of an access token is to grant access to a protected resource (like an API).
    .Access tokens have a short lifespan. They are issued for a specific duration (e.g., 15 minutes) and are meant to expire relatively quickly.
    .Clients include the access token in the Authorization header when making requests to access protected resources.
    .Client stores the accessToken in memory to be lost when the application closed (Do not store in localStorage or cookies)

2. Refresh Token = Long Time (7 hours, 1 day, 1day and half)
    .The refresh token is used to obtain a new access token when the current one expires.
    .Refresh tokens have a longer lifespan compared to access tokens. They are typically valid for a longer period.
    .When the access token expires, the client can use the refresh token to request a new access token without requiring the user to re-authenticate.

# Why both? Refresh/Access

Having both access and refresh tokens enhances security. Since access tokens have a short lifespan, even if they are compromised, the potential damage is limited. Refresh tokens, with their longer lifespan, are kept more secure since they are used less frequently.

In summary, access tokens are for short-term access to resources, while refresh tokens are for obtaining new access tokens without requiring the user to log in again, providing a balance between security and user experience.

# Practically

1. User Authentication:
    . The user logs in with their credentials (username/password) using a login form on the front-end.
    . The credentials are sent to the server, which validates them.

2. Token Issuance:
    . Upon successful authentication, the server generates an access token and a refresh token.
    . Both tokens are sent to the front-end as part of the response.

3. Access Token Usage:
    . The front-end includes the access token in the headers of its API requests to access protected resources.
    . For example, in an HTTP request, the Authorization header might look like: `Authorization: Bearer <access_token>`

4. Token Expiry:
    . The access token has a short lifespan and will expire after a set period (e.g., 15 minutes).

5. Refresh Token Handling:
    . When the access token expires, the front-end uses the refresh token to request a new access token without prompting the user to log in again.
    . This is typically done by sending a refresh token grant request to the server.

6. New Access Token Issuance:
    . The server validates the refresh token and, if valid, issues a new access token.
    . The new access token is sent back to the front-end

7. Repeat Process:
    . The front-end continues to use the new access token for accessing protected resources.
    . The process of using the refresh token to get a new access token is repeated as needed.

This cycle continues until the refresh token itself expires or is revoked. If the user logs out or revokes their consent, the refresh token may be invalidated, requiring the user to log in again to obtain a new set of tokens.




1. Storage of Tokens on the Front-end:

1. `Access Token`: Typically, the access token is stored in `memory`, such as in a `variable`. OR a client-side storage mechanism like `sessionStorage` or `localStorage`. This ensures that the access token is accessible to the application for making authorized requests to the server.`


2. `Refresh Token`: The refresh token, being more sensitive due to its `longer lifespan`, is usually securely stored. It's often kept as an `HTTP-only cookie` or in a secure, `HttpOnly`, and `SameSite-cookies-enabled` manner. 
    # Example
        function setRefreshTokenCookie(token) {
            document.cookie = `refreshToken=${token}; secure; HttpOnly; SameSite=Strict`;
        }

`HTTP-only`: An HTTP-only cookie is a cookie attribute that can be set when creating a cookie. When this attribute is present, the cookie is inaccessible to JavaScript running in the browser. It can only be sent to the server with HTTP requests.

`Why?` This enhances security by mitigating the risk of cross-site scripting (XSS) attacks. If an attacker injects malicious scripts into your web application, they won't be able to access or steal the HTTP-only cookie containing sensitive information like refresh tokens.

`Secure attribute:` The Secure attribute is another cookie attribute. When set, the cookie is only sent over HTTPS connections, not HTTP. It ensures that the cookie data is encrypted during transmission between the client and the server.

`Why?` Using secure cookies prevents attackers from intercepting the cookie data during transmission. It ensures that sensitive information, like refresh tokens, is transmitted securely over encrypted connections.

`SameSite attribute:`

`cross-site scripting (XSS)`
`cross-site request forgery (CSRF)`


 2. Detecting Access Token Expiry:

 .Before making a request, the front-end can check the expiration timestamp of the access token. If the token is expired or close to expiration, the front-end initiates a token refresh using the refresh token.

 .Alternatively, if a request is made with an expired access token, the server responds with a 401 Unauthorized status. This is a signal for the front-end to refresh the token and retry the request.

 # WhAT I understood
1. Login we store the `access` and `refresh` Token:
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);

2. each time we wanna make a request:
    . you check is the accessToken is available
        `if (!accessToken)`
    . you check is the accessToken not expired, if yes we send the accessToken in Authorization, if not we refresh it with the refreshToken
        ` const isAccessTokenExpired = isTokenExpired(accessToken);` 
    . if it's expired, you refresh the accessToken and the backend send you the new accessToken, refreshToken also sent in the Authorization
        `await refreshTokenRequest();`
    . you make the call API eather with the accessToken
        headers: { Authorization: `Bearer ${accessToken}`,}
    . The backend also check the refreshToken if it's expired you logout, and then you will sign up and get new access and refresh Token 

Here you create two Global function to check the accessToken is up-to-date `isTokenExpired`, `refreshTokenRequest`

1. `isTokenExpired`
// Function to check if a token is expired
  const isTokenExpired = (token) => {
    const decodedToken = decodeAccessToken(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTimestamp;
  };

  // Function to decode the access token (replace with your actual decoding logic)
  const decodeAccessToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch (error) {
      console.error('Error decoding access token', error);
      return {};
    }
  }


2. `refreshTokenRequest`
 // Simulated API request to refresh access token using refresh token
  const refreshTokenRequest = async () => {
    try {
      // Check if the refresh token is available
      if (!refreshToken) {
        console.error('Refresh token not available');
        return;
      }

      // Simulate a refresh token API request
      const response = await fetch('/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data = await response.json();

      // Update the access token with the new one received from the server
      setAccessToken(data.access_token);
    } catch (error) {
      console.error('Refresh token request failed', error);
    }
  };


 