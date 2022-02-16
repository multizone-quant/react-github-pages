import React from 'react';

function GetPriceFromUpbit({data, coin}) {
    var coin_name = coin
    var val = 'no coin name :' + coin
    console.log('GetPriceFromUpbit', coin_name, data.length)
    for (var i=0; i < data.length; i++) {
        if (data[i].market == coin) {
            val =  (data[i].trade_price).toLocaleString() + '(' + (data[i].signed_change_rate*100).toFixed(2) + '%)'
            break
        }
    }
    console.log(val)
    if (val != '' )
        val = coin +  ': ' + val
    return (
        <h2> {val}  </h2>
    );
}

function GetPriceFromSmon({data, coin}) {
    var coin_name = coin
    var val = 'no coin name :' + coin
    console.log('GetPriceFromUpbit', coin_name, data.length)
    for (var i=0; i < data.length; i++) {
        if (data[i].market == coin) {
            val =  (data[i].trade_price).toLocaleString() + '(' + (data[i].signed_change_rate*100).toFixed(2) + '%)'
            break
        }
    }
    console.log(val)
    if (val != '' )
        val = coin +  ': ' + val
    return (
        <h2> {val}  </h2>
    );
}

export default GetPriceFromUpbit;