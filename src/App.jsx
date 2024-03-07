import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import AddTask from './AddTask'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddCategory from './AddCategory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
    <BrowserRouter>
   
    <Routes>
    <Route path='/' element={<Home/>} />
       <Route path='/addTask' element={<AddTask/>}/> 
      <Route path='/addCategory' element={<AddCategory/>}/>
    </Routes>
    
    </BrowserRouter>
      
    
    </>
  )
}

export default App
