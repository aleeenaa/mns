import * as assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';
import { getBadgeOrder, getBadgeMap } from './ProductList';
import { getFilteredBadges } from './ProductCard';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const client = new ApolloClient({
        uri: 'http://google.com',
        cache: new InMemoryCache()
    });

    ReactDOM.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('getBadgeOrder should return undefined when input is undefined', () => {
    const input = undefined;
    const expectedOutput = undefined;
    const actualOutput = getBadgeOrder(input);
    assert.ok(actualOutput === expectedOutput);
});

it('getBadgeMap should return undefined when input is undefined', () => {
    const input = undefined;
    const expectedOutput = undefined;
    const actualOutput = getBadgeMap(input, input);
    assert.ok(actualOutput === expectedOutput);
});

it('getFilteredBadges should return undefined when input is undefined', () => {
    const input = undefined;
    const expectedOutput = undefined;
    const actualOutput = getFilteredBadges(input, input);
    assert.ok(actualOutput === expectedOutput);
});

it('String is converted into an array with badges in priority order', () => {
    const input = 'sale:PRIORITY_ACCESS||loyalty:SLOTTED,BONUS'.split('||');
    const expectedOutput = ['PRIORITY_ACCESS', 'SLOTTED', 'BONUS'];
    const actualOutput = getBadgeOrder(input);
    assert.deepStrictEqual(actualOutput, expectedOutput);
});

it('getBadgeMap returns a map of user badges', () => {
    const badges = 'sale:PRIORITY_ACCESS,REDUCED||loyalty:SLOTTED,BONUS'.split(
        '||'
    );
    const input = [
        { id: '1', title: 'Get it while it lasts!', type: 'REDUCED' },
        { id: '2', title: 'Extra loyalty points!', type: 'BONUS' },
        { id: '3', title: 'Priority Access!', type: 'PRIORITY_ACCESS' },
        { id: '4', title: 'Discount available!', type: 'SLOTTED' },
        { id: '5', title: 'Super sale!', type: 'BONUS' }
    ];
    5;
    const expectedOutput = new Map([
        ['1', { type: 'REDUCED', icon: 'sale' }],
        ['2', { type: 'BONUS', icon: 'loyalty' }],
        ['3', { type: 'PRIORITY_ACCESS', icon: 'sale' }],
        ['4', { type: 'SLOTTED', icon: 'loyalty' }],
        ['5', { type: 'BONUS', icon: 'loyalty' }]
    ]);
    const actualOutput = getBadgeMap(input, badges);
    assert.deepStrictEqual(actualOutput, expectedOutput);
});

it('getFilteredBadges returns a filtered down map specific to product', () => {
    const offerIDs = ['5', '2', '4'];
    const input = new Map([
        ['1', { type: 'REDUCED', icon: 'sale' }],
        ['2', { type: 'BONUS', icon: 'loyalty' }],
        ['3', { type: 'PRIORITY_ACCESS', icon: 'sale' }],
        ['4', { type: 'SLOTTED', icon: 'loyalty' }],
        ['5', { type: 'BONUS', icon: 'loyalty' }]
    ]);
    const expectedOutput = new Map([
        ['2', { type: 'BONUS', icon: 'loyalty' }],
        ['4', { type: 'SLOTTED', icon: 'loyalty' }],
        ['5', { type: 'BONUS', icon: 'loyalty' }]
    ]);
    const actualOutput = getFilteredBadges(input, offerIDs);
    assert.deepStrictEqual(actualOutput, expectedOutput);
});
