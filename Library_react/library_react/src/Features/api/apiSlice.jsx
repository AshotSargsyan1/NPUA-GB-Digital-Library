import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: builder => ({
        getBooksNumber: builder.query({
            query: () => '/booksnumber'
        })
    })
})

export const { useGetBooksNumberQuery } = apiSlice