import React from 'react';

function FromHE({data, coin}) {
    console.log('fromHiveEngine', data.length)
    for (var i=0; i < data.length; i++) {
        if (data[i].symbol === coin) {
            var price = parseFloat(data[i].lastPrice)
            var toFix = 2
            if (coin === 'DEC') 
                toFix = 5

            return price.toFixed(toFix) + '(' + data[i].priceChangePercent +')'
        }
    }
    
    const ret = 'no coin name ' + coin
    return (
        ret
    );
}

function GetPriceFromSmon({data}) {
    return (
        <div>
            <table  border="0.5" align="left">
                <tbody>
                    <tr>
                        <td> DEC </td> <td> &nbsp;$<FromHE data={data} coin='DEC'/> </td>
                    </tr>                                    
                    <tr>
                        <td> SPS </td> <td> &nbsp;$<FromHE data={data} coin='SPS'/> </td>
                    </tr>                                    
                    <tr>
                        <td> CHAOS </td> <td> &nbsp;$<FromHE data={data} coin='CHAOS'/> </td>
                    </tr>                                    
                    <tr>
                        <td> VOUCHER </td> <td> &nbsp;$<FromHE data={data} coin='VOUCHER'/> </td>
                    </tr>                                    
                </tbody>
            </table>
        </div>

    );
}

export default GetPriceFromSmon;