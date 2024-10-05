import { useState } from "react";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

interface Props {
    removeAuth: () => void
}

const Auth = (props: Props) => {
    const [signInForm, setSignInForm] = useState(true)

    const signUpFormActiveHandler = () => {
        setSignInForm(previousData => !previousData);
    }

    return <div>
        {signInForm && <Login
            signUpFormActive={signUpFormActiveHandler}
            removeAuth={() => props.removeAuth()}
        />}
        
        {!signInForm && <Signup
            signInFormActive = {signUpFormActiveHandler}
        />}
    </div>
}

export default Auth;