import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [tasks, setTasks] = useState([])

  const addTask = (task) => {
    setTasks((prev) => [{ id: Date.now(), ...task }, ...prev])
  }

  const updateTask = (id, task) => {
    setTasks((prev) => prev.map((prevTask) => 
      (prevTask.id === id ? { ...prevTask, ...task } : prevTask)
    ))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const markComplete = (id) => {
    setTasks((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  
  
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"))

    if (tasks && tasks.length > 0) {
      setTasks(tasks)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <TodoProvider value={{ tasks, addTask, deleteTask, markComplete, updateTask }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop and Add TodoItem here */}
            {tasks.map((task) => (
              <div key={task.id}
              className='w-full'>
                <TodoItem task = {task}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
