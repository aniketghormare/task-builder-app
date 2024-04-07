import React from 'react'
import MainRoute from './components/MainRoute'
import { Toaster } from "react-hot-toast"
const App = () => {
  return (
    <div>
      <Toaster />
      <MainRoute />
    </div>
  )
}

export default App
