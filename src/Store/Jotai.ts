
import { atom } from "jotai";


export let usersAtom = atom([
    {
        id: 1,
        status: true,
        tel: 919023437
    },
    {
        id: 2,
        status: false,
        tel: 55255118
    }
]);

export let deleteUserAtom = atom(null, (get, set, id) => {
    let users = get(usersAtom).filter((user) => user.id !== id);
    set(usersAtom, users);
});

export let addUserAtom = atom(null, (get, set, newUser) => {
    let users = get(usersAtom);
    set(usersAtom, [...users, newUser]);
})
