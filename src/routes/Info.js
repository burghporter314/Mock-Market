import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

import { useAuth0 } from '@auth0/auth0-react';
import TransactionTable from '../components/TransactionTable';

const InfoPage = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const domain = process.env.REACT_APP_SERVER_DOMAIN;
    const history = useHistory();

    if(!isAuthenticated) {
        return(
            <Redirect to={{pathname: "/"}}/>
        );
    }

    const ticker = new URLSearchParams(props.location.search).get("ticker");

    const getTickerAndAccountDetails = () => {
        // Handle user registration on login to make sure the username is in the system.
        fetch(`${domain}/ticker/info?ticker=${initState.ticker}`, {
            method: 'GET',
            headers: {
            useQueryString: true
            }
        })
        .then(responseJson => responseJson.json())
        .then(innerResponseBody => {
            // Handle user registration on login to make sure the username is in the system.
            fetch(`${domain}/account/details?username=${user.nickname.toLowerCase()}`, {
                method: 'GET',
                headers: {
                useQueryString: true
                }
            })
            .then(responseJson => responseJson.json())
            .then(responseBody => {
                let amountOwned = 0;
                if(responseBody.stocks[innerResponseBody.symbol.toLowerCase()]) {
                    amountOwned = responseBody.stocks[innerResponseBody.symbol.toLowerCase()].totalStockAmount;
                }
                setState({
                    ...initState,
                    account: responseBody,
                    ticker: innerResponseBody.symbol,
                    name: innerResponseBody.name,
                    current: innerResponseBody.c,
                    high: innerResponseBody.h,
                    low: innerResponseBody.l,
                    open: innerResponseBody.o,
                    percent_change: innerResponseBody.dp,
                    market_cap: innerResponseBody.marketcap,
                    type: innerResponseBody. type,
                    country: innerResponseBody.hq_country,
                    state: innerResponseBody.hq_state,
                    exchange: innerResponseBody.exchange,
                    description: innerResponseBody.description,
                    employees: innerResponseBody.employees,
                    sector: innerResponseBody.sector,
                    similar: innerResponseBody.similar,
                    amountOwned,
                })
            })
            .catch(error => {
                console.log(error);
            });
            })
        .catch(error => {
            console.log(error);
        });
    }

    const createNewPurchase = () => {

        const amount = document.getElementById('input-amount').value;

        // Edge cases
        if(amount * initState.current > initState.account.total) {
            alert("You can't purchase more than account value");
            return;
        } else if(amount <= 0) {
            alert("Amount must be a positive number");
            return;
        }

        fetch(`${domain}/purchase?username=${user.nickname.toLowerCase()}&ticker=${initState.ticker.toLowerCase()}&amount=${amount}`, {
            method: 'POST',
            headers: {
            useQueryString: true
            }
        })
        .then(responseJson => responseJson.json())
        .then(responseBody => {alert("Purchase Successful")})
        .catch(error => {
            console.log(error);
        });
    }

    const createNewSale = () => {
        const amount = document.getElementById('input-amount').value;

        //edge cases
        if(amount > initState.amountOwned) {
            alert("You can't sell more stocks than what you own.");
            return;
        } else if(amount <= 0) {
            alert("Amount must be a positive number");
            return;
        }

        fetch(`${domain}/sale?username=${user.nickname.toLowerCase()}&ticker=${initState.ticker.toLowerCase()}&amount=${document.getElementById('input-amount').value}`, {
            method: 'POST',
            headers: {
            useQueryString: true
            }
        })
        .then(responseJson => responseJson.json())
        .then(responseBody => {alert("Sale Successful")})
        .catch(error => {
            console.log(error);
        });
    }

    const getRows = (similarStocks) => {
        let rows = [];

        if(similarStocks) {
            for(let i = 0; i < similarStocks.length; i++) {
                rows.push({
                    0: similarStocks[i],
                })
            }
        }
        return rows;
    }

    const updateAmount = (amount) => {
        document.getElementById('input-amount').value = `${amount}`
        document.getElementById('estimated-value').innerHTML = `${"Estimated Value: $" + (initState.current * amount).toLocaleString()}`;
    }

    // Make the state the same as the expected response on the backend.
    const [initState, setState] = useState({
        account: {
            total: 0,
        },
        amountOwned: 0,
        ticker,
        name: "",
        current: 0,
        high: 0,
        low: 0,
        open: 0,
        percent_change: 0,
        market_cap: 0,
        type: "",
        country: "",
        state: "",
        exchange: "",
        description: "",
        employees: "",
        sector: "",
        similar: [],
    });

    // We need to get the updated account details every 20 seconds.
    useEffect(() => {
        getTickerAndAccountDetails();
        const interval = setInterval(getTickerAndAccountDetails, 20000);
        return () => clearInterval(interval);
      }, []);
    
    return(
    isAuthenticated && (
    <React.Fragment>
        <div className="jumbotron" style={{margin:"30px"}}>
            <div className="container main-form">
                <form>
                    <h2>Ticker Information</h2>
                    <hr className="colorgraph"></hr>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Ticker</label>
                            <input type="text" className="form-control" id="inputCity" value={"$" + initState.ticker} readOnly></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Name</label>
                            <input type="text" className="form-control" id="inputZip" value={initState.name} readOnly></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label>Current</label>
                            <input type="text" className="form-control" id="inputCity" value={"$" + initState.current.toLocaleString()} readOnly></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label>High</label>
                            <input type="text" className="form-control" id="inputZip" value={"$" + initState.high.toLocaleString()} readOnly></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Low</label>
                            <input type="text" className="form-control" id="inputZip" value={"$" + initState.low.toLocaleString()} readOnly></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Open</label>
                            <input type="text" className="form-control" id="inputZip" value={"$" + initState.open.toLocaleString()} readOnly></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label>Percent Change</label>
                            <input type="text" className="form-control" id="inputCity" value={initState.percent_change.toFixed(2) + "%"} readOnly></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Market Cap</label>
                            <input type="text" className="form-control" id="inputZip" value={initState.market_cap.toLocaleString()} readOnly></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Type</label>
                            <input type="text" className="form-control" id="inputZip" value={initState.type} readOnly></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Exchange</label>
                            <input type="text" className="form-control" id="inputZip" value={initState.exchange} readOnly></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label>Country</label>
                            <input type="text" className="form-control" id="inputCity" value={initState.country} readOnly></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label>State</label>
                            <input type="text" className="form-control" id="inputZip" value={initState.state} readOnly></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Employees</label>
                            <input type="text" className="form-control" id="inputZip" value={initState.employees.toLocaleString()} readOnly></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Sector</label>
                            <input type="text" className="form-control" id="inputZip" value={initState.sector} readOnly></input>
                        </div>
                    </div>
                    <br />
                    <InputGroup className="col-md-6 mb-3">
                        <InputGroup.Text id="basic-addon2">{"$" + initState.ticker}</InputGroup.Text>
                        <InputGroup.Text id="basic-addon2">Amount</InputGroup.Text>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => updateAmount(1)}
                        >1</Button>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => updateAmount(10)}
                        >10</Button>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => updateAmount(100)}
                        >100</Button>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => updateAmount(1000)}
                        >1000</Button>
                        <FormControl
                            placeholder="Enter Amount to Purchase or Sell"
                            aria-label="Enter Amount to Purchase or Sell"
                            aria-describedby="basic-addon2"
                            id="input-amount"
                            onChange={(e) => updateAmount(e.target.value)}
                        />
                        <Button variant="outline-success" onClick={createNewPurchase}>Purchase</Button>
                        <Button variant="outline-danger" onClick={createNewSale}>Sell</Button>
                    </InputGroup><hr />
                    <InputGroup className="col-md-6 mb-3">
                        <InputGroup.Text id="total-stock-amount">{"Account Value: $" + (initState.account.total).toLocaleString()}</InputGroup.Text>
                        <InputGroup.Text id="account-value">{"$" + initState.ticker + " Owned: " + initState.amountOwned}</InputGroup.Text>
                        <InputGroup.Text id="estimated-value">{"Estimated Value of Transaction: $0"}</InputGroup.Text>
                    </InputGroup>
                </form>
            </div>
        </div>
        <br></br>
        <div className="jumbotron">
            <div className="container table-form">
                <form>
                    <h2>Similar Stocks </h2>
                    <hr className="colorgraph"></hr>
                    <TransactionTable
                    headers={["Stock Ticker"]}
                    rows={getRows(initState.similar)}
                    // We need a function that returns a function since the ticker is only known in the transaction table component.
                    processRowClick={(ticker) => () => {history.push(`/info?ticker=${ticker}`); history.go()}}>
                    </TransactionTable>
                </form>
            </div>
        </div>
    </React.Fragment>
    ));
}

export default InfoPage;