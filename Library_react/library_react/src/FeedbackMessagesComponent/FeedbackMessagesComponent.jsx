import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { feedbackMessages, getFeedbackMessages, removeFeedbackMessage } from "../Features/profileSlice"
import { useNavigate } from 'react-router-dom'

function FeedbackMessagesComponent() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFeedbackMessages())
    }, [])
    const navigate = useNavigate()
    const feedbackMessagesSel = useSelector(feedbackMessages)
    return (
        <>
            <p onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center' }} >Գլխավոր էջ</p>
            <p onClick={() => navigate('/activitiesWithBooks')} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center'  }}>Տրամադրել գրքեր</p>
            <p onClick={() => navigate('/archiveofbooksgiventostudents')} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center'  }}>Տրամադրված գրքերի արխիվ</p>
            <p onClick={() => navigate('/removedfeedbackmessages')} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center'  }}>Ձնջված hաղորդագրություններ</p>
            <div style={{
                margin: '50px auto',
                width: '60%',
                minHeight: '60vh'
            }}>
                {feedbackMessagesSel.length ?
                    feedbackMessagesSel.map(item => {
                        return (
                            <>
                                <p>{item.firstName} {item.lastName} | {item.group} | {item.email} | {item.createdAt}</p>
                                <p>Թեման - {item.theme}</p>
                                <p style={{
                                    whiteSpace: 'pre-line'
                                }}>Հաղորդագրություն - {item.text}</p>
                                <button onClick = {() => {
                                    dispatch(removeFeedbackMessage(item._id))
                                }}>Ջնջել</button>
                                <hr />
                            </>
                        )
                    })

                    : <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Հաղորդագրություններ չկան</h2>}
            </div >
        </>

    )
}

export default FeedbackMessagesComponent