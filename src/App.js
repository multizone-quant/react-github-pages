import React from 'react';
import GetPriceFromUpbit from './Upbit';
import GetPriceFromSmon from './Smon';
//import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"

class App extends React.Component  {
  state = {
    isLoading : true,
    count : 0,
    upbitData : {},
    smonData:{},
    hiveBalance:{},    
  }
  componentDidMount() {
    console.log('comp mounted rendered')

    this.Request2Upbit2()
    this.Request2Smon()
    this.Request2HiveEngine()

    setTimeout(() => {
      this.setState({isLoading:false});
    },1000);
  }

  Add = () => {
    this.setState({count : this.state.count + 1})
    console.log(this.state.count)
  }

  Request2Smon =() => {
    const  url = "https://api2.splinterlands.com/settings"
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      this.setState({smonData :json})
    });
  }

  Request2HiveEngine = async() => {
    const SE_URL = "https://ha.herpc.dtools.dev/contracts";
    const account = 'tradingideas'
    const data  = await axios.post(SE_URL, {
          jsonrpc: "2.0",
          id: 1,
          method: "find",
          params: {
            contract: "tokens",
            table: "balances",
            query: { account },
            limit: 1000,
            offset: 0,
            indexes: [],
          },
        }  
    );
    console.log('hive_engine', data)    
    console.log('hive_engine', data.data.id, data.data.result)    

    this.setState({hiveBalance :data.data.result})
  };
  
  Request2Upbit2 = async() => {
    const UPBIT_API_URL = 'https://api.upbit.com/v1'    
    const tickers = 'KRW-STEEM,KRW-SBD,KRW-HIVE'
    const url2 = UPBIT_API_URL+'/ticker?markets=' + tickers
    console.log(url2)

    const data  = await axios.get(url2);
    console.log('Request2Upbit done', data.data)
    this.setState({upbitData :data.data})
  }

  Request2Upbit =() => {
    const UPBIT_API_URL = 'https://api.upbit.com/v1'    
    const tickers = 'KRW-STEEM,KRW-SBD,KRW-HIVE'
    const url2 = UPBIT_API_URL+'/ticker?markets=' + tickers
    console.log(url2)
    fetch(url2)
    .then((response) => response.json())
    .then((json) => {
//        <GetPriceFromUpbit data={this.state.fromUpbit} coin='steem' />
//          setSmonInfos(json);
        console.log('Request2Upbit done')
        console.log(json)
        this.setState({upbitData :json})
    });
  }

/*
          <h1> {this.state.smonData.dec_price} {this.state.smonData.sps_price} </h1>
          <GetPriceFromSmon data={this.state.smonData}  />
          <GetPriceFromUpbit data={this.state.upbitData} coin='KRW-STEEM' />
          <GetPriceFromUpbit data={this.state.upbitData} coin='KRW-SBD' />
          <GetPriceFromUpbit data={this.state.upbitData} coin='KRW-HIVE' />

*/
  render() {
    console.log('waiting', this.state.isLoading)
    console.log('upbit', this.state.upbitData)
    const {isLoading} = this.state;
    return (
      <div> 
        {isLoading ? 'Loading...' : (
        <div>
            <GetPriceFromSmon data={this.state.smonData} />
            <GetPriceFromUpbit data={this.state.upbitData} />
            <h2 style={{textAlign:"center"}}> &nbsp;Steem Monster Information &nbsp;</h2>  
        </div>
        )
        }
      </div>
    )
  }
}

export default App;

