
import { create } from "zustand";



export let useDatas = create((set) => ({
    data: [
        {
            id: 1,
            age: 19,
            job: "Programming"
        },
        {
            id: 2,
            age: 20,
            job: "Design"
        }
    ],

    deleteUsers: (id) => {
        set((state) => ({
            data: state.data.filter((user) => user.id !== id)
        }));
    },

    addUsers: (newUser) => {
        set((state) => ({
            data: [...state.data, newUser]
        }));
    }
}));
