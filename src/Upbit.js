import React from 'react';

function FromUpbit({data, coin}) {
    console.log('fromUpbit')
    for (var i=0; i < data.length; i++) {
        if (data[i].market === coin) {
            console.log(coin)
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
                    <td> STEEM </td> <td> &nbsp;<FromUpbit data={data} coin='KRW-STEEM'/> </td>
                </tr>                                    
                <tr>
                    <td> SBD </td> <td> &nbsp;<FromUpbit data={data} coin='KRW-SBD'/> </td>
                </tr>
                <tr>
                    <td> HIVE </td> <td> &nbsp;<FromUpbit data={data} coin='KRW-HIVE'/> </td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

function GetPriceFromSmon({data, coin}) {
    var coin_name = coin
    var val = 'no coin name :' + coin
    console.log('GetPriceFromUpbit', coin_name, data.length)
    for (var i=0; i < data.length; i++) {
        if (data[i].market === coin) {
            val =  (data[i].trade_price).toLocaleString() + '(' + (data[i].signed_change_rate*100).toFixed(2) + '%)'
            break
        }
    }
    console.log(val)
    if (val !== '' )
        val = coin +  ': ' + val
    return (
        <h2> {val}  </h2>
    );
}

export default GetPriceFromUpbit;