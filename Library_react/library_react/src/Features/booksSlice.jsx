import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLogged } from "../utils";
import { server } from '../utils'

const initialState = {
    booksNumber: 0,
    allBooks: [],
    booksList: [],
    searchedBooks: [],
    favoriteBooksArray: [],
    downloadedBookElement: '',
    booksListForUpdateBook: [],
    booksListForDeleteBook: []
}

export const getBooksNumberThunk = createAsyncThunk(
    'booksNumber/getBooksNumber',
    async (_, { rejectWithValue, dispatch }) => {
        const res = await server.get('/booksnumber')
        dispatch(getBooksNumber(res.data))
    }
)

export const getAllBooksThunk = createAsyncThunk(
    'allBooks/getAllBooks',
    async (_, { rejectWithValue, dispatch }) => {
        const res = await server.get('/allbooks')
        dispatch(getAllBooks(res.data))
    }
)

export const getBooks = createAsyncThunk(
    'books/getBooks',
    async (itemType, { rejectWithValue, dispatch }) => {
        const res = await server.get(`/books?type=${itemType}`)
        dispatch(getBooksList(res.data))
    }
)

export const getSearchedBooksThunk = createAsyncThunk(
    'searchedBooks/getSearchedBooks',
    async (dataForSearchBooks, { rejectWithValue, dispatch }) => {
        await server.get(`/searchBooks?dataForSearchBooks=${dataForSearchBooks}`)
            .then(res => dispatch(getSearchedBooks(res.data)))
    }
)


export const removeFavoriteBook = createAsyncThunk(
    'removeFavoriteBook/removeFavoriteBookThunk',
    async (idForRemove, { rejectWithValue, dispatch }) => {
        const res = await server.delete(`/removefavoritebook`, {
            headers: { 'Authorization': `Bearer ${isLogged}` }
            ,
            data: {
                idForRemove
            }
        }).then(resp => dispatch(getFavoriteBooksThunk()))
    }
)


export const setFavoriteBookThunk = createAsyncThunk(
    'favoriteBook/setFavoriteBookThunk',
    async (dataForFavoriteBook, { rejectWithValue, dispatch }) => {
        const res = await server.post('/setfavoritebook', {
            dataForFavoriteBook
        }, {
            headers: { 'Authorization': `Bearer ${isLogged}` }
        })
        .then()
        .catch(err => alert('Նշված գիրքը արդեն ավելացված է «Ընտրված գրքեր» ցուցակում'))
    }
)

export const getFavoriteBooksThunk = createAsyncThunk(
    'favoriteBook/getFavoriteBookThunk',
    async (_, { rejectWithValue, dispatch }) => {
        const res = await server.get('/getfavoritebooks', {
            headers: { 'Authorization': `Bearer ${isLogged}` }
        })
            .then(resp => dispatch(getFavoriteBooks(resp.data)))
    }
)

export const sendBookIdForDownload = createAsyncThunk(
    'sendBookIdForDownload/sendBookIdForDownloadThunk',
    async (bookId, { rejectWithValue }) => {
        await server.get(`/downloadbook?bookidfordownload=${bookId}`)
            .then(resp => window.open(`http://localhost:8000/books/${resp.data}`))
            .catch(err => alert('Գրքի էլեկտրոնային տարբերակը չունենք'))
    }
)

export const getBooksForUpdateBookThunk = createAsyncThunk(
    'booksforupdatebook/getbooksforupdatebook',
    async (itemType, { rejectWithValue, dispatch }) => {
        const res = await server.get(`/books?type=${itemType}`)
        dispatch(getBooksForUpdateBook(res.data))
    }
)

export const getBooksForDeleteBookThunk = createAsyncThunk(
    'booksfordeletebook/getbooksfordeletebook',
    async (itemType, { rejectWithValue, dispatch }) => {
        const res = await server.get(`/books?type=${itemType}`)
        dispatch(getBooksForDeleteBook(res.data))
    }
)


export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {

        getBooksNumber: (state, action) => {
            state.booksNumber = action.payload
        },

        getAllBooks: (state, action) => {
            state.allBooks = action.payload
        },

        getBooksList: (state, action) => {
            state.booksList = action.payload
        },

        getSearchedBooks: (state, action) => {
            state.searchedBooks = action.payload
        },

        getDownloadedBook: (state, action) => {
            state.downloadBooks = action.payload
        },

        getFavoriteBooks: (state, action) => {
            state.favoriteBooksArray = action.payload
        },

        getBooksForUpdateBook: (state, action) => {
            state.booksListForUpdateBook = action.payload
        },

        getBooksForDeleteBook: (state, action) => {
            state.booksListForDeleteBook = action.payload
        }

    },

})

export default booksSlice.reducer
export const { getBooksList, getBooksNumber, getSearchedBooks, getFavoriteBooks, getDownloadedBook, getAllBooks, getBooksForUpdateBook, getBooksForDeleteBook } = booksSlice.actions

export const books = (state => state?.books?.booksList)
export const allBooksSel = (state => state?.books?.allBooks)
export const booksListNumber = (state => state?.books?.booksNumber)
export const searchedBooks = (state => state?.books?.searchedBooks)
export const favoriteBooks = (state => state?.books?.favoriteBooksArray)
export const downloadedBook = (state => state?.books?.downloadedBookElement)
export const booksListForUpdateBookSelector = (state => state?.books?.booksListForUpdateBook)
export const booksListForDeleteBookSelector = (state => state?.books?.booksListForDeleteBook)