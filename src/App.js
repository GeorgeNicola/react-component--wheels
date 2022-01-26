import React, { useState, useEffect } from 'react';
import './App.css';
import { Wheel } from './components/Wheel/Wheel';


//Configuration
import { CONFIG } from './common/configuration';
if(CONFIG.TESTING_MODE) var pf = require('./common/datamodel'); //Use local datamodel for testing


export default function App({name}) {
  const [params, setParams] = useState({})
  const [userData, setUserData] = useState({})
  const [campaignData, setCampaignData] = useState({})
  const [error, setError] = useState(false)
  

  const getUserData = () => {
    if(typeof pf != 'undefined') {
      let userData = pf.web.rich.data.userdata;

      setUserData({...userData, 
        firstname: userData.accountdetails.firstname,
        currency: userData.accountdetails.currency,
        brandid: userData.accountdetails.brandid,
        subbrandid: userData.accountdetails.subbrandid,
        isftd: userData.accountdetails.isftd,
        country: userData.applicationcontext.currentipcountry,
        language: userData.applicationcontext.language,
      })
    }
  }

  const datesAreOnSameDay = (startDate, endDate, currentDate) => {
      return (startDate <= currentDate && endDate > currentDate);
  }

  const getCampaignData = () =>{
    if(typeof pf != 'undefined') {
      let userData = pf.web.rich.data.userdata;
      let serverDate = new Date(userData.applicationcontext.serverdatetime);
      let campaigns = userData.marketingcampaigndata.marketingcampaigns[0].campaigns;

      let activeCampaigns = [];
      let availableCampaigns = [];
      let availablePrizes = [];

      if(campaigns != null){
        campaigns.forEach(function (element) {
          // console.log("campaign:", element);
          if (element.scheduledrules != null){
            element.scheduledrules.forEach(function (campaignObj) {
              if (campaignObj.rulecompletions != null && datesAreOnSameDay(new Date(campaignObj.startdate), new Date(campaignObj.enddate), new Date(serverDate))) {
                activeCampaigns.push(campaignObj)
                campaignObj.rulecompletions.forEach(function (element) {
                  //console.log('rulecompletions',element);
                  if (element.completionactions != null) {
                    element.completionactions.forEach(function (element) {
                      //console.log('completionactions',element);
                      if (element.offers != null) {
                      element.offers.forEach(function (element) {
                          if(element.claimbonusstatus === 5 && element.claimidentifier !== null) {
                            // console.log(element);
                            availableCampaigns.push(campaignObj)
                            availablePrizes.push(element);
                          }
                      });
                      }
                    });
                  }
                });
              }
            })
          }
        });
      }

      // console.log("marketingcampaigndata", userData.marketingcampaigndata)
      setCampaignData({
        activeCampaigns: activeCampaigns,
        availableCampaigns: availableCampaigns,
        availablePrizes: availablePrizes,
      })
    }
  }

  //Get user & campaign data
  useEffect(() => {
    try{
      getUserData();
      getCampaignData();
    } catch(e) {
      console.log("Error: ", e)
      setError(true);
    }
  }, [])

  
  //Handle user data from params
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    
    setParams({...params, 
      guid: urlParams.get('guid'),
      username: urlParams.get('username'),
      randomChosenPackage: urlParams.get('RandomChosenPackage')
    })
  }, []) 

  return (
    <div className="App">
      <h1 className="white-title"> {name ? name : "Default Title"}</h1>
      <Wheel params={params} userData={userData} campaignData={campaignData} error={error}/>
    </div>
  );
}
































 //Handle user data from params
  // useEffect(() => {
  //   const queryString = window.location.search
  //   const urlParams = new URLSearchParams(queryString)
    
  //   setParams({...params, 
  //     guid: urlParams.get('guid'),
  //     username: urlParams.get('username'),
  //     randomChosenPackage: urlParams.get('RandomChosenPackage')
  //   })
  // }, []) 


























// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       params: {}
//     }
//   }
//   componentDidMount() {
//     const queryString = window.location.search
//     const urlParams = new URLSearchParams(queryString)

//     this.setState(prev => ({ ...prev,
//       guid: urlParams.get('guid'),
//       username: urlParams.get('username'),
//       randomChosenPackage: urlParams.get('RandomChosenPackage')
//     }))
//   }

//   render() {
//     console.log(this.props)
//     return (
//       <div className="App">
//         <h1 className="white-title"> {this.props.name ? this.props.name : "Default Title"}</h1>
//         <Wheel params={this.params}/>
//       </div>
//     );
//   }
// }