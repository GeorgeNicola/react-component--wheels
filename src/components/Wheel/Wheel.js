import React, { useRef, useState, useEffect } from 'react';
import './Wheel.css';

//Assets
import wheelImg from '../../assets/images/wheel.png';
import spinImg from '../../assets/images/spin.png';
import loadingImg from '../../assets/images/loading.gif';
import ticker from '../../assets/images/tiker.png';
import tickSound from '../../assets/sounds/tick.mp3';

//Components
import { MessagesContainer } from '../MessagesContainer/MessagesContainer';

//Configuration
import { CONFIG } from '../../common/configuration';
import MESSAGESTATUS from '../../common/messageStatus';


export const Wheel = ({params}) => {
    const [messageStatus, setMessageStatus] = useState(MESSAGESTATUS.none);
    const [loaded, setLoaded] = useState(true);

    const tickTrigger = new Audio(tickSound);
    const wheel = useRef(null);
    let tickTriggerInterval = null;
    

    const startTickListener = () => {
        const tick = () => {
            console.log("Tick");
            tickTrigger.play();
            document.querySelector(".ticker").classList.add("ticker-animation");
        }
 
        const getCurrentRotation = (el) => {
            //Get the current css rotation of "el"
            var st = window.getComputedStyle(el, null);
            var tm = st.getPropertyValue("-webkit-transform") ||
                    st.getPropertyValue("-moz-transform") ||
                    st.getPropertyValue("-ms-transform") ||
                    st.getPropertyValue("-o-transform") ||
                    st.getPropertyValue("transform") ||
                    "none";
            if (tm != "none") {
            var values = tm.split('(')[1].split(')')[0].split(',');
            /*
            a = values[0];
            b = values[1];
            angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
            */
            //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
            var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
            return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
            }
            return 0;
        }

        //Remove ticker's animation class every time animation ends
        document.querySelector(".ticker").addEventListener("animationend", function () {
            document.querySelector(".ticker").classList.remove("ticker-animation")
        })

        //Build the triggerAngles Array 
        //Example for 5 prizes: [36, 108, 180, 252, 324]
        let triggerAngles = [];
        let degreesBetweenPrizes = 360/CONFIG.PRIZES_COUNTER;
        for(let i=0; i<CONFIG.PRIZES_COUNTER; i++){
            if(i==0){
                triggerAngles.push({
                    degrees: degreesBetweenPrizes/2,
                    isTriggered: false,
                });
            }
            else {
                triggerAngles.push({
                    degrees: triggerAngles[i-1].degrees + degreesBetweenPrizes,
                    isTriggered: false,
                })
            }
        }
        console.log("triggerAngles: ", triggerAngles)
        
        //Trigger tick event when one of the above angles is met (margin of error of [-5deg, +1deg])
        function tickTriggerListener() {
            let angle = getCurrentRotation(wheel.current);
            console.log(angle)

            triggerAngles.forEach( triggerAngle => {
                if( angle > triggerAngle.degrees - 5 && angle < triggerAngle.degrees + 1 && !triggerAngle.isTriggered){
                    tick();
                    triggerAngle.isTriggered = true;
                }
            })

            //After a rotation, reset the isTriggered property
            if(angle > 0 && angle < 5){
                triggerAngles.forEach((el,index) => triggerAngles[index].isTriggered = false)
            }
        };

        tickTriggerInterval = setInterval(tickTriggerListener, 10)
    }

    const startWheel = () => {
        let duration = 6; //Min 5s => 5 prizes
        let stopDeg = 720;

        //Add additional duration & degrees of rotation to reach prize
        duration += params.randomChosenPackage * (duration/(2*CONFIG.PRIZES_COUNTER));  
        stopDeg += params.randomChosenPackage * (360/CONFIG.PRIZES_COUNTER);

        //Start animation
        wheel.current.style.transition = `transform ${duration}s ease-out`;
        wheel.current.style.transform = `rotate(${stopDeg}deg)`;

        //Stop animation
        setTimeout(function stopAnimation(){
            if(tickTriggerInterval != null) window.clearInterval(tickTriggerInterval);
            setMessageStatus(MESSAGESTATUS.congrats)
        }, duration*1000)
    }

    const play = () => { 
        startTickListener();
        startWheel();
    }

    return(
        <div className="wheel-container">

            {(messageStatus === MESSAGESTATUS.none) ? "" : <MessagesContainer messageStatus={messageStatus}/>}
            {(loaded) ? "" : <img className="loading" src={loadingImg} alt="loading"/>}

            <img className="wheel" src={wheelImg} alt="wheel" ref={wheel}/>
            <img className="spin" src={spinImg} alt="spin" onClick={play}/>
            <div className="ticker-container">
                <img className="ticker" src={ticker} alt="ticker"/>
            </div>

        </div>
    )
}





















