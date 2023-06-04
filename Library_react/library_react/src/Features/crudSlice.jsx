import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../utils";

const initialState = {

}

export const createBookThunk = createAsyncThunk(
    'createBook/createBookThunk',
    async (valuesForCreate, { rejectWithValue, dispatch }) => {
        await server.post('/createbook', {
            valuesForCreate
        }
        )
            .then(resp => {
                alert('Գիրքը ավելացված է')
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            });
    }
)

export const updateBookThunk = createAsyncThunk(
    'updateBook/updateBookThunk',
    async (valuesForUpdate, { rejectWithValue, dispatch }) => {

        await server.put('/updatebook', {
            valuesForUpdate
        }
        )
            .then(resp => {
                alert('Գիրքը թարմացված է')
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            });

    }
)


export const deleteBookThunk = createAsyncThunk(
    'deleteBook/deleteBookThunk',
    async (idForDeleteBook, { rejectWithValue, dispatch }) => {
        await server.delete(`/deletebook`, {
            data: { idForDeleteBook }
        })
            .then(resp => {
                alert('Գիրքը ջնջված է')
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            });
    }
)

export const createCategorieThunk = createAsyncThunk(
    'createCategorie/createCategorieThunk',
    async (valuesForCreateCategorie, { rejectWithValue, dispatch }) => {
        await server.post(`/createcategorie`, {
            valuesForCreateCategorie
        }
        )
            .then(resp => {
                alert('Ենթաբաժինը ստեղծված է')
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            });
    }
)


export const updateCategorieThunk = createAsyncThunk(
    'updateCategorie/updateCategorieThunk',
    async (valuesForUpdateCategorie, { rejectWithValue, dispatch }) => {
        await server.put(`/updatecategorie`, {
            valuesForUpdateCategorie
        }
        )
            .then(resp => {
                alert('Ենթաբաժինը թարմացված է')
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            });
    })




export const deleteCategorieThunk = createAsyncThunk(
    'deleteCategorie/deleteCategorieThunk',
    async (idForDeleteCategorie, { rejectWithValue, dispatch }) => {
        await server.delete(`/deletecategorie`, {
            data: { idForDeleteCategorie }
        })
            .then(resp => {
                
                alert('Ենթաբաժինը ջնջված է')
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    })





export const crudSlice = createSlice({
    name: 'crudSlice',
    initialState,
    reducers: {

    },
})



export default crudSlice.reducer
export const { } = crudSlice.actions