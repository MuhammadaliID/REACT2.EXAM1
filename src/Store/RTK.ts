
import { configureStore, createSlice } from "@reduxjs/toolkit";

let userSlice = createSlice({
    name: "users",

    initialState: {
        data: [
            {
                id: 1,
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpy8fSabmG_TcZLtTTiedr81bYgG0DdIkT2lpRKLgl5Q&s=10",
                name: "Ali"
            },
            {
                id: 2,
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpy8fSabmG_TcZLtTTiedr81bYgG0DdIkT2lpRKLgl5Q&s=10",
                name: "Muhammad"
            }
        ]
    },

    reducers: {
        deleteUser: (state, action) => {
            state.data = state.data.filter((user) => user.id !== action.payload);
        },

        addUser: (state, action) => {
            state.data.push(action.payload);
        }
    }
});

export default userSlice.reducer;

export let { deleteUser } = userSlice.actions;

export let { addUser } = userSlice.actions;


export let store = configureStore({
    reducer: {
        users: userSlice.reducer
    }
})

