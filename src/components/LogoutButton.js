import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return(
        <div className="col-lg-4" style={{ "padding": "10px" }}>
            <input onClick={() => logout()} className="btn btn-lg btn-danger btn-block container-fluid" value="Log out" readOnly></input>
        </div>
    );
}

export default LogoutButton;