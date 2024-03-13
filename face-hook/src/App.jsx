import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import NotFound from "./pages/NotFound"
import Profile from "./pages/Profile"
import Registration from "./pages/Registration"

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Registration />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
