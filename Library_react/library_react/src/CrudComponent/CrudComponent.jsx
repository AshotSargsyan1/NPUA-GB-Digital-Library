import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './CrudComponent.module.css'
import { booksListForDeleteBookSelector, booksListForUpdateBookSelector, getAllBooksThunk, getBooksForDeleteBookThunk, getBooksForUpdateBookThunk } from '../Features/booksSlice'
import { categories } from '../Features/categoriesSlice'
import { createBookThunk, createCategorieThunk, deleteBookThunk, deleteCategorieThunk, updateBookThunk, updateCategorieThunk } from '../Features/crudSlice'
import { useNavigate } from 'react-router-dom'

function CrudComponent() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllBooksThunk())
    }, [])

   
    const categoriesData = useSelector(categories)
    const booksListForUpdateBookSel = useSelector(booksListForUpdateBookSelector)
    const booksListForDeleteBookSel = useSelector(booksListForDeleteBookSelector)
    const [valuesForCreateBook, setValuesForCreateBook] = useState({
        pathForDownload: '',
        img: '',
        type: '',
        name: '',
        author: '',
        description: '',
        language: '',
        dataEdition: '',
        bookCode: '',
        barCode: ''
    })

    const [valuesForUpdateBook, setValuesForUpdateBook] = useState({
        pathForDownload: '',
        id: 0,
        img: '',
        type: '',
        author: '',
        description: '',
        newNameForUpdate: '',
        language: '',
        dataEdition: '',
        bookCode: '',
        barCode: ''
    })

    const [idForDeleteBook, setIdForDeleteBook] = useState(0)


    const [valuesForCreateCategorie, setValuesForCreateCategorie] = useState({
        title: '',
        img: '',
        aboutGenre: '',
        type: ''
    })

    const [valuesForUpdateCategorie, setValuesForUpdateCategorie] = useState({
        id: 0,
        title: '',
        img: '',
        aboutGenre: '',
        type: ''
    })

    const [idForDeleteCategorie, setIdForDeleteCategorie] = useState(0)

    return (
        <div className={classes.mainDiv}>
            <p onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'blue' }} >Գլխավոր էջ</p>
            <p onClick={() => navigate('/activitiesWithBooks')} style={{ cursor: 'pointer', color: 'blue' }}>Տրամադրել գրքեր</p>
            <p onClick={() => navigate('/feedbackmessages')} style={{ cursor: 'pointer', color: 'blue' }}>Հաղորդագրություններ</p>
            <p onClick={() => navigate('/archiveofbooksgiventostudents')} style={{ cursor: 'pointer', color: 'blue' }}>Տրամադրված գրքերի արխիվ</p>
            <h1>Ավելացնել, թարմացնել, ջնջել գրքերը</h1>
            <h2>Հուշումներ</h2>
            <p style={{ color: 'red' }}>Լրացնելուց բաց չթողնել մուտքագրման համար նշված մասերը, փոփոխության չենթարկվող մասերը գրել նորից</p>


            <div className={classes.operationDiv}>
                <input type='text' onChange={event => { setValuesForCreateBook(prevState => ({ ...prevState, pathForDownload: event.target.value })) }} placeholder='Ֆայլի անուն' /><br />
                <input type='text' onChange={event => { setValuesForCreateBook(prevState => ({ ...prevState, img: event.target.value })) }} placeholder="Նկար" /><br />
                <select onChange={event => setValuesForCreateBook(prevState => ({ ...prevState, type: event.target.value }))}>
                    <option>type</option>
                    {categoriesData.map(item => {
                        return <option value={item.type}>{item.title}</option>
                    })}
                </select><br />
                <input type='text' onChange={event => { setValuesForCreateBook(prevState => ({ ...prevState, name: event.target.value })) }} placeholder="Անուն" /><br />
                <input type='text' onChange={event => { setValuesForCreateBook(prevState => ({ ...prevState, author: event.target.value })) }} placeholder="Հեղինակ" /><br />
                <input type='text' onChange={event => { setValuesForCreateBook(prevState => ({ ...prevState, description: event.target.value })) }} placeholder="Նկարագրություն" /><br />
                <input type='text' onChange={event => { setValuesForCreateBook(prevState => ({ ...prevState, language: event.target.value })) }} placeholder="Լեզու" /><br />
                <input type='number' onChange={event => { setValuesForCreateBook(prevState => ({ ...prevState, dataEdition: event.target.value })) }} placeholder="Տպագրության թվական" /><br />
                <input type='text' onChange={event => { setValuesForCreateBook(prevState => ({ ...prevState, bookCode: event.target.value })) }} placeholder="Գրքի կոդ" /><br />
                <input type='text' onChange={event => { setValuesForCreateBook(prevState => ({ ...prevState, barCode: event.target.value })) }} placeholder="Շտրիխ կող" /><br />
                <button type="submit" onClick={async () => { await dispatch(createBookThunk(valuesForCreateBook)) }}>Ստեղծել գիրք</button><br />
            </div>

            <div className={classes.operationDiv}>
                <select onChange={category => dispatch(getBooksForUpdateBookThunk(category.target.value))}>
                    <option>type</option>
                    {categoriesData.map(item => {
                        return <option value={item.type}>{item.title}</option>
                    })}
                </select><br />

                {booksListForUpdateBookSel.length ?
                    <>
                        <select style={{ marginBottom: '25px' }} onChange={(e) => { setValuesForUpdateBook(prevState => ({ ...prevState, id: e.target.value })) }}>
                            {booksListForUpdateBookSel.map(book => { return <option value={book._id}>{book.name} - {book.author} </option> })}
                        </select><br /></> : null}


                <input type='text' onChange={event => { setValuesForUpdateBook(prevState => ({ ...prevState, pathForDownload: event.target.value })) }} placeholder='Ֆայլի անուն' /><br />
                <input type='text' onChange={event => { setValuesForUpdateBook(prevState => ({ ...prevState, newNameForUpdate: event.target.value })) }} placeholder="Անուն" /><br />
                <input type='text' onChange={event => { setValuesForUpdateBook(prevState => ({ ...prevState, img: event.target.value })) }} placeholder="Նկար" /><br />
                <select onChange={event => setValuesForUpdateBook(prevState => ({ ...prevState, type: event.target.value }))}>
                    <option>type</option>
                    {categoriesData.map(item => {
                        return <option value={item.type}>{item.title}</option>
                    })}
                </select><br />
                <input type='text' onChange={event => { setValuesForUpdateBook(prevState => ({ ...prevState, author: event.target.value })) }} placeholder="author" /><br />
                <input type='text' onChange={event => { setValuesForUpdateBook(prevState => ({ ...prevState, description: event.target.value })) }} placeholder="description" /><br />
                <input type='text' onChange={event => { setValuesForUpdateBook(prevState => ({ ...prevState, language: event.target.value })) }} placeholder="Լեզու" /><br />
                <input type='number' onChange={event => { setValuesForUpdateBook(prevState => ({ ...prevState, dataEdition: event.target.value })) }} placeholder="Տպագրության թվական" /><br />
                <input type='text' onChange={event => { setValuesForUpdateBook(prevState => ({ ...prevState, bookCode: event.target.value })) }} placeholder="Գրքի կոդ" /><br />
                <input type='text' onChange={event => { setValuesForUpdateBook(prevState => ({ ...prevState, barCode: event.target.value })) }} placeholder="Շտրիխ կող" /><br />
                <button type="submit" onClick={async () => { await dispatch(updateBookThunk(valuesForUpdateBook)) }}>Թարմացնել Գիրքը</button><br />
            </div>

            <div className={classes.operationDiv}>
                <select onChange={category => dispatch(getBooksForDeleteBookThunk(category.target.value))}>
                    <option>type</option>
                    {categoriesData.map(item => {
                        return <option value={item.type}>{item.title}</option>
                    })}
                </select><br />
              
                {booksListForDeleteBookSel.length ?
                    <>
                        <select style={{ marginBottom: '25px' }} onChange={(e) => { setIdForDeleteBook(prevState => ({ ...prevState, id: e.target.value })) }}>
                            {booksListForDeleteBookSel.map(book => { return <option value={book._id}>{book.name} - {book.author} </option> })}
                        </select><br /></> : null}
                <button type="submit" onClick={async () => { dispatch(deleteBookThunk(idForDeleteBook)) }}>Ջնջել գիրքը</button>
            </div>

            <hr style = {{
                color: 'lightBlue',
                border: '25px solid'
            }}/>


            <h1>Ավելացնել, թարմացնել, ջնջել ենթաբաժինները</h1>
            <div className={classes.operationDiv}>

                <input type='text' onChange={event => { setValuesForCreateCategorie(prevState => ({ ...prevState, title: event.target.value })) }} placeholder="Ենթաբաժնի անուն" /><br />
                <input type='text' onChange={event => { setValuesForCreateCategorie(prevState => ({ ...prevState, img: event.target.value })) }} placeholder="Նկարի հղում" /><br />
                <input type='text' onChange={event => { setValuesForCreateCategorie(prevState => ({ ...prevState, aboutGenre: event.target.value })) }} placeholder="Ենթաբաժնի մասին" /><br />
                <input type='text' onChange={event => { setValuesForCreateCategorie(prevState => ({ ...prevState, type: event.target.value })) }} placeholder="type" /><br />
                <button onClick={async () => { dispatch(createCategorieThunk(valuesForCreateCategorie)) }}>Ստեղծել ենթաբաժին</button>
            </div>


            <div className={classes.operationDiv}>


                <select style={{ marginBottom: '25px' }} onChange={e => { setValuesForUpdateCategorie(prevState => ({ ...prevState, id: e.target.value })) }}>
                    {categoriesData.map(categorie => {
                        return <option value={categorie._id}>{categorie.title} </option>
                    })}
                </select><br />
                <input type='text' onChange={event => { setValuesForUpdateCategorie(prevState => ({ ...prevState, title: event.target.value })) }} placeholder="Ենթաբաժնի անուն" /><br />
                <input type='text' onChange={event => { setValuesForUpdateCategorie(prevState => ({ ...prevState, img: event.target.value })) }} placeholder="Նկարի հղում" /><br />
                <input type='text' onChange={event => { setValuesForUpdateCategorie(prevState => ({ ...prevState, aboutGenre: event.target.value })) }} placeholder="Ենթաբաժնի մասին" /><br />
                <input type='text' onChange={event => { setValuesForUpdateCategorie(prevState => ({ ...prevState, type: event.target.value })) }} placeholder="type" /><br />
                <button onClick={async () => { dispatch(updateCategorieThunk(valuesForUpdateCategorie)) }}>Թարմացնել ենթաբաժինը</button>
            </div>

            <div className={classes.operationDiv}>
                <select style={{ marginBottom: '25px' }} onChange={e => { setIdForDeleteCategorie(e.target.value) }}>
                    {categoriesData.map(categorie => {
                        return <option value={categorie._id}>{categorie.title} </option>
                    })}
                </select><br />
                <button type="submit" onClick={async () => { dispatch(deleteCategorieThunk(idForDeleteCategorie)) }}>Ջնջել ենթաբաժինը</button>
            </div>

        </div >
    )
}

export default CrudComponent;
















