import './MessagesContainer.css'
import Congrats from '../Message/Congrats'
import UsedSpin from '../Message/UsedSpin'
import ExpiredCampaign from '../Message/ExpiredCampaign'
import TechnicalError from '../Message/TechnicalError'


const ReturnMessage = ({messageStatus}) => {
    switch (messageStatus) {
        case "Congrats":
            return <Congrats/>
        case "UsedSpin":
            return <UsedSpin/>
        case "TechnicalError":
            return <TechnicalError/>
        case "ExpiredCampaign":
            return <ExpiredCampaign/>
        default:
            return <div></div>
        }
}

const MessagesContainer = ({messageStatus}) => {
    return(
        <div className="messages-container messageAnimation">
            <ReturnMessage messageStatus={messageStatus}/>
        </div>
    )
}

export default MessagesContainer