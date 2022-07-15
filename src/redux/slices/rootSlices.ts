import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        comics_appeared: 0,
		date_created: "2022-07-03T17:26:38.514557",
		desc: "Beauty",
		id: "yfE9IqC665rznTWh8Fsmzp1FwLKBldfPf8Oz3uT6mTc",
		name: "The High Priestess",
		super_power: "Sheer Priestessness"
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseSuper: (state, action) => { state.super_power = action.payload},
        chooseComics: (state, action) => { state.comics_appeared = action.payload},
        chooseDesc: (state, action) => { state.desc = action.payload}
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseSuper,chooseComics,chooseDesc } = rootSlice.actions;