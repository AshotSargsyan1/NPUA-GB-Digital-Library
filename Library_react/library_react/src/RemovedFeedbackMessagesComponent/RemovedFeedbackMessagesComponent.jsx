import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRemovedFeedbackMessages, removedFeedbackMessagesSel } from "../Features/profileSlice"
import { useNavigate } from 'react-router-dom'

function RemovedFeedbackMessagesComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getRemovedFeedbackMessages())
    }, [])
    const removedFeedbackMessages = useSelector(removedFeedbackMessagesSel)
    console.log(removedFeedbackMessages)
    return (
        <div style={{ textAlign: 'center' }}>
            <p onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center' }} >Գլխավոր էջ</p>

            <h2>Ջնջված Հաղորդագրություններ</h2>
            {removedFeedbackMessages.length ? removedFeedbackMessages.map(item => {
                return (
                    <>
                        <p>{item.firstName} {item.lastName} | {item.group} | {item.email} | {item.createdAt}</p>
                        <p>Թեման - {item.theme}</p>
                        <p style={{
                            whiteSpace: 'pre-line'
                        }}>Հաղորդագրություն - {item.text}</p>
                        <hr />
                    </>
                )
            }) : <p>Ջնջված հաղորդագրություններ չկան</p>}


        </div>
    )
}

export default RemovedFeedbackMessagesComponent