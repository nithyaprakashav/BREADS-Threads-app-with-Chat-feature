import { Button } from "@chakra-ui/button"
import { Container } from "@chakra-ui/react"
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


function App() {
 
  const user = useRecoilValue(userAtom)

  return (
    <Container maxW="620px">
      <NavBar isLoggedIn={user} />
      <Routes>
        <AuthPage/>
        <Route path="https://breads-threads-app-with-chat-feature-backend.vercel.app/" element={<AuthPage/>}/>
        <Route path="https://breads-threads-app-with-chat-feature-backend.vercel.app/auth" element={!user ?<AuthPage/> : <Navigate to="/"/>}/>
        <Route path="https://breads-threads-app-with-chat-feature-backend.vercel.app/update" element={user ?<UpdateProfile/> : <Navigate to="/auth"/>}/>
        <Route path="https://breads-threads-app-with-chat-feature-backend.vercel.app/:username" element={user ? (
          <>
            <UserPage/>
            <CreatePost/>
            {/* <LogoutButton/> */}
          </>
        ):(
            <UserPage/> 
        )} />
        <Route path="https://breads-threads-app-with-chat-feature-backend.vercel.app/:username/post/:pid" element={<PostPage/>} />
      </Routes>

      {/* {user && <LogoutButton/>} */}
      {user && <CreatePost/>}
    </Container>
  )
}

export default App
