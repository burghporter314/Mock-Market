import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import TransactionTable from '../components/TransactionTable';

const MainPage = () => {
    const { isAuthenticated } = useAuth0();

    if(!isAuthenticated) {
        return(
            <Redirect to={{pathname: "/"}}/>
        );
    }
    return(
    isAuthenticated && (
    <React.Fragment>
        <div className="jumbotron" style={{margin:"30px"}}>
            <div className="container main-form">
                <form>
                    <h2>Net Account Value: </h2>
                    <hr className="colorgraph"></hr>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Stock Value</label>
                            <input type="text" className="form-control" id="inputCity" readOnly></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Funds Remaining</label>
                            <input type="text" className="form-control" id="inputZip" readOnly></input>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="form-group col-md-4">
                            <label>Total Profit</label>
                            <input type="text" className="form-control" id="inputCity" readOnly></input>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Total Deposit</label>
                            <input type="text" className="form-control" id="inputZip" readOnly></input>
                        </div>
                        <div className="form-group col-md-4">
                            <label>% Change from Deposit</label>
                            <input type="text" className="form-control" id="inputZip" readOnly></input>
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
                    headers={["Stock Ticker", "Bought price", "Current Price", "Amount Bought"]}
                    rows={[
                        {
                            title: "Sample",
                            bought: ".70",
                            current: ".10",
                            amount: "5",
                        },
                        {
                            title: "Sample2",
                            bought: ".80",
                            current: ".10",
                            amount: "5",
                        }]
                    }>
                    </TransactionTable>
                </form>
            </div>
        </div>
    </React.Fragment>
    ));
}

export default MainPage;