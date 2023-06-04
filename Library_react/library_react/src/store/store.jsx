import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from '../Features/categoriesSlice'
import booksSlice from '../Features/booksSlice'
import signInAndSignUpSlice from '../Features/signInAndSignUpSlice'
import profileSlice from '../Features/profileSlice'
import crudSlice from '../Features/crudSlice'
import activitiesWithBooksSlice from '../Features/activitiesWithBooksSlice'
import { apiSlice } from '../Features/api/apiSlice'

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        books: booksSlice,
        signInAndSignUp: signInAndSignUpSlice,
        profile: profileSlice,
        crud: crudSlice,
        givedBooks: activitiesWithBooksSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})