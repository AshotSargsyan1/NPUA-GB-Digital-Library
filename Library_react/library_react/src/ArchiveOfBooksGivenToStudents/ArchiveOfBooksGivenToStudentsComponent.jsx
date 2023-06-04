import { useDispatch, useSelector } from "react-redux"
import { archiveOfBooksGivenToStudents, archiveOfBooksGivenToStudentsSelector } from "../Features/activitiesWithBooksSlice"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

function ArchiveOfBooksGivenToStudentsComponent() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(archiveOfBooksGivenToStudents())
    }, [])
    const archiveOfBooksGivenToStudentsSel = useSelector(archiveOfBooksGivenToStudentsSelector)
    return (
        <>
            <p onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center' }} >Գլխավոր էջ</p>
            <p onClick={() => navigate('/activitiesWithBooks')} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center' }}>Տրամադրել գրքեր</p>
            <p onClick={() => navigate('/feedbackmessages')} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center' }}>Հաղորդագրություններ</p>
            <div style={{
                width: '80%',
                minHeight: '60vh',
                margin: '50px auto',
            }}>
                <h2 style={{ textAlign: 'center' }}>Տրամադրված գրքերի արխիվ</h2>

                {archiveOfBooksGivenToStudentsSel.length ?
                    <table border='1' style={{
                        margin: '50px auto'
                    }}>
                        <th>Ուսանողի անուն</th>
                        <th>Ուսանողի ազգանուն</th>
                        <th>Ուսանողի խումբը</th>
                        <th>Գրքի հեղինակ</th>
                        <th>Գրքի անուն</th>
                        <th>Գրքի տրման ամսաթիվ</th>
                        {archiveOfBooksGivenToStudentsSel.map(item => {
                            return (
                                <tr style={{ textAlign: 'center' }}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.group}</td>
                                    <td>{item.bookAuthor}</td>
                                    <td>{item.bookName}</td>
                                    <td>{item.createdAt}</td>
                                </tr>
                            )
                        })}

                    </table>
                    : <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Տրամադրված գրքեր չկան</h2>}
            </div>
        </>
    )
}

export default ArchiveOfBooksGivenToStudentsComponent