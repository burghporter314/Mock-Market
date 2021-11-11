import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
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

    const getTickerDetails = () => {
        // Handle user registration on login to make sure the username is in the system.
        fetch(`${domain}/ticker/info?ticker=${initState.ticker}`, {
            method: 'GET',
            headers: {
            useQueryString: true
            }
        })
        .then(responseJson => responseJson.json())
        .then(responseBody => {setState({
            ticker: responseBody.symbol,
            name: responseBody.name,
            current: responseBody.c,
            high: responseBody.h,
            low: responseBody.l,
            open: responseBody.o,
            percent_change: responseBody.dp,
            market_cap: responseBody.marketcap,
            type: responseBody. type,
            country: responseBody.hq_country,
            state: responseBody.hq_state,
            exchange: responseBody.exchange,
            description: responseBody.description,
            employees: responseBody.employees,
            sector: responseBody.sector,
            similar: responseBody.similar,
        })})
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

    // Make the state the same as the expected response on the backend.
    const [initState, setState] = useState({
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
        getTickerDetails();
        const interval = setInterval(getTickerDetails, 20000);
        return () => clearInterval(interval);
      }, []);

    return(
    isAuthenticated && (
    <React.Fragment>
        <div className="jumbotron" style={{margin:"30px"}}>
            <div className="container main-form">
                <form>
                    <h2>Ticker Information </h2>
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