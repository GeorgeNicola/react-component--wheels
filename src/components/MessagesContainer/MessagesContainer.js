import React from 'react';
import './MessagesContainer.css'
import {Congrats} from '../Message/Congrats'
import {UsedSpin} from '../Message/UsedSpin'
import {TechnicalError} from '../Message/TechnicalError'
import {ExpiredCampaign} from '../Message/ExpiredCampaign'

export const MessagesContainer = ({messageStatus}) => {
    return(
        <div className="messages-container messages-container--animation">
            {  
                (messageStatus == "Congrats") ? <Congrats/> :
                (messageStatus == "UsedSpin") ? <UsedSpin/> :
                (messageStatus == "TechnicalError") ? <TechnicalError/> :
                (messageStatus == "ExpiredCampaign") ? <ExpiredCampaign/> : <div></div>
            }
        </div>
    )
}