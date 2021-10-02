import React from 'react';
import TransactionTable from '../TransactionTable';
import renderer from 'react-test-renderer';

it('should match snapshot with empty headers and rows', () => {
    const component = renderer.create(
        <TransactionTable
        headers={["", "", "", ""]}
        rows={[
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
            }]
        }/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

it('should match snapshot with empty headers and populated rows', () => {
    const component = renderer.create(
        <TransactionTable
        headers={["", "", "", ""]}
        rows={[
            {
                title: "title",
                bought: "bought",
                current: "current",
                amount: "amount",
            },
            {
                title: "title",
                bought: "bought",
                current: "current",
                amount: "amount",
            }]
        }/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

it('should match snapshot with populated headers and empty rows', () => {
    const component = renderer.create(
        <TransactionTable
        headers={["header1", "header2", "header3", "header4"]}
        rows={[
            {
                title: "title",
                bought: "bought",
                current: "current",
                amount: "amount",
            },
            {
                title: "title",
                bought: "bought",
                current: "current",
                amount: "amount",
            }]
        }/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

it('should match snapshot with populated headers and partial rows', () => {
    const component = renderer.create(
        <TransactionTable
        headers={["header1", "header2", "header3", "header4"]}
        rows={[
            {
                title: "title",
                bought: "bought",
                current: "current",
            },
            {
                title: "title",
                bought: "bought",
                current: "current",
            }]
        }/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

it('should match snapshot with partial headers and populated rows', () => {
    const component = renderer.create(
        <TransactionTable
        headers={["header1", "header2", "header3"]}
        rows={[
            {
                title: "title",
                bought: "bought",
                current: "current",
                amount: "amount",
            },
            {
                title: "title",
                bought: "bought",
                current: "current",
                amount: "amount",
            }]
        }/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})