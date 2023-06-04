import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../utils";

const initialState = {
    responseFromBack: ''
}

export const sendSignInData = createAsyncThunk(
    'signInThunk/sendSignInData',
    async ({ email, password }, { rejectWithValue }) => {
        await server.post('/signin', {
            email: email,
            password: password
        })
            .then((tokens) => {
                localStorage.setItem('accessToken', tokens.data.accessToken)
                window.location.reload()
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('accessToken')
                }
            })
    }
)

export const sendSignUpData = createAsyncThunk(
    'signUp/sendSignUpData',
    async ({ firstName, lastName, email, password, group, passport, userQrCode }, { rejectWithValue, dispatch }) => {
        await server.post('/signup', {
            firstName,
            lastName,
            email,
            password,
            group,
            passport,
            userQrCode
        })
            .then(res => alert('Դուք հաջողությամբ գրանցվել եք'))
            .catch(err => alert('Մուտքագրեք այլ էլեկտրոնային հասցե'))
    }
)

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {},
})



export default signInSlice.reducer

export const { getRespronseFromBack } = signInSlice.actions
export const messageFromBack = (state => state?.signInAndSignUp?.responseFromBack)