import React from 'react';

//         <h2> DEC: {data.dec_price} SPS : {data.sps_price}  </h2>

function GetPriceFromSmon({data}) {
    return (
        <div>
            <table  border="0.5" align="left">
                <tbody>
                    <tr>
                        <td> DEC</td> <td>  ${data.dec_price} &nbsp;</td> 
                    </tr>                                    
                    <tr>
                        <td> SPS</td> <td>  ${data.sps_price} &nbsp;</td> 
                    </tr>
                    <tr>
                        <td> </td> <td> </td> 
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

export default GetPriceFromSmon;