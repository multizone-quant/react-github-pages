import React, {useState} from 'react';

import GetPriceFromUpbit from './Upbit';
import GetPriceFromSmon from './Smon';
import GetChaosInfo from './Chaos-firebase';
import GetCoinPriceFromSmon from './CoinPrice';

//import ReactstrapBottons1 from './myButton';
//import ReactstrapBottons from './carbonButton';

import moment from 'moment';

import firebase from 'firebase/compat/app'
import 'firebase/firestore'
//import auth from 'firebase/auth'
//import {getAuth, signInAnonymously} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, getDocs, setDoc,addDoc, Timestamp, collection, query } from "firebase/firestore";
//import {useDocumentData} from "react-firebase-hooks/firestore";

import axios from "axios";
  
//import {Button} from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

/* @param data 문자열
 * @param len 최종 문자열 길이
 * @param specific 채울 문자 */
function fillZeroInt(dt, len){
  const data = String(dt)
  return data.length >= len? data : new Array(len-data.length+1).join('0')+data;
}

async function getFireBase (cmd, want) {
  /*    
      const auth = getAuth();
      await signInAnonymously(auth) 
  */
  const db = getFirestore();
  var ret = []
  if (cmd === 'chaos') {
    const test_singledoc = 0
    if (test_singledoc) { 
      const docRef = doc(db, "smon-related", "chaos-pack", "2022-02-18", '11');
      const docSnap = await getDoc(docRef);
      var data = docSnap.data()
      console.log(data)
      console.log(data.date, data.qty)
//        ret.push(docSnap)
      ret.push({date:data.date, qty:data.qty}) 
//        console.log(ret)
    }
    else {
      var col = collection(db, "smon-related", "chaos-pack-1", want)
      const docSnap = await getDocs(col);
      docSnap.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        data = doc.data()
        ret.push({date:data.date, qty:data.qty, diff:0}) 
      });

      console.log(ret)
    }      
    return ret
  }
}

class App extends React.Component  {
  state = {
    loading : -1,
    status : -1,
    account : '',
    count : 0,
    upbitData : {},
    smonData:{},
    smonPriceData:[],
    hiveData:{},    
    geckoData:{},
    infos: []
  }
  
  componentDidMount() {
    console.log('comp mounted rendered')

    this.Request2Coingecko()
//    this.Request2Upbit2()
    this.Request2Smon()
    this.Request2HiveEngine()
    this.Request2CoinPriceSmon()    

    setTimeout(() => {
      this.setState({loading:false});
    },1000);
  }

  onChange = (event) => {
    this.setState({account :event.target.value})
//    setAccount(event.target.value);
  };

  Add = () => {
    this.setState({count : this.state.count + 1})
    console.log(this.state.count)
  }

  Request2Smon =async() => {
    const  url = "https://api2.splinterlands.com/settings"
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      this.setState({smonData :json})
    });
  }

  // cmd : 'chaos'
  Request2FireBase= async(cmd) => {
    /*    
        const auth = getAuth();
        await signInAnonymously(auth) 
    */
   /*
    console.log('moment utc', moment.utc().format());
    console.log('moment', moment().format());
    const dt = moment.utc();
    console.log('moment', dt.utc().month(1).format("YYYY-MM-DD"),  dt.utc().hour())
  
    const want = dt.utc().month(1).format("YYYY-MM-DD")
  */
      
    // get # sold for today(utc)
    //const dt = new Date()
    const dt = moment.utc();

//    var want = dt.getFullYear() + '-' + fillZeroInt(dt.getMonth()+1,2) + '-' + fillZeroInt(dt.getDate(), 2)
    var want = dt.utc().month(1).format("YYYY-MM-DD")
    console.log('want1', want)
    const ret1 = await getFireBase('chaos', want)

    // get # sold for yesterday
    var yesterday = dt.utc().subtract(1, 'day');
    want = yesterday.utc().month(1).format("YYYY-MM-DD")

//    want = dt.getFullYear() + '-' + fillZeroInt(dt.getMonth()+1,2) + '-' + fillZeroInt(dt.getDate()-1, 2)
    console.log('want2', want)
    
    const ret2 = await getFireBase('chaos', want)
    var ret

    console.log('merge')
    if (ret1.length > 0 ) {      
      ret = ret1.concat(ret2)
      console.log('if ret1', ret1)
      console.log('ret2', ret2)
      console.log('ret', ret)
    }
    else {
      console.log('else ret2', ret2)
      ret = ret2
    }
    // sort
    ret.sort((a,b) => b.date.localeCompare(a.date));
    // update increase
    for(var i=0; i<ret.length-1; i++)
      ret[i].diff = ret[i].qty - ret[i+1].qty  

    console.log(ret)

    this.setState({status:8})
    this.setState({infos :ret})
  }

  onChaos = (event) => {
      this.setState({status:1})// 1 : loading
      this.setState({infos :[]})
      this.Request2FireBase('chaos')
  };    

  // https://www.coingecko.com/api/documentations/v3#/
  Request2Coingecko = async() => {
    const API_URL = 'https://api.coingecko.com/api/v3/simple'    
    const ticker = 'HIVE'
    const url2 = API_URL+'/price?vs_currencies=USD&ids=' + ticker
    console.log(url2)

    const data  = await axios.get(url2);
//    console.log('Request2Coingecko done', data, ticker, data.data.hive.usd)
    //const res = {'ticker':ticker, 'price':data.data.hive.usd}
    this.setState({geckoData :  data.data.hive.usd})
  }

  // for balance -> contract: "tokens", table: "balances",  query: { account },
  Request2HiveEngine = async() => {
    const SE_URL = "https://ha.herpc.dtools.dev/contracts";
    const data  = await axios.post(SE_URL, {
          jsonrpc: "2.0",
          id: 7,
          method: "find",
          params: {
            contract: "market", 
            table: "metrics",  
            query: { },
            limit: 1000,
            offset: 0,
            indexes: [],
          },
        }  
    );
//    console.log('hive_engine', data)    
//    console.log('hive_engine', data.data.id, data.data.result)    

    this.setState({hiveData :data.data.result})
  };
  
  Request2Upbit2 = async() => {
    const UPBIT_API_URL = 'https://api.upbit.com/v1'    
    const tickers = 'KRW-STEEM,KRW-SBD,KRW-HIVE'
    const url2 = UPBIT_API_URL+'/ticker?markets=' + tickers
//    console.log(url2)

    const data  = await axios.get(url2);
//    console.log('Request2Upbit done', data.data)
    this.setState({upbitData :data.data})
  }

  Request2Upbit =() => {
    const UPBIT_API_URL = 'https://api.upbit.com/v1'    
    const tickers = 'KRW-STEEM,KRW-SBD,KRW-HIVE'
    const url2 = UPBIT_API_URL+'/ticker?markets=' + tickers
//    console.log(url2)
    fetch(url2)
    .then((response) => response.json())
    .then((json) => {
//        <GetPriceFromUpbit data={this.state.fromUpbit} coin='steem' />
//          setSmonInfos(json);
//        console.log('Request2Upbit done')
//        console.log(json)
        this.setState({upbitData :json})
    });
  }

  Request2CoinPriceSmon = async() => {
    const url = 'https://prices.splinterlands.com/prices'
    const data  = await axios.get(url);
    console.log('price', data)
    this.setState({smonPriceData :data.data})
/*
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        this.setState({smonPriceData :json})
    });
*/
  }

  onBalance = (event) => {
      this.setState({status:1})// 1 : loading
      this.setState({infos :[]})

      const sm_balance = "https://api2.splinterlands.com/players/balances?username="
      fetch(sm_balance + this.state.account)
      .then((response) => response.json())
      .then((json) => {
//          setLoading(2); // 2 : loading 완료
//          setInfos(json);
        this.setState({status:2})
        this.setState({infos : json})
        console.log('json', json)
      });
  };


