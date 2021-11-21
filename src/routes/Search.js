import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { InputGroup, FormControl, Button, Toast } from 'react-bootstrap';
import ToastContainer from 'react-bootstrap/ToastContainer'
import TransactionTable from '../components/TransactionTable';

const SearchPage = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const domain = process.env.REACT_APP_SERVER_DOMAIN;
    const history = useHistory();

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
        .then(responseBody => {
            setState({
                results: responseBody.results,
            })
            setToastState({
                visible: true,
                message: "Successfully Retrieved Results",
                bg: "success",
            })
        })
        .catch(error => {
            setToastState({
                visible: true,
                message: "Was not able to retrieve results: " + error,
                bg: "danger",
            })
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

    const [toastState, setToastState] = useState({
        message: "",
        visible: false,
        bg: "light",
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
                <Button variant="outline-success" id="search" onClick={getTickerResults}>
                    Search
                </Button>
            </InputGroup>
            <br />
            <TransactionTable
                headers={["Stock Ticker", "Name", "Type", "Primary Exchange", "Locale", "Currency"]}
                rows={getRows(initState.results)}
                processRowClick={(ticker) => () => history.push(`/info?ticker=${ticker}`)}>
            </TransactionTable>
        </div>
        <ToastContainer className="p-3" position={"bottom-center"}>
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

export default SearchPage;