import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginScreen from "./components/Login"
import MemoryGame from "./components/MemoryGame"

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginScreen />} />
        <Route path="/" element={<MemoryGame />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
