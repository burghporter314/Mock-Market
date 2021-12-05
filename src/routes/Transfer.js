import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { InputGroup, FormControl, Button, Toast } from 'react-bootstrap';
import ToastContainer from 'react-bootstrap/ToastContainer'

import { useAuth0 } from '@auth0/auth0-react';

const TransferPage = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const domain = process.env.REACT_APP_SERVER_DOMAIN;
    const history = useHistory();

    if(!isAuthenticated) {
        return(
            <Redirect to={{pathname: "/"}}/>
        );
    }

    const getAccountDetails = () => {
        // Handle user registration on login to make sure the username is in the system.
        fetch(`${domain}/account/details?username=${user.nickname.toLowerCase()}`, {
            method: 'GET',
            headers: {
            useQueryString: true
            }
        })
        .then(responseJson => responseJson.json())
        .then(responseBody => {
            setState({
                ...responseBody,
            })
        })
        .catch(error => {
            setToastState({
                visible: true,
                message: "API Limit Reached",
                bg: "danger",
            })
        });
    }

    const createNewDeposit = () => {

        const amount = document.getElementById('input-amount').value;

        // Edge cases
        if(amount > 1000000) {
            setToastState({
                visible: true,
                message: "You can't deposit more than $1,000,000",
                bg: "danger",
            })
            return;
        } else if(amount <= 0) {
            setToastState({
                visible: true,
                message: "Amount must be a positive number",
                bg: "danger",
            })
            return;
        }

        fetch(`${domain}/deposit?username=${user.nickname.toLowerCase()}&amount=${amount}`, {
            method: 'POST',
            headers: {
                useQueryString: true
            }
        })
        .then(responseJson => responseJson.json())
        .then(responseBody => {
            setToastState({
                visible: true,
                message: "Deposit was Successful",
                bg: "success",
            })
            getAccountDetails()
        })
        .catch(error => {
            setToastState({
                visible: true,
                message: "Deposit failed: " + error,
                bg: "danger",
            })
        });
    }

    const createNewWithdrawal = () => {
        const amount = document.getElementById('input-amount').value;

        //edge cases
        if(amount > initState.total) {
            setToastState({
                visible: true,
                message: "You can't withdrawal more than what is in the account.",
                bg: "danger",
            })
            return;
        } else if(amount <= 0) {
            setToastState({
                visible: true,
                message: "Amount must be a positive number",
                bg: "danger",
            })
            return;
        }

        fetch(`${domain}/withdrawal?username=${user.nickname.toLowerCase()}&amount=${document.getElementById('input-amount').value}`, {
            method: 'POST',
            headers: {
            useQueryString: true
            }
        })
        .then(responseJson => responseJson.json())
        .then(responseBody => {
            setToastState({
                visible: true,
                message: "Withdrawal was Successful",
                bg: "success",
            })
            getAccountDetails();
        })
        .catch(error => {
            setToastState({
                visible: true,
                message: "Withdrawal failed: " + error,
                bg: "danger",
            })
        });
    }

    const updateAmount = (amount) => {
        document.getElementById('input-amount').value = `${amount}`
        document.getElementById('estimated-value-deposit').innerHTML = `${"After Deposit: $" + (initState.total + Number(amount)).toLocaleString()}`;
        if((initState.total - amount) >= 0) {
            document.getElementById('estimated-value-withdrawal').innerHTML = `${"After Withdrawal: $" + (initState.total - Number(amount)).toLocaleString()}`;
        } else {
            document.getElementById('estimated-value-withdrawal').innerHTML = `${"After Withdrawal: $0"}`;
        }
    }

    // Make the state the same as the expected response on the backend.
    const [initState, setState] = useState({
        total: 0,
    });

    const [toastState, setToastState] = useState({
        message: "",
        visible: false,
        bg: "light",
    });

    // We need to get the updated account details every 20 seconds.
    useEffect(() => {
        getAccountDetails();
        const interval = setInterval(getAccountDetails, 20000);
        return () => clearInterval(interval);
      }, []);
    
    return(
    isAuthenticated && (
    <React.Fragment>
        <div className="jumbotron" style={{margin:"30px"}}>
            <div className="container main-form">
                <form>
                    <h2>Transfer Funds</h2>
                    <br />
                    <InputGroup className="col-md-6 mb-3">
                        <InputGroup.Text id="basic-addon2">Amount</InputGroup.Text>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => updateAmount(1)}
                        >$1</Button>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => updateAmount(10)}
                        >$10</Button>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => updateAmount(100)}
                        >$100</Button>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => updateAmount(1000)}
                        >$1000</Button>
                        <InputGroup.Text id="total-stock-amount">$</InputGroup.Text>
                        <FormControl
                            placeholder="Enter Amount"
                            aria-label="Enter Amount"
                            aria-describedby="basic-addon2"
                            id="input-amount"
                            onChange={(e) => updateAmount(e.target.value)}
                        />
                        <Button variant="outline-success" onClick={() => {
                            createNewDeposit()
                            document.getElementById('input-amount').value = "";
                        }}>Deposit</Button>
                        <Button variant="outline-danger" onClick={() => {
                            createNewWithdrawal()
                            document.getElementById('input-amount').value = "";
                        }}>Withdrawal</Button>
                    </InputGroup><hr />
                    <InputGroup className="col-md-6 mb-3">
                        <InputGroup.Text id="total-stock-amount">{"Account Value: $" + (initState.total).toLocaleString()}</InputGroup.Text>
                        <InputGroup.Text id="estimated-value-deposit">{"After Deposit: $" + (initState.total).toLocaleString()}</InputGroup.Text>
                        <InputGroup.Text id="estimated-value-withdrawal">{"After Withdrawal: $" + (initState.total).toLocaleString()}</InputGroup.Text>
                    </InputGroup>
                </form>
            </div>
        </div>
        <br></br>


        <ToastContainer className="p-3" position={"middle-center"}>
          <Toast onClose={() => setToastState({message: "", visible: false})} show={toastState.visible} delay={3000} bg={toastState.bg} autohide>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Mock Market</strong>
              <small>Now</small>
            </Toast.Header>
            <Toast.Body>{toastState.message}</Toast.Body>
          </Toast>
        </ToastContainer>
    </React.Fragment>
    ));
}

export default TransferPage;