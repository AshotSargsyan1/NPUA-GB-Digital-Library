import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { deleteGivedBooks, getGivedBooks, givedBooksSelector, sendDataForGiveBook } from "../Features/activitiesWithBooksSlice"
import { useNavigate } from 'react-router-dom'

function ActivitiesWithBooks() {
    const dispatch = useDispatch()
    const givedBooks = useSelector(givedBooksSelector)
    const navigate = useNavigate()
    const [valuesForGiveBook, setValuesForGiveBook] = useState({
        qrCode: '',
        barCode: ''
    })

    useEffect(() => {
        dispatch(getGivedBooks())
    }, [])

    return (
        <div style={{
            width: '60%',
            minHeight: '80vh',
            margin: '0 auto',
            textAlign: 'center'
        }}>
            <p onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'blue' }} >Գլխավոր էջ</p>
            <p onClick={() => navigate('/feedbackmessages')} style={{ cursor: 'pointer', color: 'blue' }}>Հաղորդագրություններ</p>
            <p onClick={() => navigate('/archiveofbooksgiventostudents')} style={{ cursor: 'pointer', color: 'blue' }}>Տրամադրված գրքերի արխիվ</p>

            <div style={{
                margin: '50px auto',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                width: '50%'
            }}>
                <p style={{ fontWeight: 'bold' }}>Տրամադրել գիրք</p>
                <input type='text' onChange={e => {
                    setValuesForGiveBook((prevState) => ({
                        ...prevState,
                        qrCode: e.target.value
                    }))
                }} placeholder="Ուսանողի qr կոդ" /><br />

                <input type='text' onChange={e => {
                    setValuesForGiveBook((prevState) => ({
                        ...prevState,
                        barCode: e.target.value
                    }))
                }} placeholder="Գրքի կոդ" /><br />
                <button onClick={() => {
                    dispatch(sendDataForGiveBook(valuesForGiveBook))
                }}>Տրամադրել</button>
            </div>
            <hr style={{
                color: 'lightBlue',
                border: '25px solid'
            }} />
            <h2>Տրամադրված գրքերի ցուցակ</h2>
            {givedBooks.length ?
                <table border='1' style={{
                    margin: '50px auto'
                }}>
                    <th>Ուսանողի անուն</th>
                    <th>Ուսանողի ազգանուն</th>
                    <th>Ուսանողի խումբը</th>
                    <th>Գրքի հեղինակ</th>
                    <th>Գրքի անուն</th>
                    {givedBooks.map(item => {
                        return (
                            <tr style={{ textAlign: 'center' }}>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.group}</td>
                                <td>{item.bookAuthor}</td>
                                <td>{item.bookName}</td>
                                <td><button onClick={() => dispatch(deleteGivedBooks(item._id))}>Ջնջել</button></td>
                            </tr>
                        )
                    })}

                </table>
                : <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Տրամադրված գրքեր չկան</h2>}
        </div>
    )
}

export default ActivitiesWithBooks