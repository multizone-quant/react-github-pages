import React from 'react';

function GetCoinPriceFromSmon({data}) {
    return (
        <div>
        <table  border="0.5" align="right">
            <tbody>
                <tr>
                    <td> &nbsp;&nbsp;&nbsp;&nbsp;HIVE </td> <td> &nbsp;${parseFloat(data['hive']).toFixed(4)}  </td>
                </tr>
                <tr>
                    <td> &nbsp;&nbsp;&nbsp;&nbsp;STEEM </td> <td> &nbsp; ${parseFloat(data['steem']).toFixed(4)} </td>
                </tr>                                    
                <tr>
                    <td> &nbsp;&nbsp;&nbsp;&nbsp;SBD </td> <td> &nbsp;${parseFloat(data['sbd']).toFixed(4)}  </td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default GetCoinPriceFromSmon;