import { Button } from "@chakra-ui/button"
import { Box, Container } from "@chakra-ui/react"
import {Routes , Route, Navigate} from "react-router-dom"
import PostPage from "./pages/PostPage"
import NavBar from "./components/NavBar"
import LogoutButton from "./components/LogoutButton"
import UserPage from "./pages/UserPage"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import UpdateProfile from "./pages/UpdateProfile"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import CreatePost from "./components/CreatePost"
import ChatPage from "./pages/ChatPage"


function App() {
 
  const user = useRecoilValue(userAtom)

  return (
    <Box position={"relative"} w={"full"} >
    <Container maxW="620px">
      <NavBar isLoggedIn={user} />
      <Routes>
        <Route path="/" element={user ? <HomePage/> : <Navigate to="/auth"/>}/>
        <Route path="/auth" element={!user ?<AuthPage/> : <Navigate to="/"/>}/>
        <Route path="/update" element={user ?<UpdateProfile/> : <Navigate to="/auth"/>}/>
        <Route path="/:username" element={user ? (
          <>
            <UserPage/>
            <CreatePost/>
            {/* <LogoutButton/> */}
          </>
        ):(
            <UserPage/> 
        )} />
        <Route path="/:username/post/:pid" element={<PostPage/>} />
        <Route path="/chat" element={ user ? <ChatPage/> : <Navigate  to={"/auth"} />} />
      </Routes>

      {/* {user && <LogoutButton/>} */}
      {user && <CreatePost/>}
    </Container>
    </Box>
  )
}

export default App
