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
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import { useRef, useState } from 'react'
import useImgPreview from '../hooks/useImgPreview'
import useShowToast from '../hooks/useShowToast'

export default function UpdateProfile() {
    const [user , setUser ] = useRecoilState(userAtom)
    const showToast = useShowToast()
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

    const handleSubmit =  async(e) => {
      e.preventDefault()
      try {
        const response = await fetch(`api/users/update/${user.id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({...inputs , profilePic:imageUrl})
        })
        const data = await response.json()
        console.log(data)
      } catch (err) {
        showToast("Error" , err.message , "error")
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
              <Button w="full" onClick={() => fileRef.current.click()}>Change Profile Picture</Button>

              <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />

            </Center>
          </Stack>
        </FormControl>

        <HStack>
              <Box>
                <FormControl >
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" placeholder="Nithya Prakash"
                  value={inputs.firstname}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl  isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" placeholder="A V"
                  value={inputs.lastname}
                  />
                </FormControl>
              </Box>
            </HStack>

        <FormControl  isRequired>
          <FormLabel>User name</FormLabel>
          <Input
          placeholder="nithyaprakashav"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.username}
          />
        </FormControl>
        <FormControl  isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={inputs.email}
          />
        </FormControl>
        <FormControl  >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="3#83fne#*"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            value={inputs.password}
          />
        </FormControl>
        <FormControl >
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Enter your Bio here"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.bio}
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
            type='submit'>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </form>
  )
}