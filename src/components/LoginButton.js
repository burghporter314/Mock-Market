import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return(
        <div className="col-lg-12" style={{ "padding": "10px" }}>
            <input onClick={() => loginWithRedirect()} className="btn btn-lg btn-primary btn-block container-fluid" value="Sign In" readOnly></input>
        </div>
    );
}

export default LoginButton;