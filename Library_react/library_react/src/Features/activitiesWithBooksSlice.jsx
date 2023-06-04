import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { server } from '../utils'

const initialState = {
    givedBooksArray: [],
    usersNotGivedBooks: [],
    archiveOfBooksGivenToStudentsArray: []
}

export const sendDataForGiveBook = createAsyncThunk(
    'dataForGiveBook/sendDataForGiveBook',
    async (dataForGiveBookArg, { rejectWithValue, dispatch }) => {
        await server.post(`/senddataforgivebook`, { dataForGiveBookArg })
            .then(resp => { dispatch(getGivedBooks()) })
            .catch(err => alert('Տվյալները սխալ են մուտքագրված'))
    }
)

export const getGivedBooks = createAsyncThunk(
    'givedBooks/getGivedBooks',
    async (_, { rejectWithValue, dispatch }) => {
        await server.get(`/givedbooks`)
            .then(givedBooks => givedBooks.data)
            .then(givedBooks => dispatch(getGivedBooksReducer(givedBooks)))
            .catch(err => console.log(err))
    }
)

export const deleteGivedBooks = createAsyncThunk(
    'deletegivedBooks/deleteGivedBooksThunk',
    async (idForDelete, { rejectWithValue, dispatch }) => {
        await server.delete(`/deletegivedbooks?id=${idForDelete}`)
            .then(resp => dispatch(getGivedBooks()))
            .catch(err => alert('Փորձեք ևս մեկ անգամ'))
    }
)

export const archiveOfBooksGivenToStudents = createAsyncThunk(
    'archiveOfBooksGivenToStudents/getarchiveofbooksgiventostudents',
    async (_, { rejectWithValue, dispatch }) => {
        await server.get(`/archiveofbooksgiventostudents`)
            .then(resp => dispatch(getArchiveOfBooksGivenToStudentsReducer(resp.data)))
            .catch(err => alert('Խնդիր տրամադրված գրքերի արխիվների հետ'))
    }
)


export const activitiesWithBooksSlice = createSlice({
    name: 'activitiesWithBooksSlice',
    initialState,
    reducers: {
        getGivedBooksReducer: (state, action) => {
            state.givedBooksArray = action.payload
        },

        getArchiveOfBooksGivenToStudentsReducer: (state, action) => {
            state.archiveOfBooksGivenToStudentsArray = action.payload
        }
       
    },

})

export default activitiesWithBooksSlice.reducer
export const { getGivedBooksReducer, findUsersNotGivedBooksReducer, getArchiveOfBooksGivenToStudentsReducer } = activitiesWithBooksSlice.actions
export const givedBooksSelector = (state => state?.givedBooks?.givedBooksArray)
export const archiveOfBooksGivenToStudentsSelector = (state => state?.givedBooks?.archiveOfBooksGivenToStudentsArray)