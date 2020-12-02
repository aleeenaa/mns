/* eslint-disable prettier/prettier */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

type props = {
    match: any;
};

const GET_PRODUCT = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      image_key
      price {
        currency_code
        current_price
        original_price
      }
      information {
        section_text
        section_title
      }
      offer_ids
    }
  }
`;

export const ProductPage = (props: props) => {

    const history = useHistory();
    const navigateToHome = () => {
        history.push("/");
    }

    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { id: props.match.params.id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const imgPath = `https://asset1.cxnmarksandspencer.com/is/image/mands/${data?.product.image_key}`,
    info = data?.product.information[0].section_text.split(/\r\n\r\n/g);

    return (
        <div className="slds-card slds-p-around--large">
            <div>
                <button className="slds-button slds-float_left slds-button_neutral" onClick={navigateToHome}>Back</button>
                <h1 className="slds-text-heading_large">{data?.product.name}</h1>
            </div>
            
            <div className="slds-grid slds-wrap slds-gutters_large slds-p-around--large">
                <div className="slds-col slds-size-small_1-of-1 slds-size_1-of-2 slds-size-large_1-of-3">
                    <img src={imgPath} alt={data?.product.name} />
                </div>
                <div className="slds-col slds-size-small_1-of-1 slds-size_1-of-2 slds-size-large_2-of-3 slds-p-around--large">
                    <div className="slds-grid slds-grid_vertical slds-p-around--large">
                        <div className="slds-col slds-p-around_xx-large">
                            <h3 className="slds-text-heading_medium">
                                {data.product.price.currency_code}&nbsp;{data?.product.price.current_price}
                            </h3>
                            {data.product.price.original_price && (
                                <del>
                                    {data.product.price.currency_code}&nbsp;
                                    {data.product.price.original_price}
                                </del>
                            )}
                        </div>
                        {data.product.information && (
                            info.map((section : string, index : any) => {
                                const i = section.split(/\r\n/, 1),
                                j = section.split(/\r\n/);
                                return (
                                    <div key={index} className="slds-col slds-box slds-p-around--medium">
                                        <h4 className="slds-text-heading_small">{i}</h4>
                                        { index && (
                                            <div className="slds-p-around--large">
                                                {j.length > 1 && (
                                                    j.map((text, index) => {
                                                        return index ? (
                                                            <p key={index} className="slds-text-body_regular slds-text-align_left">{text}</p>
                                                        ) : ''
                                                    })
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
