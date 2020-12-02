import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ProductCard } from './ProductCard';

type props = {
    userId: string;
};

const GET_PRODUCTS = gql`
    {
        productList {
            id
            name
            image_key
            price {
                currency_code
                current_price
                original_price
            }
            offer_ids
        }
    }
`;

const GET_USER = gql`
    query User($id: String!) {
        user(id: $id) {
            id
            available_badges
            offers {
                id
                title
                type
            }
        }
    }
`;

export const getBadgeOrder = (badges: any) => {
    if (!badges) {
        return;
    }
    const l = badges.map((b: string) => b.split(':'));
    return l.reduce((acc: any, b: string) => {
        const codes = b[1].split(',');
        codes.forEach((c) => {
            acc.push(c);
        });
        return acc;
    }, []);
};

export const getBadgeMap = (offers: any, badges: any) => {
    if (!offers || !badges) {
        return;
    }
    const decomposedBadges = badges.map((b: string) => b.split(':')[0]);
    return offers.reduce((bMap: any, offer: any) => {
        const i = badges.findIndex((b: string) => b.includes(offer.type));
        if (i > -1) {
            bMap.set(offer.id, { type: offer.type, icon: decomposedBadges[i] });
        }
        return bMap;
    }, new Map());
};

export const ProductList = (props: any) => {
    const [userId, setUserId] = useState();
    if (!userId || userId != props.userId) setUserId(props.userId);

    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const { loading: userLoading, error: userError, data: userData } = useQuery(
        GET_USER,
        {
            variables: { id: userId ? userId : props.userId }
        }
    );

    if (loading || userLoading) return <p>Loading...</p>;
    if (error || userError) return <p>Error :(</p>;

    const badges = userData.user.available_badges.split('||');
    const badgeOrder = getBadgeOrder(badges);
    const badgeMap = getBadgeMap(userData.user.offers, badges);

    console.log('userData: ', userData);
    console.log('badgeOrder: ', badgeOrder);
    console.log('badgeMap: ', badgeMap);

    return (
        <div>
            <div className="slds-grid slds-wrap slds-p-around--large ">
                {data.productList.map((product: any) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        badgeOrder={badgeOrder ? badgeOrder : null}
                        badgeMap={badgeMap ? badgeMap : null}
                    />
                ))}
            </div>
        </div>
    );
};
