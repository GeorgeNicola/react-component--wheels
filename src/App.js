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


  //Get user data
  useEffect(() => {
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
  }, [])


  //Get Campaigns data
  // useEffect(() => {
  //   if(typeof pf != 'undefined') {
  //     let userData = pf.web.rich.data.userdata;

  //     let serverTime = userData.applicationcontext.serverdatetime;
  //     let serverMonth = serverTime.getMonth() < 10 ? '0' + eval(serverTime.getMonth() + 1) : eval(serverTime.getMonth() + 1);
  //     let serverDay = serverTime.getDay() < 10 ? '0' + serverTime.getDay() : serverTime.getDay();
  //     let serverDate = serverTime.getFullYear() + '-' + serverMonth + '-' + serverDay;

  //     $.each(campaignList, function (indexA, thisCampaign) {
  //     $.each(thisCampaign.scheduledrules, function (indexB, thisRule) {
  //         var endDate = thisRule.enddate;
  //         var startDate = thisRule.startdate;

  //         var newEnd = new Date(endDate);
  //         var newStart = new Date(startDate);

  //         if (serverTime.getTime() < newEnd.getTime()) {
  //             var currentCampaignStatus = thisRule.status;
  //             if (currentCampaignStatus == 4 || currentCampaignStatus == 1) {
  //                 window.thisRule = thisRule;
  //                 var startDate = thisRule.startdate;
  //                 var ruleID = thisRule.ruleid;

  //                 /* Get Only Active Campaign */
  //                 var thisRuleCompletions = thisRule.rulecompletions;
  //                 if (thisRuleCompletions != null) {
  //                     $.each(thisRuleCompletions, function (indexC, thisRuleItem) {

  //                         var ActiveCampaign = thisRuleItem.completionactions[0];

    
  //                         /* Get Only The Randome Prize That Player Can Get */
  //                         var activePrize = ActiveCampaign.offers;
                          
  //                         /* Get all active campaigns */
  //                         allActiveCampaigns.push(ActiveCampaign)

  //                         $.each(activePrize, function (indexD, value) {
  //                             if (claimPrize == null) {
  //                                 if (value.claimbonusstatus != null) {
  //                                     if (value.claimbonusstatus == 5) {
  //                                         claimPrize = {
  //                                             'status': activePrize[indexD].claimbonusstatus,
  //                                             'guid': activePrize[indexD].claimidentifier,
  //                                             'bonus': activePrize[indexD].bonusofferdata,
  //                                             'name': getPrizeName(activePrize[indexD])
  //                                         };
  //                                         claimGuid = claimPrize.guid;
  //                                         claimName = claimPrize.name;
  //                                         claimRuleID = ruleID;
  //                                         promotionID = ActiveCampaign.promotionid;

  //                                         availablePrizes.push(claimPrize);


  //                                         /* Get Available Campaigns Array */
  //                                         availableArrays.push(thisRule);
  //                                         /* Get Available Offers Array */
  //                                         availableOffersArray.push(thisRule.ruleactions[0]);  
                                          

  //                                         if (valid) console.log(p('> promotionid:\t\t\t\t' + ActiveCampaign.promotionid), c('#999999'));
  //                                         if (valid) console.log(p('> claimPrize.status:\t\t\t' + claimPrize.status), c('#999999'));
  //                                         if (valid) console.log(p('> claimPrize.guid:\t\t\t' + claimPrize.guid), c('#999999'));
  //                                         if (valid) console.log(p('> claimPrize.name:\t\t\t' + claimPrize.name), c('#999999'));
  //                                         if (valid) console.log(' ');
  //                                         $('.left-area').removeAttr('style');
  //                                         $('#chests').removeAttr('style');

  //                                     }
  //                                 }
  //                             }
  //                         });


  //                       });
  //                     }
  //               }
  //         }
  //       });
  //     });




  //     console.log(userData.marketingcampaigndata)
  //     setCampaignData({

  //     })
  //   }
  // }, [])


  useEffect(() => {
    console.log("User Data: ", userData);
  })

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

  return (
    <div className="App">
      <h1 className="white-title"> {name ? name : "Default Title"}</h1>
      <Wheel params={params}/>
    </div>
  );
}




























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