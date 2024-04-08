import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";


const Login = () => {
    const [user, setUser] = useState(null);
    const [loginState , setLoginState] = useState(null);


    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const githubProvider = new GithubAuthProvider();



    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser)
                setUser(loggedInUser);
                setLoginState("Sign In Successfully")
            })
            .catch(error => {
                console.log(error)
                setLoginState("Can't Sign In at this moment...")
            })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setLoginState("Sign Out Successfully")
            })
            .catch(() => {
                setLoginState("An Error Occur , Can't Sign Out at this moment")
            })
    }


    const handleGithubLogin = () => {
        signInWithPopup(auth , githubProvider)
            .then(result => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                setLoginState("Sign In Successfully");
            })
            .catch((error) => {
                console.log(error)
                setLoginState("Can't Sign In at this moment...")
            })
    }
    return (
        <div>
            {
                user 
                ? <button onClick={handleSignOut}>Sign Out</button>
                : <div>
                    <button onClick={handleGoogleSignIn}>Google Login</button>
                <button onClick={handleGithubLogin}>Github Login</button>
                </div>
            }
            {
                loginState  && <p>{loginState}</p>
            }
            {
                user && <div>
                    <img src={user.photoURL} alt="" />
                    <h3>User Name : {user?.displayName}</h3>
                    <p>Email : {user?.email}</p>
                </div>
            }
        </div>
    );
};

export default Login;