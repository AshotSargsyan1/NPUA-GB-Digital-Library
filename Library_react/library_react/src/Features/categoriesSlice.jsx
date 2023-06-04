import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../utils";

const initialState = {
    categoriesArray: [],
    aboutCategoriesData: {}
}

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async(_, { rejectWithValue, dispatch}) => {
        const res = await server.get('/categories')
        dispatch(getCategoriesArray(res.data))
    }
)

export const getAboutCategoriesThunk = createAsyncThunk(
    'aboutCategories/getAboutCategories',
    async(categoriesType, { rejectWithValue, dispatch}) => {
        const res = await server.get(`/aboutcategories?type=${categoriesType}`)
        dispatch(getAboutCategories(res.data))
    }
)

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {

        getCategoriesArray: (state, action) => {
            state.categoriesArray = action.payload
        },

        getAboutCategories: (state, action) => {
            state.aboutCategoriesData  = action.payload
        }
    },

})

export default categoriesSlice.reducer
export const { getCategoriesArray, getAboutCategories } = categoriesSlice.actions

export const categories = (state => state?.categories?.categoriesArray)
export const aboutCategoriesInfo = (state => state?.categories?.aboutCategoriesData)