/*
          <h1> {this.state.smonData.dec_price} {this.state.smonData.sps_price} </h1>
          <GetPriceFromSmon data={this.state.smonData}  />
          <GetPriceFromUpbit data={this.state.upbitData} coin='KRW-STEEM' />
          <GetPriceFromUpbit data={this.state.upbitData} coin='KRW-SBD' />
          <GetPriceFromUpbit data={this.state.upbitData} coin='KRW-HIVE' />

*/
  render() {
//    console.log('waiting', this.state.loading)
//    console.log('upbit', this.state.upbitData)

// <ReactstrapBottons />

//<GetPriceFromSmon data={this.state.hiveData} hive={this.state.geckoData} />
//<GetPriceFromUpbit data={this.state.upbitData} />

    const {status} = this.state;
    const {infos} = this.state;
    console.log('in render', {infos})
    return (
      <div> 
      <div> 
        <GetPriceFromSmon data={this.state.hiveData} hive={this.state.geckoData} />
        <GetCoinPriceFromSmon data={this.state.smonPriceData} />
        <div>
            <h2 style={{textAlign:"center"}}> &nbsp;Steem Monster Information &nbsp;</h2>  
        </div>
      </div>


      <div align="center">
        <input
            position="center"
            onChange={this.onChange}
            value={this.state.account}
            type="text"
            height= "100px"
            placeholder="Enter account..."
            style={{height: 40, textAlign: 'center'}}
        />
        <hr />
        <h4> History  : &nbsp;  &nbsp;
            <button style={{height: 30, marginRight:10}} onClick={this.onBalance}> Balance</button> 
            <button style={{height: 30, marginRight:10}} onClick={this.onChaos}> Chaos Pack</button> 
        </h4>
      </div>
      <hr />
      <div>
          {
              status < 2 ? (
                status === 1? (
                      <h1 style={{ color: 'black',textAlign: 'center' }}> Loading...</h1>
                  )
                  : ""  
              ) : ""
          }
          {
              status === 2 ? (  // balance
                  infos.length  > 0 ? (
                    <table border="1" align="center">
                        <thead>
                            <th> Type </th>
                            <th> Qty </th>
                        </thead>
                        <tbody>
                          {infos.map((info, index) => (
                              info.balance>0?                            
                                <tr key={index} align="center"> 
                                    <td> &nbsp;{info.token} &nbsp;</td>  
                                    <td> &nbsp;{info.balance>1000?( Math.round(info.balance).toLocaleString()):info.balance} &nbsp;</td>  
                                </tr>
                              : ''
                            ))}
                        </tbody>
                    </table>
                  ):''
              ) : 
              status === 8 ? (  // chaos pack info
                infos.length  > 0 ? (                
                  <GetChaosInfo data={this.state.infos}/>
                ):''
            ): ''              
          }
        </div>
    </div>
    )
  }
}

export default App;

//<button style={{height: 30, marginRight:10}} onClick={onChaosRegion}> Chaos Legion</button> 
