import {createContext, useContext } from "react";

export const TodoContext = createContext({
    Tasks: [
        {
            id: 1,
            task: "msg",
            completed: false,
        }
    ],
    addTask: (task)=>{},
    updateTask: (id, task) => {},
    deleteTask: (id) => {},
    markComplete: (id) => {}
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider