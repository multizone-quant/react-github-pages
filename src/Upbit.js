import React from 'react';

function FromUpbit({data, coin}) {
//    console.log('fromUpbit')
    for (var i=0; i < data.length; i++) {
        if (data[i].market === coin) {
//            console.log(coin)
                return (data[i].trade_price).toLocaleString() + ' (' + (data[i].signed_change_rate*100).toFixed(2) + '%)'
        }
    }
    
    const ret = 'no coin name ' + coin
    return (
        ret
    );
}

function GetPriceFromUpbit({data}) {
    return (
        <div>
        <table  border="0.5" align="right">
            <tbody>
                <tr>
                    <td> &nbsp;&nbsp;&nbsp;&nbsp;STEEM </td> <td> &nbsp;<FromUpbit data={data} coin='KRW-STEEM'/> </td>
                </tr>                                    
                <tr>
                    <td> &nbsp;&nbsp;&nbsp;&nbsp;SBD </td> <td> &nbsp;<FromUpbit data={data} coin='KRW-SBD'/> </td>
                </tr>
                <tr>
                    <td> &nbsp;&nbsp;&nbsp;&nbsp;HIVE </td> <td> &nbsp;<FromUpbit data={data} coin='KRW-HIVE'/> </td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default GetPriceFromUpbit;