//ASSETS FROM GITHUB
// let wheelImg = 'https://raw.githubusercontent.com/GeorgeNicola/react-component--wheels/master/src/assets/images/wheel.png';
// let spinImg = "https://raw.githubusercontent.com/GeorgeNicola/react-component--wheels/master/src/assets/images/spin.png";
// let loadingImg = 'https://raw.githubusercontent.com/GeorgeNicola/react-component--wheels/master/src/assets/images/loading.gif';
// let ticker = 'https://raw.githubusercontent.com/GeorgeNicola/react-component--wheels/master/src/assets/images/tiker.png';
// let tickSound = 'https://github.com/GeorgeNicola/react-component--wheels/blob/master/src/assets/sounds/tick.mp3?raw=true';


    // const claimRequest = () => {
    //     setLoaded(false)

    //     // setTimeout(function(){
    //     //     setLoaded(true)
    //     //     startWheel2()
    //     // }, 1000)

    //     fetch("https://stage-us.888casino.com/claim/random/?guid=124124", {
    //         method: 'POST',
    //         // headers: {
    //         //     "Content-type": "application/json; charset=UTF-8",
    //         // },
    //         // body: JSON.stringify(data),
    //     })
    //     .then(response => response.text())
    //     .then(data => {
    //         let dataWrapper = document.createElement("div");
    //             dataWrapper.innerHTML = data;
    //         let dataValue = dataWrapper.querySelector("#fullContent > div").innerHTML;

    //         setLoaded(true)
    //         if(dataValue == 2)      setMessageStatus(MESSAGESTATUS.usedSpin)
    //         else if(dataValue == 3) setMessageStatus(MESSAGESTATUS.technicalError)
    //         else if(dataValue == 4) setMessageStatus(MESSAGESTATUS.expiredCampaign)
    //         else startWheel2()
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         setLoaded(true)
    //         setMessageStatus(MESSAGESTATUS.technicalError)
    //     })
    // }
    // const startWheel1 = () => {
    //     let deg = 720; //Rotate the wheel at least 2 times
    //     console.log(params.randomChosenPackage)
    //     deg += params.randomChosenPackage * 72;

    //     wheel.current.style.transition = `transform 5s ease-out 0s`;
    //     wheel.current.style.transform = `rotate(${deg}deg)`;

        

    //     setTimeout(function(){
    //         setMessageStatus(MESSAGESTATUS.congrats)
    //     }, 5000)
    // }

    // const startWheel2 = () => {
    //     let deg = 0;
    //     let stopDeg = 720;
    //     stopDeg += params.randomChosenPackage * 360/CONFIG.PRIZES_COUNTER;

    //     const rotationAnimation = setInterval(function() {
    //         let range = 360/CONFIG.PRIZES_COUNTER;

    //         if(deg%range === range/2 - 3) {
    //             tick();
    //         }

    //         if(deg < stopDeg) { 
    //             deg += 1;
    //         }
    //         else {
    //           setMessageStatus(messageStatus.congrats);
    //           window.clearInterval(rotationAnimation);
    //         }
        
    //         console.log(deg);
    //         wheel.current.style.transform = `rotate(${deg}deg)`;
    //     }, 7.5);
    // }

    // const startWheel3 = () => {
    //     //TO DO: initiate css animation
    //     //Listen for the position of the wheel (Listen to wheel rotation)

    //     let DURATION = 5;  
    //     let range = 360/CONFIG.PRIZES_COUNTER;
    //     let stopDeg = 720 + params.randomChosenPackage * 72; //Rotate wheel 2 times + degrees needed to reach the prize

    //     //Removes the ticker's animation class when animation ends
    //     document.querySelector(".ticker").addEventListener("animationend", function () {
    //         document.querySelector(".ticker").classList.remove("ticker-animation")
    //     })

    //     function startAnimation(){
    //         wheel.current.style.transition = `transform ${DURATION}s ease-out`;
    //         wheel.current.style.transform = `rotate(${stopDeg}deg)`;
    //     }

    //     // function tickTriggerListener() {
    //     //     let angle = getCurrentRotation(wheel.current)
    //     //     console.log(angle)
    //     //     if(angle%range === range/2 - 5 || angle%range === range/2 + 5) {
    //     //         tick();
    //     //     }
    //     // };
        
    //     function tickTriggerListener() {
    //         let angle = getCurrentRotation(wheel.current)

    //         // console.log("Angle: ", angle);
    //         // console.log("angle%range: ", angle%range)
    //         // console.log("range/2: ", range/2)
    //         // if(angle%range === range/2 - 10 || angle%range === range/2 + 10) {
    //         //     tick();
    //         // }

    //         let triggerAngles = [
    //             {
    //                 angle: 36,
    //                 triggered: false,
    //             },
    //             {
    //                 angle: 108,
    //                 triggered: false,
    //             },
    //             {
    //                 angle: 180,
    //                 triggered: false,
    //             },
    //             {
    //                 angle: 252,
    //                 triggered: false,
    //             },
    //             {
    //                 angle: 324,
    //                 triggered: false,
    //             },
    //         ]

    //         console.log("Angle: ", angle);
    //         triggerAngles.forEach(triggerAngle => {
    //             console.log("TriggerAngle: ", triggerAngle.angle);
    //             if(angle > triggerAngle.angle - 6 && angle < triggerAngle.angle + 6 && !triggerAngle.triggered){
    //                 tick();
    //                 // triggerAngle.triggered = true;
    //             }
    //         })
    //     };

    //     function stopAnimation(){
    //         setMessageStatus(MESSAGESTATUS.congrats)
    //         window.clearInterval(tickTriggerInterval);
    //     }

    //     startAnimation()
    //     const tickTriggerInterval = setInterval(tickTriggerListener, 5)
    //     const rotationTimeout = setTimeout(stopAnimation, DURATION*1000)
    // }

    // const startWheel4 = () => {
    //     let stopDeg = 720;
    //     let tickRange = 360/PRIZES_COUNTER;



    //     const anim = anime({
    //         targets: wheel.current,
    //         rotate: '720deg',
    //         duration: 5000,
    //         easing: "easeOutQuad",
    //         update: function(anim) {
    //             let currentDeg = anim.progress*720/100;
    //             console.log(Math.round(currentDeg % tickRange))
    //             console.log(tickRange/2 - 3)

    //             if(Math.round(currentDeg % tickRange) === tickRange/2 - 3){
    //                 console.log("TICK")
    //                 tick();
    //             }

    //           }
    //     });
    

    // }

    // const startWheel5 = () => {
    //     /*  Rotate with CSS
    //         Trigger tick with js & Math (Time based)
            
    //         */

    //     const DEG = 720; //Rotate the wheel at least 2 times
    //     const DURATION = 10; 
    //     const PRIZES_COUNTER = 5;
    //     let totalDeg = DEG + params.randomChosenPackage * 72;

    //     //CSS Animation
    //     wheel.current.style.transition = `transform ${DURATION}s linear`; //ease-out`;
    //     wheel.current.style.transform = `rotate(${totalDeg}deg)`;

    //     //Tick trigger
    //     let rotationInterval = 360/PRIZES_COUNTER; 
    //     let triggerCounter = totalDeg/rotationInterval; 
    //     let triggerTimeInterval = (DURATION/triggerCounter) * 1000; 


    //     /*
    //         function easeOutQuad(x) {
    //             return 1 - (1 - x) * (1 - x);
    //         }

    //         input rotation 
    //         output percentage done 

    //     */

    //     console.log("rotationInterval: ", rotationInterval)
    //     console.log("trigger_counter: ", triggerCounter)
    //     console.log("triggerTimeInterval: ", triggerTimeInterval)


    //     let i = 1;
    //     window.setTimeout(function() {
    //         tick(); //First tick at half interval
    //         const tickTrigger = setInterval(function() {
    //             tick();

    //             i++

    //             if(i === triggerCounter) window.clearInterval(tickTrigger);

    //         }, triggerTimeInterval);
    //     }, triggerTimeInterval/2)
        

    //     setTimeout(function(){
    //         setMessageStatus(MESSAGESTATUS.congrats)
    //     }, DURATION*1000)
    // }

    // const startWheel6 = () => {
    //     /*
    //         Animation only with JS 
    //         Based on an ease out function
    //     */
    // }

    // const startWheel7 = () => {
    //     /*  Start the animation with CSS
    //         Listen for the position of the wheel (in degrees) */

    //     //Total duration is 5s (for a rotation of 720deg) + 0.5s for each prize over
    //     //Rotate wheel 2 times (720deg) + needed degrees to reach the prize
    //     let DURATION = 5.5 + params.randomChosenPackage * 0.5;  
    //     let stopDeg = 720 + params.randomChosenPackage * 72;

    //     function startAnimation(){
    //         wheel.current.style.transition = `transform ${DURATION}s ease-out`;
    //         wheel.current.style.transform = `rotate(${stopDeg}deg)`;
    //     }

    //     function resetTickAnimation() {
    //         //Removes the ticker's animation class when animation ends
    //         document.querySelector(".ticker").addEventListener("animationend", function () {
    //             document.querySelector(".ticker").classList.remove("ticker-animation")
    //         })
    //     }

    //     function tickTriggerListener() {
    //         let angle = getCurrentRotation(wheel.current)
    //         console.log("Angle: ", angle);

    //         let triggerAngles = [36, 108, 180, 252, 324];

    //         triggerAngles.forEach( tiggerAngle => {
    //             if(angle > tiggerAngle - 8 && angle < tiggerAngle + 3){
    //                 tick();
    //             }
    //         })
    //     };

    //     function stopAnimation(){
    //         setMessageStatus(MESSAGESTATUS.congrats)
    //         window.clearInterval(tickTriggerInterval);
    //     }

    //     resetTickAnimation()
    //     startAnimation()
    //     const tickTriggerInterval = setInterval(tickTriggerListener, 10)
    //     const rotationTimeout = setTimeout(stopAnimation, DURATION*1000)
    // }