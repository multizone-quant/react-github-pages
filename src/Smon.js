import React from 'react';

function GetPriceFromSmon({data}) {
    return (
        <h2> DEC: {data.dec_price} SPS : {data.sps_price}  </h2>
    );
}

export default GetPriceFromSmon;