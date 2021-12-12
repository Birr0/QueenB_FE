import {createSlice} from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        results : {}, //localStorage.getItem('results') ? JSON.parse(localStorage.getItem('results')) : localStorage.setItem('results', JSON.stringify({})),
        pages : {}, //localStorage.getItem('pages') ? JSON.parse(localStorage.getItem('pages')) : localStorage.setItem('pages', JSON.stringify({})),
        query: ''
    },
    reducers: {
        setResults: (state, action) => {
            state.results = action.payload;
            //localStorage.setItem('results', action.payload);
            //state.results.results = JSON.parse(localStorage.getItem('results'));
        },
        setPages: (state, action) => {
            state.pages = action.payload;
            //localStorage.setItem('pages', JSON.stringify(state.results.pages));
            //state.results.pages = JSON.parse(localStorage.getItem('pages'));
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        }
    }
})

export const { setResults, setPages, setQuery } = resultsSlice.actions

export default resultsSlice.reducer