import { Button } from "@chakra-ui/button"
import { Container } from "@chakra-ui/react"
import {Routes , Route} from "react-router-dom"
import PostPage from "./pages/PostPage"
import NavBar from "./components/NavBar"
import UserPage from "./pages/UserPage"


function App() {
 
  return (
    <Container maxW="620px">
      <NavBar/>
      <Routes>
        <Route path="/:username" element={<UserPage/>} />
        <Route path="/:username/post/:pid" element={<PostPage/>} />
      </Routes>
    </Container>
  )
}

export default App
