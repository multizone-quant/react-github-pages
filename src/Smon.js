import React from 'react';

function FromHE({data, hive, coin}) {
    console.log('fromHiveEngine', hive)
    for (var i=0; i < data.length; i++) {
        if (data[i].symbol === coin) {
            var price = parseFloat(data[i].lastPrice)
            var toFix = 4
            if (coin === 'DEC') 
                toFix = 5

            return (price * hive).toFixed(toFix) + ' (' + data[i].priceChangePercent +')  ' +  price.toFixed(toFix) + ' HIVE'
        }
    }
    
    const ret = 'no coin name ' + coin
    return (
        ret
    );
}

function GetPriceFromSmon({data, hive}) {
    return (
        <div>
            <table  border="0.5" align="left">
                <tbody>
                    <tr>
                        <td> DEC </td> <td> &nbsp;$<FromHE data={data} hive={hive} coin='DEC'/> </td>
                    </tr>                                    
                    <tr>
                        <td> SPS </td> <td> &nbsp;$<FromHE data={data} hive={hive} coin='SPS'/> </td>
                    </tr>                                    
                    <tr>
                        <td> CHAOS </td> <td> &nbsp;$<FromHE data={data} hive={hive} coin='CHAOS'/> </td>
                    </tr>                                    
                    <tr>
                        <td> VOUCHER </td> <td> &nbsp;$<FromHE data={data} hive={hive} coin='VOUCHER'/> </td>
                    </tr>                                    
                </tbody>
            </table>
        </div>

    );
}

export default GetPriceFromSmon;