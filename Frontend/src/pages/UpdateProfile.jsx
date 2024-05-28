'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  Center,
  Box,
  Spinner,
} from '@chakra-ui/react'

import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import { useRef, useState } from 'react'
import useImgPreview from '../hooks/useImgPreview'
import useShowToast from '../hooks/useShowToast'
import { useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    const [user , setUser ] = useRecoilState(userAtom)
    const showToast = useShowToast()
    const [isLoading , setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        firstname: user.firstname, 
        lastname: user.lastname , 
        username: user.username , 
        email: user.email , 
        password: "" , 
        bio: user.bio , 
        profilePic:user.profilePic
    })

    const fileRef = useRef(null)

    const {handleImageChange , imageUrl} = useImgPreview()
    const navigate = useNavigate()

    const handleSubmit =  async(e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        const response = await fetch(`/api/users/update/${user._id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({...inputs , profilePic:imageUrl})
        })
        const data = await response.json()
        if(data.error){
          showToast("Error" , data.error , "error")
          return
        }
        showToast("Success" , "Profile Updated successfully" ,"success")
        setUser(data)
        console.log(data)
        localStorage.setItem("userinfo" , JSON.stringify(data))
      } catch (err) {
        showToast("Error" , err.message , "error")
        navigate(`/profile/${user.username}`)
      }finally{
        setIsLoading(false)
      }
    }
    
  return (
    
    <form onSubmit={handleSubmit}>
    <Flex
      
      align={'center'}
      justify={'center'}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Edit User Profile 
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              
              <Avatar size="xl" boxShadow={"md"}  src={imageUrl || inputs.profilePic}/>
            </Center>
            <Center w="full">
            {/* {isLoading && <Spinner size={"xl"} alignItems={"center"} /> } */}
              <Button w="full" onClick={() => fileRef.current.click()}>Change Profile Picture</Button>

              <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />

            </Center>
          </Stack>
        </FormControl>

        <HStack>
              <Box>
                <FormControl >
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" placeholder={user.firstname}
                  value={inputs.firstname}
                  onChange={(e) => setInputs({...inputs , firstname: e.target.value})}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl  isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" placeholder={user.lastname}
                  value={inputs.lastname}
                  onChange={(e) => setInputs({...inputs , lastname: e.target.value})}
                  />
                </FormControl>
              </Box>
            </HStack>

        <FormControl  isRequired>
          <FormLabel>User name</FormLabel>
          <Input
          placeholder={user.username}
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.username}
            onChange={(e) => setInputs({...inputs , username: e.target.value})}
          />
        </FormControl>
        <FormControl  isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({...inputs , email: e.target.value})}
          />
        </FormControl>
        <FormControl  >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="3#83fne#*"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({...inputs , password: e.target.value})}
          />
        </FormControl>
        <FormControl >
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Enter your Bio here"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.bio}
            onChange={(e) => setInputs({...inputs , bio: e.target.value})}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'green.500',
            }}
            type='submit'
            isLoading={isLoading}
            >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </form>
  )
}