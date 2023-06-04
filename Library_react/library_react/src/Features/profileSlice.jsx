import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLogged, server } from "../utils";

const initialState = {
    profileData: {},
    feedbackMessagesArray: [],
    removedFeedbackMessages: []
}

export const getProfile = createAsyncThunk(
    'profileData/getProfileData',
    async (_, { rejectWithValue, dispatch }) => {
        await server.get('/profile', {
            headers: {
                'Authorization': `Bearer ${isLogged.replace(/"/g, '')}`
            }
        })
            .then(resp => resp.data)
            .then(resp => dispatch(getProfileReducer(resp)))
            .catch(err => console.log(err))
    }
)

export const getFeedbackMessages = createAsyncThunk(
    'feedbackMessages/getFeedbackMessages',
    async (_, { rejectWithValue, dispatch }) => {
        await server.get('/getfeedbackmessages', {
            headers: { 'Authorization': `Bearer ${isLogged.replace(/"/g, '')}` }
        })
            .then(messages => dispatch(getFeedbackMessagesReducer(messages.data)))
    }
)

export const sendFeedbackMessage = createAsyncThunk(
    'sendFeedbackMessage/sendFeedbackMessageThunk',
    async (feedbackMessage, { rejectWithValue, dispatch }) => {
        await server.post('/sendfeedbackmessage', { feedbackMessage }, {
            headers: { 'Authorization': `Bearer ${isLogged.replace(/"/g, '')}` }
        })
            .then(resp => dispatch(getFeedbackMessages()))
    }
)

export const removeFeedbackMessage = createAsyncThunk(
    'removeFeedbackMessage/removeFeedbackMessageThunk',
    async (messageId, { rejectWithValue, dispatch }) => {
        await server.delete(`/deletefeedbackmessage?id=${messageId}`, {
            headers: { 'Authorization': `Bearer ${isLogged.replace(/"/g, '')}` }
        }).then(() => {
            dispatch(getFeedbackMessages())
        })
    }
)

export const getRemovedFeedbackMessages = createAsyncThunk(
    'RemovedFeedbackMessages/GetRemovedFeedbackMessageThunk',
    async (_, { rejectWithValue, dispatch }) => {
        await server.get(`/removedfeedbackmessages`, {
            headers: { 'Authorization': `Bearer ${isLogged.replace(/"/g, '')}` }
        }).then(resp => {
            dispatch(getRemovedFeedbackMessagesReducer(resp.data))
        })
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getProfileReducer: (state, action) => {
            state.profileData = action.payload
        },
        getFeedbackMessagesReducer: (state, action) => {
            state.feedbackMessagesArray = action.payload
        },
        getRemovedFeedbackMessagesReducer: (state, action) => {
            state.removedFeedbackMessages = action.payload
        }
    },
})



export default profileSlice.reducer;
export const { getProfileReducer, getFeedbackMessagesReducer, getRemovedFeedbackMessagesReducer } = profileSlice.actions;
export const profileMess = (state => state?.profile?.profileData)
export const feedbackMessages = (state => state?.profile?.feedbackMessagesArray)
export const removedFeedbackMessagesSel = (state => state?.profile?.removedFeedbackMessages)
