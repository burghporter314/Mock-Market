import React, { Component } from 'react';
import { Table, Nav } from 'react-bootstrap';

class TransactionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers:["", "", "", ""],
            rows: [
                {
                    title: "",
                    bought: "",
                    current: "",
                    amount: "",
                },
                {
                    title: "",
                    bought: "",
                    current: "",
                    amount: "",
                }
            ],
        }
    }

    render() {
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {(this.props.headers ? this.props.headers: this.state.headers).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {(this.props.rows ? this.props.rows : this.state.rows).map((row, index) => (
                        <tr key={index} onClick={this.props.processRowClick(row[0])}>
                            {Object.keys(row).map((key, index) => (
                                <td key={index}>{row[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default TransactionTable;