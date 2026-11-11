import { useAtomValue, useSetAtom } from 'jotai'
import React, { use, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useDatas } from './Store/Zustand'
import { addUserAtom, deleteUserAtom, usersAtom } from './Store/Jotai'
import RTK, { addUser, deleteUser } from './Store/RTK'
import { useForm } from 'react-hook-form'



function Home() {
    // DIALOG
    let [open, setOpen] = useState(false)

    // SEARCH
    let [search, setSearch] = useState("")

    let { register, handleSubmit, reset } = useForm({
        defaultValues: {
            status: true
        }
    })
    

    let dispatch = useDispatch()

    let RTK = useSelector((state) => state.users.data)


    let Atom = useAtomValue(usersAtom)
    let deleteAtom = useSetAtom(deleteUserAtom)
    let addAtom = useSetAtom(addUserAtom)

    let Zustand = useDatas((state) => state.data)
    let deleteZustand = useDatas((state) => state.deleteUsers)
    let addZustand = useDatas((state) => state.addUsers)

    function deleteAll(id) {
        deleteAtom(id),
            deleteZustand(id),
            dispatch(deleteUser(id))
    }


    let result = RTK.map((user) => {
        let zustandUser = Zustand.find(
            (elem) => elem.id === user.id
        );

        let jotaiUser = Atom.find(
            (elem) => elem.id === user.id
        );

        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            age: zustandUser.age,
            job: zustandUser.job,
            status: jotaiUser.status,
            tel: jotaiUser.tel

        };
    });

    // ADD
    function addAll(data) {

        let id = Date.now()

        dispatch(addUser({
            id,
            name: data.name,
            avatar: data.avatar
        }))

        addZustand({
            id,
            age: Number(data.age),
            job: data.job
        })

        addAtom({
            id,
            status: data.status,
            tel: data.tel
        })

        reset()
        setOpen(false)
    }

    

    // SERACH
    let filteredResult = result.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input placeholder='Search...' type="text" name="" id="" onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => setOpen(true)}>Add+</button>

            {open && (
                <div style={{ position: "fixed", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <div style={{
                        background: "white", padding: "25px", borderRadius: "12px", width: "300px", display: "flex", flexDirection: "column", gap: "12px"
                    }}>

                        <h2>Add New User</h2>

                        <form
                            onSubmit={handleSubmit(addAll)}
                            style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                            <input placeholder="Name" {...register("name", { required: true })} />

                            <input placeholder="Avatar URL" {...register("avatar", { required: true })} />

                            <input type="number" placeholder="Age" {...register("age", {
                                required: true,
                                valueAsNumber: true
                            })} />

                            <input placeholder="Job" {...register("job", { required: true })} />

                            <input placeholder="Phone" {...register("tel", { required: true })} />



                            <button type="submit">
                                ADD
                            </button>

                            <button type="button" onClick={() => { setOpen(false); reset() }}>
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>
            )}


            {filteredResult.map((user) => (

                <div style={{ marginTop: "30px" }} key={user.id}>
                    <img style={{ borderRadius: "50%", width: "100px" }} src={user.avatar} alt="" />
                    <h2>{user.name}</h2>
                    <p>Age: {user.age}</p>
                    <p>Job: {user.job}</p>
                    <p>Status: {user.status ? 'Active' : 'Inactive'}</p>
                    <p>Phone: {user.tel}</p>
                    <button onClick={() => deleteAll(user.id)}>Delete</button>
                    
                </div>

            ))}

        </div>

    )
}

export default Home

















