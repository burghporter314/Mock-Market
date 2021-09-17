import React from 'react';
import LoginButton from '../components/LoginButton'
import logo from '../assets/market.png'

const LoginPage = () => {
    return(
    <React.Fragment>
        <div className="jumbotron vertical-center">
            <div className="container">
                <div className="row" style={{"marginTop":"40px"}}>
                    <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3 login-form mx-auto">
                        <form role="form">
                            <fieldset>
                                <h2>Please Sign In</h2>
                                <hr className="colorgraph"></hr>
                                <img className="col-lg-6 img-fluid w-100 login-image center-block" src={logo} style={{
                                "maxWidth": "210px"
                                }}></img>
                                <div className="row">
                                    <LoginButton />
                                </div>
                            </fieldset>
                        </form>
                    </div> 
                </div>
            </div>
        </div>
    </React.Fragment>
    );
}

export default LoginPage;