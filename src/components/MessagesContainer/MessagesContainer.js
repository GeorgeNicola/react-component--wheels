import React from 'react';
import './MessagesContainer.css'
import {Congrats} from '../Message/Congrats'
import {UsedSpin} from '../Message/UsedSpin'
import {TechnicalError} from '../Message/TechnicalError'
import {ExpiredCampaign} from '../Message/ExpiredCampaign'

import MESSAGESTATUS from '../../common/messageStatus';

export const MessagesContainer = ({messageStatus}) => {
    return(
        <div className="messages-container messages-container--animation">
            {  
                (messageStatus == MESSAGESTATUS.congrats) ? <Congrats/> :
                (messageStatus == MESSAGESTATUS.usedSpin) ? <UsedSpin/> :
                (messageStatus == MESSAGESTATUS.technicalError) ? <TechnicalError/> :
                (messageStatus == MESSAGESTATUS.expiredCampaign) ? <ExpiredCampaign/> : <div></div>
            }
        </div>
    )
}