import React from 'react';
import { useHistory } from 'react-router-dom';

type props = {
    product: {
        id: string;
        name: string;
        image_key: string;
        price: {
            currency_code: string;
            current_price: number;
            original_price: number;
        };
        offer_ids: [string];
    };
    badgeMap: any;
    badgeOrder: any;
};

export const getFilteredBadges = (bMap: any, offerIDs: any) => {
    if (!bMap) {
        return;
    }
    return new Map(
        [...bMap].filter(([k, v]) => {
            return offerIDs.includes(k);
        })
    );
};

export const ProductCard = (props: props) => {
    const imgPath = `https://asset1.cxnmarksandspencer.com/is/image/mands/${props.product.image_key}`;

    const history = useHistory();
    const openProductPage = (id: string) => history.push(`/product/${id}`);

    const filteredBadges = getFilteredBadges(
        props.badgeMap,
        props.product.offer_ids
    );

    let priorityBadge = { icon: undefined };

    if (filteredBadges) {
        props.badgeOrder.forEach((badge: string) => {
            filteredBadges.forEach((b: any) => {
                if (b.type == badge) {
                    priorityBadge = b;
                    return;
                }
            });
            if (priorityBadge != undefined) {
                return;
            }
        });
    }

    const badgePath = priorityBadge ? `/${priorityBadge.icon}_icon.jpg` : '';

    return (
        <div
            className="slds-col slds-small-size_1-of-2 slds-large-size_1-of-4 slds-p-around--large"
            onClick={() => openProductPage(props.product.id)}
        >
            <div className="slds-card slds-theme_default slds-m-bottom_medium slds-grid--pull-padded-large">
                <h2 className="slds-p-around_medium">
                    {props.product.name ? props.product.name : 'Item'}
                </h2>
                {priorityBadge && (
                    <div>
                        <img src={badgePath}></img>;
                    </div>
                )}
                <img src={imgPath} alt={props.product.name} />
                <div className="container slds-p-around_medium">
                    <h3 className="slds-text-heading_medium">
                        {props.product.price.currency_code}&nbsp;
                        {props.product.price.current_price}
                    </h3>
                    {props.product.price.original_price && (
                        <del>
                            {props.product.price.currency_code}&nbsp;
                            {props.product.price.original_price}
                        </del>
                    )}
                </div>
            </div>
        </div>
    );
};
