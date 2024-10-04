import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoItem({ task }) {
    const [isEditable, setIsEditable] = useState(false)
    const [newMsg, setNewMsg] = useState(task.task)
    const { updateTask, deleteTask, markComplete } = useTodo()

    const editTodo = () => {
        updateTask(task.id, { ...task, task: newMsg })
        setIsEditable(false)
    }

    const handleMarkComplete = () => {
        markComplete(task.id)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                task.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={task.completed}
                onChange={handleMarkComplete}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isEditable ? "border-black/10 px-2" : "border-transparent"
                } ${task.completed ? "line-through" : ""}`}
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                readOnly={!isEditable}
            />
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (task.completed) return;
                    if (isEditable) {
                        editTodo();
                    } else setIsEditable((prev) => !prev);
                }}
                disabled={task.completed}
            >
                {isEditable ? "📁" : "✏️"}
            </button>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTask(task.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
