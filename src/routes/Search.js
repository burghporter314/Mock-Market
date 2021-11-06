import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import TransactionTable from '../components/TransactionTable';

const SearchPage = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const domain = process.env.REACT_APP_SERVER_DOMAIN;

    if(!isAuthenticated) {
        return(
            <Redirect to={{pathname: "/"}}/>
        );
    }

    const getTickerResults = () => {
        
        // Get the search input text
        let inputEl = document.getElementById('inputTicker');

        // Handle user registration on login to make sure the username is in the system.
        fetch(`${domain}/query?query=${inputEl.value}`, {
            method: 'GET',
            headers: {
            useQueryString: true
            }
        })
        .then(responseJson => responseJson.json())
        .then(responseBody => {setState({
            results: responseBody.results,
        })})
        .catch(error => {
            console.log(error);
        });
    }

    const getRows = (results) => {
        let rows = [];

        if(results) {
            for(let i = 0; i < results.length; i++) {
                rows.push({
                    0: results[i].ticker,
                    1: results[i].name,
                    2: results[i].type,
                    3: results[i].primary_exchange,
                    4: results[i].locale.toUpperCase(),
                    5: results[i].currency_name.toUpperCase(),
                })
            }
        }
        return rows;
    }

    // Make the state the same as the expected response on the backend.
    const [initState, setState] = useState({
        results: [],
    });

    return(
    isAuthenticated && (
    <React.Fragment>
        <br />
        <br />
        <div className="container">
            <h1>{initState.query}</h1>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Stock Ticker</InputGroup.Text>
                <FormControl
                    placeholder="Enter Stock Ticker"
                    aria-label="Enter Stock Ticker"
                    aria-describedby="basic-addon2"
                    id="inputTicker"
                />
                <Button variant="outline-success" id="button-addon2" onClick={getTickerResults}>
                    Search
                </Button>
            </InputGroup>
            <br />
            <TransactionTable
                headers={["Stock Ticker", "Name", "Type", "Primary Exchange", "Locale", "Currency"]}
                rows={getRows(initState.results)}>
            </TransactionTable>
        </div>
    </React.Fragment>
    ));
}

export default SearchPage;