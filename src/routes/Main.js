import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { InputGroup, FormControl, Button, Toast } from 'react-bootstrap';
import ToastContainer from 'react-bootstrap/ToastContainer'
import TransactionTable from '../components/TransactionTable';

const MainPage = (props) => {

    const { isAuthenticated, user } = useAuth0();
    const history = useHistory();
    const domain = process.env.REACT_APP_SERVER_DOMAIN;

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
                ...initState,
                ...responseBody,
            })
        })
        .catch(error => {
            setToastState({
                visible: true,
                message: "Could not update account details: API Limit Reached",
                bg: "danger",
            });
            console.log(error);
        });
    }

    const getRows = (stocks) => {
        let rows = [];
        for(const [key, value] of Object.entries(stocks)) {
            rows.push({
                0: key.toUpperCase(),
                1: value.totalStockAmount.toLocaleString(),
                2: "$" + parseFloat(value.totalProfit.toFixed(2)).toLocaleString(),
                3: "$" + parseFloat(value.currentProfit.toFixed(2)).toLocaleString(),
                4: "$" + parseFloat(value.soldProfit.toFixed(2)).toLocaleString(),
                5: "$" + parseFloat(value.c.toFixed(2)).toLocaleString(),
                6: "$" + parseFloat(value.h.toFixed(2)).toLocaleString(),
                7: "$" + parseFloat(value.l.toFixed(2)).toLocaleString(),
                8: "$" + parseFloat(value.o.toFixed(2)).toLocaleString(),
            });
        }
        return rows;
    }

    // Make the state the same as the expected response on the backend.
    const [initState, setState] = useState({
        total: 0,
        withdrawalTotal: 0,
        depositTotal: 0,
        stocks: {},
        accountProfit: 0,
        accountStockTotal: 0,
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
                    <h2>Net Account Value: <span style={{color:"green"}}>${parseFloat((initState.total + initState.accountStockTotal).toFixed(2)).toLocaleString()}</span></h2>
                    <hr className="colorgraph"></hr>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Stock Value</label>
                            <input type="text" className="form-control" id="inputCity" value={"$" + parseFloat(initState.accountStockTotal.toFixed(2)).toLocaleString()} readOnly></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Funds Remaining</label>
                            <input type="text" className="form-control" id="inputZip" value={"$" + parseFloat(initState.total.toFixed(2)).toLocaleString()} readOnly></input>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Total Profit</label>
                            <input type="text" className="form-control" id="inputCity" value={"$" + parseFloat(initState.accountProfit.toFixed(2)).toLocaleString()} readOnly></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>% Change from account</label>
                            <input type="text" className="form-control" id="inputZip" value={((initState.accountProfit / (initState.depositTotal - initState.withdrawalTotal))*100).toFixed(2) + "%"} readOnly></input>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Total Withdrawal</label>
                            <input type="text" className="form-control" id="inputZip" value={"$" + parseFloat(initState.withdrawalTotal).toLocaleString()} readOnly></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Total Deposit</label>
                            <input type="text" className="form-control" id="inputZip" value={"$" + parseFloat(initState.depositTotal).toLocaleString()} readOnly></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <br></br>
        <div className="jumbotron">
            <div className="container table-form">
                <form>
                    <h2>Transactions </h2>
                    <hr className="colorgraph"></hr>
                    <TransactionTable
                    headers={["Stock Ticker", "Amount", "Total Profit", "Current Profit", "Sold Profit", "Current Price", "High Price", "Low Price", "Open Price"]}
                    rows={getRows(initState.stocks)}
                    // We need a function that returns a function since the ticker is only known in the transaction table component.
                    processRowClick={(ticker) => () => history.push(`/info?ticker=${ticker}`)}>
                    </TransactionTable>
                </form>
            </div>
        </div>
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

export default MainPage;