import { useEffect, useRef, useState } from "react";
import Header from "../components/Header"
import noData from "./../assets/img/no_data.svg"
import Modal from "react-modal"

Modal.setAppElement("#root");

export default function Home() {
    const [todos, setTodo] = useState([]);
    const [activity, setActivity] = useState("");
    const [priority, setPriority] = useState(0);
    const [data, setData] = useState({ id: 0, activity: "", priority: 0, complete: false });
    const type = useRef("add");
    const editId = useRef(0);
    const [sort, setSort] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const clearData = () => {
        setActivity("")
        setPriority(0)
        type.current = "add"
        setSort("name")
    }

    const addTodo = (e) => {
        e.preventDefault()
        let new_data = { id: todos.length + 1, activity: activity, priority: parseInt(priority), complete: false };
        setData(new_data)
        let copy = [...todos];
        copy = [...copy, new_data];
        setTodo(copy);
        clearData()
    }

    const deleteTodo = (id) => {
        const removeId = todos.filter((del) => del.id !== id);
        setTodo(removeId)
    }

    const completeTodo = (id) => {
        setTodo(prevData => {
            const newData = prevData.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, complete: !todo.complete }
                }
                return todo;
            })
            return newData
        })
    }

    const editTodo = (e) => {
        e.preventDefault()
        setTodo(prevData => {
            const newData = prevData.map((todo) => {
                if (todo.id === editId.current) {
                    return { ...todo, activity: activity, priority: parseInt(priority) }
                }
                return todo;
            })
            return newData
        })
        clearData()
    }

    const sortData = () => {
        if (sort === "a_z") {
            let copy = [...todos].sort((a, b) => {
                return a.activity > b.activity ? 1 : -1
            })
            setTodo(copy);
        }
        else if (sort === "z_a") {
            let copy = [...todos].sort((a, b) => {
                return a.activity < b.activity ? 1 : -1
            })
            setTodo(copy);
        }
        else if (sort === "l_h") {
            let copy = [...todos].sort((a, b) => {
                return a.priority > b.priority ? 1 : -1
            })
            setTodo(copy);
        }
        else if (sort === "h_l") {
            let copy = [...todos].sort((a, b) => {
                return a.priority < b.priority ? 1 : -1
            })
            setTodo(copy);
        }
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        sortData();
    }, [sort])


    return (
        <div className="bg-slate-100 h-screen overflow-y-auto">
            <div className="header"><Header /></div>
            <main>
                <div className="lg:w-4/5 w-[95%] m-auto my-10">
                    <form onSubmit={type.current === 'add' ? addTodo : editTodo}>
                        <div className="flex gap-10 px-6 py-1 flex-col lg:flex-row">
                            <div className="flex-1 flex gap-10 items-center">
                                <div className="flex-1 w-full">
                                    <input type="text" name="todo" id="todo" placeholder="Input your activity" className="w-full py-2 px-3 border-2 border-gray-400 rounded-lg" value={activity} onChange={(event) => { setActivity(event.target.value) }} required />
                                </div>
                                <div className="flex-0 lg:w-48">
                                    <input type={"submit"} className="w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer py-2 px-3 rounded-lg text-white" value={type.current === "add" ? "Create" : "Save Changes"} />
                                </div>
                            </div>
                            <div className="flex-1 items-center flex justify-end">
                                <label htmlFor="priority" className="text-sm lg:text-lg">Choose activity priority : </label>
                                <select name="priority" id="priority" className="ml-5 border-2 border-gray-400 rounded-lg py-1 px-3" onChange={(e) => { setPriority(e.target.value) }} value={priority}>
                                    <option disabled value={"-"}>Choose priority</option>
                                    <option value={"2"}>High</option>
                                    <option value={"1"}>Medium</option>
                                    <option value={"0"}>Low</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className="mt-10 px-3">
                        <div className="flex items-center lg:flex-row flex-col">
                            <div className="flex-1">
                                <h1 className="tracking-wide text-2xl font-bold">Your activity : </h1>
                            </div>
                            {todos.length > 0 &&
                                <div className="flex-0 flex lg:mt-0 mt-5">
                                    <div className="flex-1">
                                        <select value={sort} onChange={(e) => { setSort(e.target.value) }} className="py-2 mr-5 border-2 rounded-lg border-slate-300 px-3">
                                            <option defaultChecked value={""}>Sorting</option>
                                            <option value={"a_z"}>Sort by Name A - Z</option>
                                            <option value={"z_a"}>Sort by Name Z - A</option>
                                            <option value={"l_h"}>Sort by Priority L - H</option>
                                            <option value={"h_l"}>Sort by Priority H - L</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <button className="bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-red-600" onClick={() => { toggleModal() }}>Clear</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="text-black mt-5">
                            {todos.length > 0 &&
                                todos.map((td) => {
                                    const priority_color = td.priority === 1 ? "bg-yellow-500" : (td.priority === 2 ? "bg-red-500" : "bg-green-500")

                                    return (
                                        <div key={td.id} className="mt-5 bg-white shadow-lg shadow-slate-300 rounded-lg py-5 px-7 text-lg">
                                            <div className="flex items-center lg:flex-row flex-col">
                                                <div className="flex-1">
                                                    <span className={td.complete ? "line-through" : ""}>{td.activity}</span>
                                                </div>
                                                <div className="flex-1 flex flex-col lg:flex-row lg:mt-0 mt-4 items-center text-center gap-6">
                                                    <div className="flex-1">
                                                        <button className="bg-green-700 hover:bg-green-600 text-white px-2 w-full py-1.5 rounded-lg" onClick={() => { completeTodo(td.id) }}>{td.complete ? "Cancel" : "Complete"}</button>
                                                    </div>
                                                    <div className="flex-1">
                                                        <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-2 w-full py-1.5 rounded-lg" onClick={() => { setActivity(td.activity), setPriority(td.priority), type.current = "edit", editId.current = td.id, document.getElementById("todo").focus() }}>Update</button>
                                                    </div>
                                                    <div className="flex-1">
                                                        <button className="bg-red-700 hover:bg-red-600 text-white px-2 w-full py-1.5 rounded-lg" onClick={() => { deleteTodo(td.id) }}>Delete</button>
                                                    </div>
                                                    <div className="flex-1 flex items-center justify-center">
                                                        <div className={`w-4 h-4 rounded-full ${priority_color}`}></div>
                                                        <span className="ml-3 font-semibold">
                                                            {[
                                                                td.priority === 0 ? "Low" : "", td.priority === 1 ? "Medium" : "", td.priority === 2 ? "High" : ""
                                                            ]}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {todos.length === 0 &&
                                <div className="text-center mt-10 w-full py-5">
                                    <img src={noData} alt="no_data" className="w-2/3 lg:w-80 m-auto" />
                                    <p className="mt-10 text-xl">There is no activity right now.</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>

            {/* untuk menampilkan modal */}
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="ClearAll"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}
            >
                <div className="w-96">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Are you sure want to clear all activity ?</h2>
                        <p className="mt-3 text-md">This action cannot be undone.</p>
                        <div className="flex mt-8 gap-8 text-lg">
                            <div className="flex-1">
                                <button className="w-full bg-red-500 rounded-md text-white py-1" onClick={() => { toggleModal() }}>Cancel</button>
                            </div>
                            <div className="flex-1">
                                <button className="w-full bg-blue-500 rounded-md text-white py-1" onClick={() => { setTodo([]), setIsOpen(false) }}>Yes, I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/*  */}
        </div>
    )
}